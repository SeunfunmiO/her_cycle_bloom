import React, { useEffect, useState } from "react"
import { Calendar } from "./ui/calendar"
import axios from "axios"
import { toast } from "react-toastify"
import {
    calculateCyclePrediction,
    addDays,
    detectCycleIrregularity,
    isPeriodLate,
} from "../lib/cyclePrediction"
import { useTranslation } from "react-i18next"
import { enUS, fr, es, zhCN, arSA } from "date-fns/locale"
import i18n from "../i18n"

/* ---------- HELPERS ---------- */
const isSameDay = (a, b) =>
    a && b && a.toDateString() === b.toDateString()

const generateYearPredictions = ({
    startDate,
    cycleLength,
    periodLength = 5,
    months = 12,
}) => {
    const predictions = []
    let cursor = new Date(startDate)

    for (let i = 0; i < months; i++) {
        const cycle = calculateCyclePrediction({
            lastPeriodStart: cursor,
            cycleLength,
            periodLength,
        })

        predictions.push(cycle)
        cursor = addDays(cursor, cycleLength)
    }

    return predictions
}

/* ---------- COMPONENT ---------- */
const CalendarComponent = () => {
    const [periods, setPeriods] = useState([])
    const [prediction, setPrediction] = useState(null)
    const [selectedRange, setSelectedRange] = useState()
    const [cycleInfo, setCycleInfo] = useState(null)
    const token = localStorage.getItem("token")
    const { t } = useTranslation([
        "common",
        "placeholder",
        "toast"
    ])

    const localeMap = {
        en: enUS,
        fr: fr,
        es: es,
        zh: zhCN,
        ar: arSA,
    }


    /* ---------- FETCH USER PROFILE ---------- */
    useEffect(() => {
        const fetchUserCycle = async () => {
            try {
                if (!token) return

                const res = await axios.get(
                    `https://hercyclebloom.vercel.app/user/user-profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                const { lastPeriodDate, cycleLength } = res.data.userData
                if (!lastPeriodDate) return

                const predicted = calculateCyclePrediction({
                    lastPeriodStart: new Date(lastPeriodDate),
                    cycleLength,
                    periodLength: 5,
                })

                setPrediction({
                    ...predicted,
                    cycleLength,
                    lastPeriodStart: new Date(lastPeriodDate),
                })
            } catch (err) {
                console.error("Prediction error:", err)
            }
        }

        fetchUserCycle()
    }, [token])

    /* ---------- FETCH PERIOD ENTRIES ---------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token) return

                const res = await axios.get(
                    `https://hercyclebloom.vercel.app/period/get-entries`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                const data = Array.isArray(res.data.entries)
                    ? res.data.entries.filter(p => p.periodStart)
                    : []

                setPeriods(data)

                if (data.length < 2) return

                const sorted = [...data].sort(
                    (a, b) =>
                        new Date(b.periodStart) - new Date(a.periodStart)
                )

                const cycleLengths = sorted
                    .slice(1)
                    .map((p, i) => {
                        const prev = sorted[i + 1]
                        if (!prev) return null
                        return (
                            (new Date(p.periodStart) -
                                new Date(prev.periodStart)) /
                            (1000 * 60 * 60 * 24)
                        )
                    })
                    .filter(Boolean)

                const avgCycle =
                    cycleLengths.reduce((a, b) => a + b, 0) /
                    cycleLengths.length || 28

                const predicted = calculateCyclePrediction({
                    lastPeriodStart: sorted[0].periodStart,
                    cycleLength: Math.round(avgCycle),
                    periodLength: 5,
                })

                setPrediction({
                    ...predicted,
                    cycleLength: Math.round(avgCycle),
                    lastPeriodStart: sorted[0].periodStart,
                })

                setCycleInfo({
                    irregularity: detectCycleIrregularity(cycleLengths),
                    late: isPeriodLate(predicted.nextPeriodStart),
                })
            } catch (err) {
                console.error(err)
            }
        }

        fetchData()
    }, [token])

    /* ---------- LOG PERIOD ---------- */
    const logPeriod = async () => {
        if (!selectedRange?.from) {
            toast.error(t("toast:select_start_date"))
            return
        }

        try {
            await axios.post(
                `https://hercyclebloom.vercel.app/period/create-period-details`,
                {
                    periodStart: selectedRange.from,
                    periodEnd: selectedRange.to || null,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success(t("toast:period_logged"))
            window.location.reload()
        } catch (err) {
            toast.error(t("toast:period_failed"))
            console.error(err)
        }
    }

    /* ---------- PERIOD DAYS ---------- */
    const sortedPeriods = [...periods].sort(
        (a, b) => new Date(b.periodStart) - new Date(a.periodStart)
    )

    const latestPeriod = sortedPeriods[0]
    const previousPeriods = sortedPeriods.slice(1)

    const latestPeriodDays = latestPeriod
        ? (() => {
            const days = []
            let d = new Date(latestPeriod.periodStart)
            d.setHours(0, 0, 0, 0)

            const end = latestPeriod.periodEnd
                ? new Date(latestPeriod.periodEnd)
                : new Date()

            end.setHours(0, 0, 0, 0)

            while (d <= end) {
                days.push(new Date(d))
                d = addDays(d, 1)
            }
            return days
        })()
        : []

    const previousPeriodDays = previousPeriods.flatMap(p => {
        const days = []
        let d = new Date(p.periodStart)
        const end = p.periodEnd
            ? new Date(p.periodEnd)
            : new Date(p.periodStart)

        while (d <= end) {
            days.push(new Date(d))
            d = addDays(d, 1)
        }
        return days
    })

    /* ---------- YEAR-LONG PREDICTIONS ---------- */
    const yearlyPredictions = prediction
        ? generateYearPredictions({
            startDate: prediction.lastPeriodStart,
            cycleLength: prediction.cycleLength,
        })
        : []

    const predictedPeriodDays = yearlyPredictions.map(
        p => p.nextPeriodStart
    )

    const fertileDays = yearlyPredictions.flatMap(p =>
        Array.from({ length: 7 }, (_, i) =>
            addDays(p.fertileWindow.from, i)
        )
    )

    const ovulationDays = yearlyPredictions.map(
        p => p.ovulationDate
    )

    /* ---------- RENDER ---------- */
    return (
        <div className="space-y-4">
            <Calendar
                locale={localeMap[i18n.language] || enUS}
                mode="range"
                selected={selectedRange}
                onSelect={setSelectedRange}
                modifiers={{
                    currentPeriod: latestPeriodDays,
                    pastPeriod: previousPeriodDays,
                    predicted: predictedPeriodDays,
                    fertile: fertileDays,
                    ovulation: ovulationDays,
                    today: [new Date()],
                }}
                modifiersClassNames={{
                    pastPeriod:
                        "bg-palevioletred text-white rounded-full",
                    currentPeriod:
                        "bg-pink-500 text-white rounded-full",
                    predicted:
                        "border-red-400 border border-dashed text-red-400 rounded-full",
                    fertile:
                        "bg-transparent text-green-300 rounded-full",
                    ovulation:
                        "border border-dashed border-green-300 text-green-300 bg-transparent rounded-full",
                    today:
                        "border border-dashed border-blue-500 rounded-full",
                }}
                components={{
                    DayContent: ({ date }) => (
                        <div className="flex flex-col items-center">
                            <span>{date.getDate()}</span>
                            {isSameDay(date, new Date()) && (
                                <span className="text-[10px] text-blue-500">
                                    {t("common:today")}
                                </span>
                            )}
                        </div>
                    ),
                }}
                className="rounded-lg shadow bg-white dark:bg-neutral-800 w-full text-xs"
            />

            <button
                onClick={logPeriod}
                className="w-full bg-palevioletred text-white py-2 rounded-lg mb-3"
            >
                {t("common:log_period")}
            </button>

            {cycleInfo?.late && (
                <p className="text-red-500 text-sm">
                    {t("common:late_period")}
                </p>
            )}

            {cycleInfo?.irregularity?.irregular && (
                <p className="text-orange-500 text-sm">
                    {t("commo:irregular_cycle")}
                </p>
            )}
        </div>
    )
}

export default CalendarComponent
