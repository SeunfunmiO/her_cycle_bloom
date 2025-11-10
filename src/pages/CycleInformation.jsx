import { Calendar, ChevronRight, Hourglass, LucideCalendarDays } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CycleInformation = () => {
    const navigate = useNavigate()

    return (
        <div className='bg-[#f9f9f9] h-screen flex flex-col gap-5'>
            <div className="bg-white flex w-full items-center pt-10 pb-5 mb-4 px-3">
                <img
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg" alt="arrow left" />
                <h1 className="font-bold text-xl md:text-2xl w-full text-center">
                    Cycle Information
                </h1>
            </div>

            <div className='px-3 pb-8 text-lg md:text-xl lg:text-2xl'>
                <h1 className="font-bold text-palevioletred">Period History</h1>

                <div className="bg-white shadow my-3 h-16 rounded-2xl px-3 flex flex-col justify-center gap-4">
                    <div className='flex justify-between items-center'>
                        <div
                            onClick={() => navigate('/cycle-information')}
                            className='flex items-center gap-5'>
                            <h3 className="font-medium">Last Period</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <h2 className='text-gray-400 font-medium text-sm md:text-base'>29 Mar - 5 Apr,2024</h2>
                            <LucideCalendarDays className="text-gray-400 w-5 md:w-6" />
                        </div>
                    </div>
                </div>
                <h5 className="text-sm text-gray-400 font-medium">
                    Crucial for period and ovulation predication accuracy.
                </h5>
            </div>


            <div className='px-3 text-lg md:text-xl lg:text-2xl pb-20 md:pb-30'>
                <h1 className="font-bold text-palevioletred">Period Metrics</h1>

                <div className="bg-white shadow my-3 h-30 rounded-xl px-3 flex flex-col justify-center gap-3">
                    <div
                        onClick={() => navigate('/period-duration')}
                        className="flex items-center justify-between">
                        <div className='flex items-center gap-5'>
                            <Hourglass className='text-darkslategray size-5 lg:size-6' />
                            <h3 className="font-medium">Period Duration</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-gray-400 font-medium text-sm md:text-base">
                                6 Days
                            </p>
                            <ChevronRight className="text-gray-300 w-5 md:w-6" />
                        </div>
                    </div>

                    <hr className='border-gray-200 border ml-10' />

                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-5'>
                            <div
                                className="size-7 lg:size-10 rounded-full border-2 border-darkslategray flex items-center justify-center">
                                <Calendar className='size-4 lg:size-6' />
                            </div>
                            <h3 className="font-medium">Cycle Length</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-gray-400 font-medium text-sm md:text-base">
                                28 Days
                            </p>
                            <ChevronRight className="text-gray-300 w-5 md:w-6" />
                        </div>
                    </div>
                </div>
                <h5 className="text-sm text-gray-400 font-medium">
                    These average values are derived from period history.
                    However, you can click on the values to edit them.
                </h5>
            </div>

        </div>
    )
}

export default CycleInformation