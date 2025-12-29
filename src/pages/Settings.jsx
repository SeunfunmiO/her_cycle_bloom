import { ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


const Settings = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState(null)
    const [email, setEmail] = useState("")

    const maskEmail = (email) => {
        if (!email) return '';

        const [username, domain] = email.split("@")

        if (username.length <= 3) {
            return username[0] + "*".repeat(username.length - 2) + username[username.length - 1] + "@" + domain;
        }

        const visibleStart = username.slice(0, 3);
        const visibleEnd = username.slice(-1);
        const masked = "*".repeat(username.length - 4);
        return `${visibleStart}${masked}${visibleEnd}@${domain}`
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // const user = JSON.parse(localStorage.getItem('user'))
                // const id = user?.id

                // if (!user) {
                //     toast.error("User ID not found")
                // }

                const response = await axios.get(`https://her-cycle-bloom-backend.onrender.com/user/get-user`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                const data = response.data.user
                if (!data) {
                    return null
                } else {
                    setName(data.name)
                    setPhoto(data.profilePicture)
                    setEmail(maskEmail(data.email))
                }
            } catch (error) {
                console.error("Error fetching user:", error)
                toast.error("Failed to load user data")
            }
        }
        fetchUser()
    }, [])



    return (
        <div className='bg-[#f9f9f9] dark:bg-neutral-900 transition-colors duration-300'>
            <div className='max-w-md mx-auto'>

                <h1 className="font-bold text-xl lg:text-2xl text-center pt-10 pb-5 bg-white dark:bg-neutral-800">
                    Settings
                </h1>

                <div className="bg-white dark:bg-neutral-800 shadow mx-3 my-8 h-30 rounded-xl flex justify-between items-center px-3">
                    <div className='flex items-center gap-5'>
                        <div className="bg-[#febcb7] rounded-full flex justify-center items-center size-16">
                            <img
                                className='rounded-full size-16 w-fit'
                                src={photo || "User Pic.png"}
                                alt="Profile Picture"
                            />
                        </div>
                        <div>
                            <h1
                                className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-neutral-100"
                            >
                                {name || 'User'}
                            </h1>
                            <p className='text-[#535862] dark:text-neutral-600 font-bold text-sm lg:text-base'>
                                {email || ""}
                            </p>
                        </div>
                    </div>

                    <img
                        className='cursor-pointer size-5 lg:size-6 dark:invert'
                        onClick={() => navigate('/profile-settings')}
                        src="./edit.svg" alt="Edit Button"
                    />
                </div>

                <div className='px-3 text-lg lg:text-xl'>
                    <h1 className="font-bold text-palevioletred">User Data</h1>

                    <div className="bg-white dark:bg-neutral-800 shadow my-5 h-30 rounded-xl px-3 flex flex-col justify-center gap-4">
                        <button className='flex justify-between items-center cursor-pointer outline-0'>
                            <div
                                onClick={() => navigate('/cycle-information')}
                                className='flex items-center gap-5'>
                                <img className='dark:invert' src="./calendar-circle.svg" alt="Calendar" />
                                <h3 className="font-medium text-[15px] md:text-base lg:text-lg text-neutral-900 dark:text-neutral-100">
                                    Cycle Information
                                </h3>
                            </div>
                            <ChevronRight className="text-gray-400 w-5 md:w-6 dark:invert" />
                        </button>

                        <div className="border-b border-gray-200 dark:border-neutral-700 ml-10"></div>

                        <button
                            onClick={() => navigate('/account')}
                            className="flex items-center justify-between cursor-pointer outline-0">
                            <div className="flex gap-5 items-center">
                                <img className=' dark:invert' src="./profile-circle.svg" alt="Profile" />
                                <h3
                                    className="text-neutral-900 dark:text-neutral-100 font-medium text-[15px] md:text-base lg:text-lg">
                                    Account
                                </h3>
                            </div>
                            <ChevronRight className="text-gray-400 w-5 md:w-6 dark:invert" />
                        </button>
                    </div>
                </div>

                <div className='px-3 text-lg lg:text-xl'>
                    <h1 className="font-bold text-palevioletred">Preferences</h1>

                    <div className="bg-white dark:bg-neutral-800 shadow my-5 h-50 rounded-xl px-3 flex flex-col justify-center gap-4">
                        <button
                            onClick={() => navigate('/set-reminder')}
                            className="flex items-center justify-between cursor-pointer outline-0">
                            <div className='flex items-center gap-5'>
                                <img className='dark:invert' src="./notification.svg" alt="Bell" />
                                <h3
                                    className="font-medium text-[15px] md:text-base lg:text-lg text-neutral-900 dark:text-neutral-100">
                                    Reminders
                                </h3>
                            </div>
                            <ChevronRight className="text-gray-400 w-5 md:w-6 dark:invert" />
                        </button>

                        <div className="border-b border-gray-200 dark:border-neutral-700 ml-10"></div>


                        <button
                            onClick={() => navigate('/languages')}
                            className="flex justify-between items-center cursor-pointer outline-0">
                            <div className='flex items-center gap-5'>
                                <img className=' dark:invert' src="./language-circle.svg" alt="Languages" />
                                <h3 className="font-medium text-[15px] md:text-base lg:text-lg text-neutral-900 dark:text-neutral-100">
                                    Language
                                </h3>
                            </div>
                            <ChevronRight className="text-gray-400 w-5 md:w-6 dark:invert" />
                        </button>

                        <div className="border-b border-gray-200 ml-10 dark:border-neutral-700"></div>

                        <button
                            onClick={() => navigate('/theme')}
                            className="flex justify-between items-center cursor-pointer outline-0">
                            <div className='flex items-center gap-5'>
                                <img className=' dark:invert' src="./brush.svg" alt="Brush" />
                                <h3 className="font-medium text-[15px] md:text-base lg:text-lg text-neutral-900 dark:text-neutral-100">
                                    Theme
                                </h3>
                            </div>
                            <ChevronRight className="text-gray-400 w-5 md:w-6 dark:invert" />
                        </button>
                    </div>
                </div>

                <div className='px-3 text-lg lg:text-xl pb-20 md:pb-30'>
                    <h1 className="font-bold text-palevioletred">Legal</h1>

                    <div className="bg-white dark:bg-neutral-800 shadow my-5 h-30 rounded-xl px-3 flex flex-col justify-center gap-4">
                        <button
                            onClick={() => navigate('/privacy-policy')}
                            className="flex items-center justify-between cursor-pointer outline-0">
                            <div className='flex items-center gap-5'>
                                <img className='dark:invert' src="./shield-tick.svg" alt="Bell" />
                                <h3
                                    className="font-medium text-[15px] md:text-base lg:text-lg text-neutral-900 dark:text-neutral-100">
                                    Privacy Policy
                                </h3>
                            </div>
                            <ChevronRight className="text-gray-400 w-5 md:w-6 dark:invert" />
                        </button>

                        <div className="border-b border-gray-200 dark:border-neutral-700 ml-10"></div>


                        <button
                            onClick={() => navigate('/terms-of-use')}
                            className="flex justify-between items-center cursor-pointer outline-0">
                            <div className='flex items-center gap-5'>
                                <img className=' dark:invert' src="./terms.svg" alt="Languages" />
                                <h3 className="font-medium text-[15px] md:text-base lg:text-lg text-neutral-900 dark:text-neutral-100">
                                    Terms of Use
                                </h3>
                            </div>
                            <ChevronRight className="text-gray-400 w-5 md:w-6 dark:invert" />
                        </button>
                    </div>
                </div>
            </div>

            <Navbar />
        </div>
    )
}

export default Settings