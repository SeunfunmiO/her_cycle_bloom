import React, { useEffect, useState } from 'react'
import CalendarComponent from '../components/Calendar'
import Navbar from '../components/Navbar'
import axios from 'axios'

const ViewCalendar = () => {
    const [daysUntilPeriod, setDaysUntilPeriod] = useState("")
    const [follicularPhase, setFollicularPhase] = useState(0)
    const [averageCycleLength, setAverageCycleLength] = useState(28)



    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const res = await axios.get(`https://her-cycle-bloom-backend.onrender.com/period/get-entry`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                const data = res.data.entry

                if (!Array.isArray(data.periodStart) || data.periodStart.length < 2) return

                const dates = data.periodStart.map(date => new Date(date))
                dates.sort((a, b) => a - b)
                const cycleLengths = [];

                for (let i = 1; i < dates.length; i++) {
                    const diffInMs = dates[i] - dates[i - 1];
                    const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
                    cycleLengths.push(diffInDays)
                }

                const average =
                    cycleLengths.reduce((acc, curr) => acc + curr, 0) / cycleLengths.length

                setAverageCycleLength(Math.round(average))

                console.log(average);
                

            } catch (error) {
                console.error("Error fetching entry:", error)
            }

        }
        fetchEntry()
    }, [])

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const user = JSON.parse(localStorage.getItem('user'))
    //             const id = user?.id

    //             if (!id) {
    //                 return;
    //             }

    //             const response = await axios.get(`https://her-cycle-bloom-backend.onrender.com/user/get-user/${id}`)
    //             const data = response.data.user

    //             if (data) {
    //                 const lastPeriod = data.lastPeriodDate
    //                 const userCycleLength = data.cycleLength || 28

    //                 if (lastPeriod) {
    //                     // Calculate next period date
    //                     const userLastPeriodDate = new Date(lastPeriod)
    //                     const nextPeriod = new Date(lastPeriod)
    //                     nextPeriod.setDate(nextPeriod.getDate() + userCycleLength)


    //                     // Calculate days until next period
    //                     const today = new Date()
    //                     today.setHours(0, 0, 0, 0)
    //                     nextPeriod.setHours(0, 0, 0, 0)

    //                     const daysRemaining = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24))
    //                     setDaysUntilPeriod(daysRemaining > 0 ? daysRemaining : 0)

    //                     userLastPeriodDate.setHours(0, 0, 0, 0)

    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user:", error)
    //         }
    //     }

    //     fetchUser()
    // }, [])
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(
                    "https://her-cycle-bloom-backend.onrender.com/user/user-profile",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                const userData = res.data.user
                console.log(userData);
                
                if (!userData?.lastPeriodDate) return;

                const lastPeriod = new Date(userData.lastPeriodDate)
                lastPeriod.setHours(0, 0, 0, 0)
                const cycleLength = averageCycleLength || 29

                // Next period
                const nextPeriod = new Date(lastPeriod)
                nextPeriod.setDate(nextPeriod.getDate() + cycleLength)

                // Days until next period
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                nextPeriod.setHours(0, 0, 0, 0)
                const daysRemaining = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24))
                setDaysUntilPeriod(daysRemaining > 0 ? daysRemaining : 0)

                // Follicular phase
                const ovulationDate = new Date(nextPeriod)
                ovulationDate.setDate(ovulationDate.getDate() - 14)

                today.setHours(0, 0, 0, 0)

                const follicularDay = Math.ceil(
                    (today - lastPeriod) / (1000 * 60 * 60 * 24)
                )

                setFollicularPhase(
                    follicularDay > 0 && follicularDay <= 14 ? follicularDay : 0
                )

            } catch (err) {
                console.error(err)
            }
        }

        fetchUserData()
    }, [averageCycleLength])



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
                                <small
                                    className="text-[#b49ea5] dark:text-[#e0c9cf] font-medium"
                                >
                                    Day {follicularPhase || 0}
                                </small>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className='bg-babypink size-10 rounded-lg flex justify-center items-center'>
                                <img className='size-4 lg:size-5' src="./Vector - 1.svg" alt="Calendar" />
                            </div>

                            <div>
                                <h3 className="font-semibold lg:text-lg text-neutral-900 dark:text-neutral-100">Next Period</h3>
                                <small className="text-[#b49ea5] dark:text-[#e0c9cf] font-medium">
                                    {daysUntilPeriod || 0} day{daysUntilPeriod === 1 ? '' : "s"} until the next period
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
                                    Average cycle length: {averageCycleLength} days
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