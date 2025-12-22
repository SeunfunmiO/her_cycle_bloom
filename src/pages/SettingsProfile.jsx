import axios from 'axios'
import { ChevronRight, Edit, LucideCalendarDays } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SettingsProfile = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState(null)
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")




    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const id = user?.id

                if (!user) {
                    toast.error("User ID not found")
                }

                const response = await axios.get(`https://her-cycle-bloom-backend.onrender.com/user/get-user/${id}`)
                const data = response.data.user

                const dateOfBirth = new Date(data.dateOfBirth).toLocaleDateString()

                if (data) {
                    setName(data.name)
                    setPhoto(data.profilePicture)
                    setEmail(data.email)
                    setAddress(data.address)
                    setDateOfBirth(dateOfBirth)
                }
            } catch (error) {
                console.error("Error fetching user:", error)
                toast.error("Failed to load user data")
            }
        }
        fetchUser()
    }, [])


    return (
        <div className='bg-[#f9f9f9] h-screen dark:bg-neutral-900 transition-colors duration-300'>

            <div className="max-w-md mx-auto">
                <div className="bg-white dark:bg-neutral-800 flex w-full items-center pt-10 pb-5">
                    <img
                        onClick={() => navigate(-1)}
                        className='dark:invert'
                        src="./Arrow Left.svg" alt="arrow left"
                    />
                    <h1 className="font-bold text-lg lg:text-xl w-full text-center text-neutral-900 dark:text-neutral-100">
                        Profile
                    </h1>
                </div>

                <div className='flex justify-center mt-5 relative'>
                    <div className="bg-[#febcb7] rounded-full flex justify-center items-center size-16 dark:bg-neutral-900">
                        <img
                            className='size-16 rounded-full w-fit'
                            src={photo || "User Pic.png"} alt="Profile Picture"
                        />
                    </div>

                    <label
                        htmlFor='photo'
                        className='size-6 rounded-full bg-palevioletred items-center flex justify-center absolute top-12'>
                        <img
                            src="./edit-2.svg" alt="Edit"
                        />
                    </label>

                    <input
                        className='hidden'
                        accept='image/*'
                        name='photo'
                        id='photo'
                        type="file"
                    />
                </div>


                <div className="bg-white dark:bg-neutral-800 shadow my-8 h-60 rounded-xl px-3 flex flex-col justify-center gap-4 w-full">
                    <div className='flex justify-between items-center md:text-xl'>
                        <h3
                            className="text-[15px] md:text-base font-medium lg:text-lg text-neutral-900 dark:text-neutral-100">
                            Name
                        </h3>

                        <div
                            onClick={() => navigate('/edit-name')}
                            className='flex items-center gap-3 '
                        >
                            <button
                                className='text-gray-400 dark:text-neutral-500 text-[15px] md:text-base font-medium lg:text-lg 
                               outline-0'>
                                {name || ""}
                            </button>
                            <ChevronRight className="text-gray-400 dark:text-neutral-100 w-5 md:w-6" />
                        </div>

                    </div>

                    <div className="border-b border-gray-200 dark:border-neutral-700"></div>

                    <div className='flex justify-between items-center md:text-xl'>
                        <h3 className="text-[15px] md:text-base font-medium lg:text-lg text-neutral-900 dark:text-neutral-100">
                            Email
                        </h3>

                        <button
                            onClick={() => navigate('/edit-gmail')}
                            className='text-gray-400 dark:text-neutral-500 text-[15px] md:text-base font-medium outline-0 
                             flex gap-3 items-center lg:text-lg'>
                            {email || ""}
                            <ChevronRight className="text-gray-400 dark:text-neutral-100 w-5 md:w-6" />
                        </button>
                    </div>

                    <div className="border-b border-gray-200 dark:border-neutral-700"></div>

                    <div className='flex justify-between items-center md:text-xl'>
                        <h3 className="text-[15px] md:text-base font-medium lg:text-lg  text-neutral-900 dark:text-neutral-100">
                            Date of birth
                        </h3>
                        <button
                            onClick={() => navigate('/date-of-birth')}
                            className='text-gray-400 dark:text-neutral-500 text-[15px] md:text-base font-medium
                                flex items-center gap-3 lg:text-lg'>
                            {dateOfBirth || ""}

                            <img
                                className="text-gray-400 dark:invert w-5 md:w-6"
                                src="./calendar-edit.svg" alt="calendar"
                            />
                        </button>
                    </div>

                    <div className="border-b border-gray-200 dark:border-neutral-700"></div>

                    <div className='flex justify-between items-center md:text-xl'>
                        <h3 className="text-[15px] md:text-base font-medium lg:text-lg text-neutral-900 dark:text-neutral-100">
                            Address
                        </h3>

                        <button
                            onClick={() => navigate('/edit-address')}
                            className='text-gray-400 dark:text-neutral-500 text-[15px] md:text-base font-medium 
                                outline-0 lg:text-lg flex gap-3 items-center'>
                            {address || ""}
                            <ChevronRight className="text-gray-400 dark:text-neutral-100 w-5 md:w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SettingsProfile