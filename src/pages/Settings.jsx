import { Bell, Brush, Calendar, ChevronRight, Edit, Languages, User } from 'lucide-react'
import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()

    return (
        <div className='bg-[#f9f9f9]'>

            <h1 className="font-bold text-xl md:text-2xl flex justify-center pt-10 pb-5 bg-white">Settings</h1>

            <div className="bg-white shadow mx-3 my-8 h-30 rounded-xl flex justify-between items-center px-3">
                <div className='flex items-center gap-5'>
                    <div className="bg-[#febcb7] rounded-full flex justify-center items-center size-18">
                        <img src="User Pic.png" alt="Profile Picture" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold">Jamie Sue</h1>
                        <p className='text-[#535862] font-bold'>jam******@gmail.com</p>
                    </div>
                </div>

                <Edit onClick={() => navigate('/profile-settings')} />
            </div>

            <div className='px-3 text-lg md:text-xl lg:text-2xl'>
                <h1 className="font-bold text-palevioletred">User Data</h1>

                <div className="bg-white shadow my-8 h-40 rounded-xl px-3 flex flex-col justify-center gap-4">
                    <div className='flex justify-between items-center'>
                        <div
                            onClick={() => navigate('/cycle-information')}
                            className='flex items-center gap-5'>
                            <div
                                className="size-7 lg:size-10 rounded-full border-2 border-darkslategray flex items-center justify-center">
                                <Calendar className='size-4 lg:size-6' />
                            </div>

                            <h3 className="font-medium">Cycle Information</h3>
                        </div>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>

                    <hr className='border-gray-200 border ml-14' />

                    <div
                        onClick={() => navigate('/account')}
                        className="flex items-center justify-between">
                        <div className="flex gap-5 items-center">
                            <div
                                className="size-7 lg:size-10 rounded-full border-2 border-darkslategray flex items-center justify-center">
                                <User className='lg:size-8' />
                            </div>

                            <h3 className="font-medium">Account</h3>
                        </div>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>
                </div>
            </div>

            <div className='px-3 text-lg md:text-xl lg:text-2xl pb-20 md:pb-30'>
                <h1 className="font-bold text-palevioletred">Preferences</h1>

                <div className="bg-white shadow my-8 h-60 rounded-xl px-3 flex flex-col justify-center gap-4">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-5'>
                            <Bell className='text-darkslategray size-5 lg:size-6' />
                            <h3 className="font-medium">Reminders</h3>
                        </div>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>

                    <hr className='border-gray-200 border ml-10' />

                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-5'>
                            <Languages className='text-darkslategray size-5 lg:size-6' />
                            <h3 className="font-medium">Language</h3>
                        </div>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>

                    <hr className='border-gray-200 border ml-10' />

                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-5'>
                            <Brush className='text-darkslategray size-5 lg:size-6' />
                            <h3 className="font-medium">Theme</h3>
                        </div>
                        <ChevronRight className="text-gray-400 w-5 md:w-6" />
                    </div>
                </div>
            </div>

            <Navbar />
        </div>
    )
}

export default Settings