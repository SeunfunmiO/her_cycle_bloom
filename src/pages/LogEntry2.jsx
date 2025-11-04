import { Droplet } from 'lucide-react'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogEntry2 = () => {
    const navigate = useNavigate()
    // const [period, setPeriod] = useState('')

    return (
        <div className='bg-pink-100 p-6 h-full'>
            <div className='flex items-center gap-5 mb-3'>
                <img src="./caret.svg" alt="" />
                <h2 className='font-medium text-lggit '>Record Data</h2>
            </div>

            <hr className='text-black mt-5' />

            <div className='mt-10 grid grid-rows-1 lg:grid-cols-2 gap-5'>
                <div className='bg-white max-w-100 rounded-xl p-5 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5'>
                    <h1 className="font-semibold text-xl lg:text-2xl">Period Type</h1>
                    <div className='flex gap-8'>
                        <button className='border-2 lg:text-lg border-gray-400 hover:bg-gray-100 px-3 py-2 rounded-xl font-medium text-gray-400'>
                            Start
                        </button>
                        <button className='border-2 lg:text-lg border-gray-400 hover:bg-gray-100 px-3 py-2 rounded-xl font-medium text-gray-400'>
                            End
                        </button>
                    </div>
                </div>

                <div className='bg-white max-w-100 rounded-xl p-5 flex flex-col gap-5'>
                    <h1 className="font-semibold text-xl lg:text-2xl">Flow Intensity</h1>
                    <div className='flex gap-5 flex-wrap'>
                        <button className='border-2 lg:text-lg flex gap-2 items-center border-pink-300 hover:bg-pink-300 px-3  hover:text-white py-2 rounded-xl font-medium'>
                            Light <Droplet color='#ff8be0' fill='#ff8be0' />
                        </button>
                        <button className='border-2 flex gap-2 items-center lg:text-lg border-pink-500 hover:bg-pink-500 px-3 hover:text-white py-2 rounded-xl font-medium'>
                            Medium
                            <div className="flex">
                                <Droplet color='#e365c1' fill='#e365c1' />
                                <Droplet color='#e365c1' fill='#e365c1' />
                            </div>
                        </button>
                        <button className='border-2 flex gap-2 items-center lg:text-lg border-pink-700 hover:bg-pink-700  hover:text-white px-3 py-2 rounded-xl font-medium'>
                            Heavy
                            <div className="flex">
                                <Droplet color='#e210a9' fill='#e210a9' />
                                <Droplet color='#e210a9' fill='#e210a9' />
                                <Droplet color='#e210a9' fill='#e210a9' />
                            </div>
                        </button>
                    </div>
                </div>

                <div className='bg-white max-w-100 rounded-xl p-5 flex flex-col gap-3'>
                    <div className='flex flex-col gap-5 md:flex-row md:justify-between md:items-center'>
                        <h1 className="font-semibold text-xl lg:text-2xl">Symptoms</h1>

                        <input type="text" className=" border-2 border-gray-200 px-3 py-2 rounded-xl placeholder:text-gray-100"
                            placeholder='search for symptoms' />
                    </div>

                    <div className="flex items-center flex-wrap gap-10 justify-between">
                        <div className="flex flex-col gap-10">
                            <div className='flex items-center gap-4'>
                                <span className="border-pink-500 border-2 p-3 rounded-full"></span>
                                <img className='w-7 h-7' src="./Vector (1).svg" alt="svg" />
                                <h1 className='font-medium text-xl'>Cramps</h1>
                            </div>

                            <div className='flex items-center gap-4'>
                                <span className="border-pink-500 border-2 p-3 rounded-full"></span>
                                <img className='w-7 h-7' src="./Vector (2).svg" alt="svg" />
                                <h1 className='font-medium text-xl'>Back Pain</h1>
                            </div>

                            <div className='flex items-center gap-4'>
                                <span className="border-pink-500 border-2 p-3 rounded-full"></span>
                                <img className='w-7 h-7' src="./vector (3).svg" alt="svg" />
                                <h1 className='font-medium text-xl'>Nausea</h1>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className='flex items-center gap-4'>
                                <span className="border-pink-500 border-2 p-3 rounded-full"></span>
                                <img className='w-7 h-7' src="./Vector (4).svg" alt="svg" />
                                <h1 className='font-medium text-xl'>Headache</h1>
                            </div>

                            <div className='flex items-center gap-4'>
                                <span className="border-pink-500 border-2 p-3 rounded-full"></span>
                                <img className='w-7 h-7' src="./Vector (5).svg" alt="svg" />
                                <h1 className='font-medium text-xl'>Fatigue</h1>
                            </div>

                            <div className='flex items-center gap-4'>
                                <span className="border-pink-500 border-2 p-3 rounded-full"></span>
                                <img className='w-7 h-7' src="./Vector (6).svg" alt="svg" />
                                <h1 className='font-medium text-xl'>Bloating</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white max-w-100 rounded-xl p-5 flex flex-col gap-5'>
                    <h1 className="font-semibold text-xl lg:text-2xl">Mood</h1>
                    <div className='flex gap-5 flex-wrap'>
                        <button className='border-2 lg:text-lg border-gray-400 flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl font-medium'>
                            <img className='w-7 h-7' src="./Group.svg" alt="svg" />
                            Happy
                        </button>
                        <button className='border-2 lg:text-lg border-gray-400 flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl font-medium'>
                            <img className='w-7 h-7' src="./Group (1).svg" alt="svg" />

                            Sad
                        </button>
                        <button className='border-2 lg:text-lg border-gray-400 flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl font-medium'>
                            <img className='w-7 h-7' src="./Vector (8).svg" alt="svg" />
                            Irritable
                        </button>
                        <button className='border-2 lg:text-lg border-gray-400 flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl font-medium'>
                            <img className='w-7 h-7' src="./Group (3).svg" alt="svg" />
                            Anxious
                        </button>
                        <button className='border-2 lg:text-lg border-gray-400 flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl font-medium'>
                            <img className='w-7 h-7' src="./Group (2).svg" alt="svg" />
                            Emotional
                        </button>
                        <button className='border-2 lg:text-lg border-gray-400 flex items-center hover:bg-gray-100 px-3 py-2 rounded-xl font-medium gap-3'>
                            <img className='w-7 h-7' src="./Vector (7).svg" alt="svg" />
                            Energetic
                        </button>
                    </div>
                </div>

                <div className='bg-white max-w-100 rounded-xl p-5 flex flex-col gap-5'>
                    <h1 className="font-semibold text-xl lg:text-2xl">Notes</h1>
                    <textarea className='border bg-gray-100 rounded-xl placeholder:text-sm px-5 pt-3 pb-12' name="message" id=""
                        placeholder='Add any additional details about your day...'></textarea>
                </div>
            </div>

            <button onClick={() => navigate('/success')} style={{ backgroundColor: "#e365c1" }}
                className='text-white font-bold py-2 mt-5 mb-8 rounded-xl lg:w-1/2 w-full'>Save Entry</button>

        </div>
    )
}

export default LogEntry2