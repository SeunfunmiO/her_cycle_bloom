import React from 'react'
import CalendarComponent from '../components/Calendar'
import Navbar from '../components/Navbar'

const ViewCalendar = () => {
    return (
        <div className='bg-lavender md:h-screen h-full'>
            <div
                className='p-5'
            >
                <h2 className='font-medium text-lg'>Calendar</h2>
                <CalendarComponent />
            </div>

            <div
                className='bg-white h-60 md:h-30 p-3'
            >
                <h1 className='font-medium text-lg lg:text-xl'>Cycle Overview</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <div className="flex gap-3 items-center">
                        <div className='bg-babypink size-10 rounded-lg flex justify-center items-center'>
                            <img src="./Vector - (10).svg" alt="cycle" />
                        </div>

                        <div>
                            <h3 className="font-semibold lg:text-lg">Follicular Phase</h3>
                            <small className="text-[#b49ea5] font-medium">Day 12</small>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className='bg-babypink size-10 rounded-lg flex justify-center items-center'>
                            <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 1.svg" alt="Calendar" />
                        </div>

                        <div>
                            <h3 className="font-semibold lg:text-lg">Next Period</h3>
                            <small className="text-[#b49ea5] font-medium">14 days until the next period</small>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className='bg-babypink size-10 rounded-lg flex justify-center items-center'>
                            <img src="./Vector - (9).svg" alt="" />
                        </div>

                        <div>
                            <h3 className="font-semibold lg:text-lg">Cycle Length</h3>
                            <small className="text-[#b49ea5] font-medium">Average cycle length: 28 days</small>
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-black mt-3 h-30 flex justify-center items-center">
                <img
                className='p-3 lg:p-0'
                src="./Depth1.png" alt="photo" />
            </div>

            <Navbar />
        </div>
    )
}

export default ViewCalendar