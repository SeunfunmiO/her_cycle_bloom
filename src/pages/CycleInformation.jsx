import axios from 'axios'
import { Calendar, ChevronRight, Hourglass, LucideCalendarDays } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CycleInformation = () => {
    const navigate = useNavigate()
    const [periodStart, setPeriodStart] = useState([]);
    const [formattedPeriod, setFormattedPeriod] = useState([]);
    const [cycleLength, setCycleLength] = useState(29)

    useEffect(() => {
        const fetchEntry = async () => {
            const res = await axios.get(`${import.meta.env.APP_URL}/period/get-entries`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            const data = res.data.entries

            const cycle = data.cycleLength || 29
            setCycleLength(cycle)

            const periodStartDay = data.periodStart
            setPeriodStart(periodStartDay)
            console.log(periodStart);

            const formatted = data.periodStart?.map((start, index) => {
                const startDate = new Date(start);
                const endDate = new Date(data?.periodEnd[index]);

                const options = { day: 'numeric', month: 'short' };

                const startFormatted = startDate.toLocaleDateString('en-GB', options);
                const endFormatted = endDate.toLocaleDateString('en-GB', options);

                const year = endDate.getFullYear();

                return `${startFormatted} - ${endFormatted}, ${year}`;
            });

            setFormattedPeriod(formatted)

        }
        fetchEntry()
    }, [periodStart])

    return (
        <div className='bg-[#f9f9f9] dark:bg-neutral-900 transition-colors duration-200 h-screen flex flex-col gap-5'>
            <div className="max-w-md mx-auto">
                <div
                    className="bg-white dark:bg-neutral-800 flex w-full items-center pt-10 pb-5 mb-4 px-3"
                >
                    <img
                        onClick={() => navigate(-1)}
                        src="./Arrow Left.svg"
                        alt="back"
                        className='dark:invert'
                    />
                    <h1
                        className="font-bold text-xl w-full text-center text-neutral-900 dark:text-neutral-100"
                    >
                        Cycle Information
                    </h1>
                </div>

                <div className='px-3 pb-8'>
                    <h1 className="font-bold text-palevioletred text-lg lg:text-xl">Period History</h1>

                    <div
                        className="bg-white dark:bg-neutral-800 shadow my-3 h-16 rounded-2xl px-3 flex flex-col justify-center gap-4"
                    >
                        <div className='flex justify-between items-center'>
                            <div
                                onClick={() => navigate('/cycle-information')}
                                className='flex items-center gap-5'>
                                <h3 className="font-medium">Last Period</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <h2 className='text-gray-400 dark:invert font-medium text-sm lg:text-base'>
                                    {formattedPeriod[formattedPeriod.length - 1] || 'No period data'}
                                </h2>
                                <img
                                    src="./Calendar12.svg"
                                    alt="calendar"
                                    className='dark:text-white/'
                                />
                            </div>
                        </div>
                    </div>
                    <h5 className="text-sm text-gray-400 dark:invert font-medium">
                        Crucial for period and ovulation predication accuracy.
                    </h5>
                </div>


                <div className='px-3'>
                    <h1 className="font-bold text-palevioletred text-lg lg:text-xl">Period Metrics</h1>

                    <div
                        className="bg-white dark:bg-neutral-800 shadow my-3 h-30 rounded-xl px-3 flex flex-col justify-center gap-3"
                    >
                        <div
                            onClick={() => navigate('/period-duration')}
                            className="flex items-center justify-between">
                            <div className='flex items-center gap-5'>
                                <Hourglass className='text-darkslategray dark:invert size-5 lg:size-6' />
                                <h3 className="font-medium">Period Duration</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-gray-400 dark:invert font-medium text-sm lg:text-base">
                                    {formattedPeriod.length} Days
                                </p>
                                <ChevronRight className="text-gray-300 w-5 dark:text-neutral-100" />
                            </div>
                        </div>

                        <div className='border-gray-200 border-b dark:border-neutral-700 ml-10'></div>

                        <div className="flex justify-between items-center">
                            <div className='flex items-center gap-5'>
                                <div
                                    className="size-7 lg:size-10 rounded-full border-2 border-darkslategray flex items-center 
                                    dark:border-neutral-100 justify-center">
                                    <Calendar className='size-4 lg:size-6' />
                                </div>
                                <h3 className="font-medium">Cycle Length</h3>
                            </div>
                            <div
                                className="flex items-center gap-3"
                                onClick={() => navigate('/cycle-length')}
                            >
                                <p className="text-gray-400 dark:invert font-medium text-sm lg:text-base">
                                    {cycleLength} Days
                                </p>
                                <ChevronRight className="text-gray-300 dark:text-neutral-100 w-5" />
                            </div>
                        </div>
                    </div>
                    <h5 className="text-sm text-gray-400 dark:invert font-medium">
                        These average values are derived from period history.
                        However, you can click on the values to edit them.
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default CycleInformation