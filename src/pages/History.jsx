import { ChevronRight, ChevronsDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HistoryFilter from '../components/HistoryFilter'
import axios from 'axios'

const History = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [periodHistories, setPeriodHistories] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("newest");


    const formatFullDate = (dateString) => {
        const date = new Date(dateString)

        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    const formatMonthYear = (dateString) => {
        const date = new Date(dateString)

        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://her-cycle-bloom-backend.onrender.com/period/get-entry",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )

                const data = res.data.entries || []
                setPeriodHistories(data)

            } catch (err) {
                console.log('Error fetching data: ', err);
            }
        }
        fetchData()
    }, [token])

    const getCycleLength = (start, end) => {
        if (!start || !end) return 0;

        const startDate = new Date(start);
        const endDate = new Date(end);

        return (endDate - startDate) / (1000 * 60 * 60 * 24);
    };

    const sortedHistories = [...periodHistories].sort((a, b) => {
        const aStart = new Date(a.periodStart);
        const bStart = new Date(b.periodStart);

        switch (selectedFilter) {
            case "newest":
                return bStart - aStart;

            case "oldest":
                return aStart - bStart;

            case "longest":
                return (
                    getCycleLength(b.periodStart, b.periodEnd) -
                    getCycleLength(a.periodStart, a.periodEnd)
                );

            case "shortest":
                return (
                    getCycleLength(a.periodStart, a.periodEnd) -
                    getCycleLength(b.periodStart, b.periodEnd)
                );

            default:
                return 0;
        }
    });


    const flowIcons = {
        Light: "./light-flow.svg",
        Medium: "./medium-flow.svg",
        Heavy: "./heavy-flow.svg",
    }


    return (

        <div className='bg-white dark:bg-neutral-900 h-screen transition-colors duration-200'>
            <div className="max-w-md mx-auto px-4">
                <div className="flex justify-between items-center pb-5 pt-10">
                    <img
                        className='cursor-pointer dark:invert'
                        onClick={() => navigate(-1)}
                        src="./Arrow Left.svg"
                        alt="arrow left"
                    />
                    <h1 className="text-lg font-bold">History</h1>

                    <HistoryFilter
                    selected={selectedFilter}
                    setSelected={setSelectedFilter}
                    />

                </div>

                <h1 className="font-bold text-lg">Past Cycles</h1>

                <div className='mt-8 flex flex-col gap-3 pb-20'>
                    {
                       sortedHistories.length > 0 ? (
                           sortedHistories.map((history, index) => (
                                <div
                                    onClick={() => navigate('/cycle-details')}
                                    className='flex justify-between items-center cursor-pointer'
                                    key={index}
                                >
                                    <div className='flex flex-col'>
                                        <p className="font-medium">
                                            {formatMonthYear(history.periodStart)}
                                        </p>

                                        <small className="text-dimgray font-medium">
                                            {formatFullDate(history.periodStart)} -{" "}
                                            {formatFullDate(history.periodEnd)}
                                        </small>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className='flex items-center gap-2'>
                                            <small className='font-medium'>
                                                {history.flowIntensity || "Light"}
                                            </small>
                                            <img
                                                src={flowIcons[history.flowIntensity] || "./light-flow.svg"}
                                                alt="droplet"
                                            />

                                        </div>
                                        <ChevronRight />
                                    </div>
                                </div>
                            ))
                        ) : <h2 className='text-gray-400 dark:invert font-medium text-sm lg:text-base'>
                            No period data found
                        </h2>
                    }

                    <div className="border-b border-gray-200 dark:border-neutral-700"></div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default History