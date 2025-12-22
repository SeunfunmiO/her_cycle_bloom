import React, { useEffect, useState } from 'react'
import CalendarComponent from '../components/Calendar'
import Navbar from '../components/Navbar'
import axios from 'axios'

const ViewCalendar = () => {
    const [daysUntilPeriod, setDaysUntilPeriod] = useState("")
    const [averageCycleLength, setAverageCycleLength] = useState("")


    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const id = user?.id

                const res = await axios.get(`https://her-cycle-bloom-backend.onrender.com/period/get-entry/${id}`)
                const data = res.data.entry

                console.log(data);

                if (!data.periodStart || data.periodStart < 2) return null

                const dates = data.periodStart.map(date => new Date(date))
                dates.sort((a, b) => a - b)
                const cycleLengths = [];

                for (let i = 1; i < dates.length; i++) {
                    const diffInMs = dates[i] - dates[i - 1];
                    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
                    cycleLengths.push(diffInDays)
                }

                const averageCycleLength = cycleLengths.reduce((acc, curr) => acc + curr, 0 / cycleLengths.length)
                setAverageCycleLength(averageCycleLength)
                return Math.round(averageCycleLength)
            } catch (error) {
                console.error("Error fetching entry:", error)
            }

        }
        fetchEntry
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const id = user?.id

                if (!id) {
                    return;
                }

                const response = await axios.get(`https://her-cycle-bloom-backend.onrender.com/user/get-user/${id}`)
                const data = response.data.user

                if (data) {
                    const lastPeriod = data.lastPeriodDate
                    const userCycleLength = data.cycleLength || 28

                    if (lastPeriod) {
                        // Calculate next period date
                        const userLastPeriodDate = new Date(lastPeriod)
                        const nextPeriod = new Date(lastPeriod)
                        nextPeriod.setDate(nextPeriod.getDate() + userCycleLength)

                        // Format date as "Month Day" (e.g., "August 15")
                        const formattedDate = nextPeriod.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric'
                        })

                        // Calculate days until next period
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        nextPeriod.setHours(0, 0, 0, 0)

                        const daysRemaining = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24))
                        setDaysUntilPeriod(daysRemaining > 0 ? daysRemaining : 0)

                        userLastPeriodDate.setHours(0, 0, 0, 0)

                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error)
            }
        }

        fetchUser()
    }, [])



    return (
        <div className='bg-lavender dark:bg-neutral-900 transition-colors duration-200'>
            <div className="max-w-md mx-auto pb-25">
                <div
                    className='p-5'
                >
                    <h2 className='font-medium text-lg text-neutral-900 dark:text-neutral-100'>Calendar</h2>
                    <CalendarComponent />
                </div>

                <div
                    className='bg-white h-60 p-3 dark:bg-neutral-800'
                >
                    <h1 className='font-medium text-lg lg:text-xl text-neutral-900 dark:text-neutral-100'>
                        Cycle Overview
                    </h1>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                        <div className="flex gap-3 items-center">
                            <div className='bg-babypink size-10 rounded-lg flex justify-center items-center'>
                                <img src="./Vector - (10).svg" alt="cycle" />
                            </div>

                            <div>
                                <h3 className="font-semibold lg:text-lg text-neutral-900 dark:text-neutral-100">
                                    Follicular Phase
                                </h3>
                                <small className="text-[#b49ea5] dark:text-[#e0c9cf] font-medium">Day 12</small>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className='bg-babypink size-10 rounded-lg flex justify-center items-center'>
                                <img className='size-4 lg:size-5' src="./Vector - 1.svg" alt="Calendar" />
                            </div>

                            <div>
                                <h3 className="font-semibold lg:text-lg text-neutral-900 dark:text-neutral-100">Next Period</h3>
                                <small className="text-[#b49ea5] dark:text-[#e0c9cf] font-medium">
                                    {daysUntilPeriod || ''} day{daysUntilPeriod.length <= 1 ? '' : "s"} until the next period
                                </small>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className='bg-babypink size-10 rounded-lg flex justify-center items-center'>
                                <img src="./Vector - (9).svg" alt="" />
                            </div>

                            <div>
                                <h3 className="font-semibold lg:text-lg text-neutral-900 dark:text-neutral-100">Cycle Length</h3>
                                <small className="text-[#b49ea5] font-medium dark:text-[#e0c9cf]">
                                    Average cycle length: {averageCycleLength}days
                                </small>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-black dark:bg-neutral-800 mt-3 h-50 flex justify-center items-center">
                    <img
                        className='p-3 lg:p-0 lg:h-40 h-50'
                        src="./Depth1.png" alt="photo" />
                </div>

            </div>
            <Navbar />
        </div>
    )
}

export default ViewCalendar