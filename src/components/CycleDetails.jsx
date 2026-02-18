import { ArrowLeft, ChevronDown } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CycleDetails = () => {
    const navigate = useNavigate()
    

    return (
        <div className='bg-white dark:bg-neutral-900 transition-colors duration-200'>
            <div className="max-w-md mx-auto pb-5">
                <div className="px-4">
                    <div className="flex justify-between items-center pb-5 pt-10">
                        <ArrowLeft
                            className='cursor-pointer'
                            onClick={() => navigate(-1)}
                        />
                        <h1 className="text-lg font-bold">July Cycle 2025</h1>
                        <img
                            onClick={() => navigate('/export-data')}
                            className='cursor-pointer dark:invert size-4'
                            src="./Arrow-circle-up.svg" alt="Export data"
                        />
                    </div>

                    <div className="mt-5">
                        <h1 className="font-bold text-lg lg:text-xl">Cycle Overview</h1>

                        <div className="grid grid-cols-1 gap-5 mt-5">
                            <div className='flex items-center gap-3'>
                                <p className="text-gray-500 font-semibold dark:invert">Period : </p>
                                <p className="font-semibold">July 3 - July 7</p>
                            </div>

                            <div className='flex items-center gap-3'>
                                <p className="text-gray-500 font-semibold dark:invert">Cycle Length : </p>
                                <p className="font-semibold">28 days</p>
                            </div>

                            <div className='flex items-center gap-3'>
                                <p className="text-gray-500 font-semibold dark:invert">Average Flow : </p>
                                <div className='flex items-center gap-2'>
                                    <p className="font-semibold">Medium</p>
                                    <img src="./medium-flow.svg" alt="droplet" />
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 mt-8 justify-between'>
                            <div className='flex gap-3 items-center'>
                                <p className="text-gray-500 font-semibold dark:invert">Top Symptoms Logged : </p>
                                <p className="font-semibold">Cramps</p>
                            </div>
                            <img src="./Cramps.svg" alt="Icon" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-neutral-600 mt-8"></div>

                <div className='px-4 mt-5'>
                    <h1 className="font-bold text-lg lg:text-xl mb-3">Daily Cycle Log</h1>

                    <div className="grid grid-cols-1 gap-2">
                        <div className="border-2 border-gray-100 rounded-xl h-20 flex items-center justify-between px-3">
                            <div className="flex flex-col">
                                <h1 className="font-medium">July 3 <span className='text-gray-500 dark:invert'> (Day 1)</span></h1>
                                <div className='flex items-center gap-2'>
                                    <p className="font-semibold">Light</p>
                                    <img src="./light-flow.svg" alt="droplet" />
                                </div>
                            </div>

                            <div className='flex items-center gap-5'>
                                <h3 className="font-semibold">Cramps</h3>
                                <img src="./Cramps.svg" alt="Icon" />
                                <ChevronDown />
                            </div>
                        </div>


                        <div className="border-2 border-gray-100 rounded-xl h-20 flex items-center justify-between px-3">
                            <div className="flex flex-col">
                                <h1 className="font-medium">July 4 <span className='text-gray-500 dark:invert'> (Day 2)</span></h1>
                                <div className='flex items-center gap-2'>
                                    <p className="font-semibold">Heavy</p>
                                    <img src="./heavy-flow.svg" alt="droplet" />
                                </div>
                            </div>

                            <div className='flex items-center gap-5'>
                                <h3 className="font-semibold">Fatigue</h3>
                                <img src="./Fatigue.svg" alt="Icon" />
                                <ChevronDown />
                            </div>
                        </div>


                        <div className="border-2 border-gray-100 rounded-xl h-20 flex items-center justify-between px-3">
                            <div className="flex flex-col">
                                <h1 className="font-medium">
                                    July 5
                                    <span className='text-gray-500 dark:invert'> (Day 3)</span>
                                </h1>
                                <div className='flex items-center gap-2'>
                                    <p className="font-semibold">Medium</p>
                                    <img src="./medium-flow.svg" alt="droplet" />
                                </div>
                            </div>

                            <div className='flex items-center gap-5'>
                                <h3 className="font-semibold">Relaxed</h3>
                                <img src="./Relaxed.svg" alt="Icon" />
                                <ChevronDown />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-neutral-600 mt-8"></div>

                <div className='px-4 flex flex-col gap-5 mt-5'>
                    <h1 className="font-medium text-lg lg:text-xl">Patterns & Insights</h1>
                    <div className='flex items-center gap-1 font-medium'>
                        <p className="text-gray-500 dark:invert">
                            Average Cycle Length :
                        </p>
                        <span>29 days</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <div className='flex items-center gap-3'>
                            <img src="./Bulb.svg" alt="icon" />
                            <p className='font-medium text-lime-600 text-sm'>
                                Your flow tends to be heaviest on Day 2.
                            </p>
                        </div>

                        <div className='flex items-center gap-3'>
                            <img src="./Bulb.svg" alt="icon" />
                            <p className='font-medium text-lime-600 text-sm'>
                                Headaches often occur 2 days before your period.
                            </p>
                        </div>

                        <div className='flex items-center gap-3'>
                            <img src="./Bulb.svg" alt="icon" />
                            <p className='font-medium text-lime-600 text-sm'>
                                You often feel more energetic on during your follicularphase.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CycleDetails