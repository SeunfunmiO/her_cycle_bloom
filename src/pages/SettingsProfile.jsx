import { ChevronRight, Edit, LucideCalendarDays } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SettingsProfile = () => {
    const navigate = useNavigate()

    return (
        <div className='bg-[#f9f9f9] h-screen flex flex-col gap-5'>

            <div className="bg-white flex w-full items-center pt-10 pb-5 px-3">
                <img
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg" alt="arrow left" />
                <h1 className="font-bold text-xl md:text-2xl w-full flex justify-center">
                    Profile
                </h1>
            </div>

            <div className='flex justify-center'>
                <div className="bg-[#febcb7] rounded-full flex justify-center items-center size-18">
                    <img
                        src="User Pic.png" alt="Profile Picture" />
                    {/* <div>
                    <Edit/>
                    <input
                    className=''
                     type="file" name="picture" id="picture" />
                </div> */}
                </div>
            </div>


            <div className="bg-white shadow my-8 h-60 rounded-xl px-3 flex flex-col justify-center gap-4 w-full">
                <div className='flex justify-between items-center md:text-xl'>
                    <h3 className="font-medium">Name</h3>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/edit-name')}
                            className='text-gray-400 font-medium'>Jamie Sue
                        </button>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>
                </div>

                <hr className='border-gray-200 border' />

                <div className='flex justify-between items-center md:text-xl'>
                    <h3 className="font-medium">Email</h3>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => navigate('/edit-gmail')}
                            className='text-gray-400 font-medium'>jamiesue238@gmail.com
                        </button>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>

                </div>

                <hr className='border-gray-200 border ' />

                <div className='flex justify-between items-center md:text-xl'>
                    <h3 className="font-medium">Date of birth</h3>
                    <div className="flex items-center gap-3">
                        <button className='text-gray-400 font-medium'>20 March,1998</button>
                        <LucideCalendarDays className="text-gray-400 w-5 md:w-6" />
                    </div>
                </div>

                <hr className='border-gray-200 border ' />

                <div className='flex justify-between items-center md:text-xl'>
                    <h3 className="font-medium">Address</h3>

                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => navigate('/edit-address')}
                            className='text-gray-400 font-medium'>Lagos,Nigeria</button>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SettingsProfile