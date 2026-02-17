import axios from 'axios'
import { ChevronRight, Edit, LucideCalendarDays } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditPicture from './EditPicture'
import DateofBirth from '../components/DateofBirth'

const SettingsProfile = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://her-cycle-bloom-backend.onrender.com/user/get-user`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                const data = response.data

                // const dateOfBirth = new Date(data.user.dateOfBirth).toLocaleDateString()

                if (!data.success) {
                    return toast.error(data.message || "Unable to load data")
                } else {
                    setName(data.user.name)
                    setPhoto(data.user.profilePicture)
                    setEmail(data.user.email)
                    setAddress(data.user.address || 'No address yet')
                    setDateOfBirth(data.user.dateOfBirth)
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
                <EditPicture photo={photo} setPhoto={setPhoto}/>
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

                    <DateofBirth
                        value={dateOfBirth}
                        onChange={setDateOfBirth}
                    />

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
        </div >
    )

}

export default SettingsProfile