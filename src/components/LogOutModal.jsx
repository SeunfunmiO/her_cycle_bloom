import { ChevronRight, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LogOutModal = () => {
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const navigate = useNavigate()

    const handleLogOut = () => {
        try {
            localStorage.removeItem("token")
            setOpenLogoutModal(false)
            toast.success("You have successfully logged out")
            navigate('/log-in')
        } catch (error) {
            console.log("error logging out : ", error);
        }
    }

    return (
        <div>
            <button
                onClick={() => setOpenLogoutModal(true)}
                className="flex items-center justify-between cursor-pointer w-full">
                <div
                    className='flex items-center gap-5'
                >
                    <LogOut className='text-darkslategray dark:text-white size-5 lg:size-6' />
                    <h3
                        className="text-[15px] md:text-base font-medium lg:text-lg">
                        Log Out
                    </h3>
                </div>

                <ChevronRight className="text-gray-300 dark:text-white w-5 md:w-6" />
            </button>


            {openLogoutModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setOpenLogoutModal(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-11/12 max-w-md p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-gray-800 dark:text-neutral-100 text-center mb-4">
                            Logout
                        </h2>
                        <hr className='border border-gray-200' />
                        <p className="text-gray-800 my-5 dark:text-neutral-200 text-center text-sm lg:text-base">
                            Are you sure you want to logout ? If you do , you will need to enter your credentials to access your account again.
                        </p>

                        <div className='flex justify-center items-center my-5'>
                            <img className='dark:invert' src="./Logout.png" alt="Image" />
                        </div>

                        <div className="flex justify-center items-center gap-3 mt-6">
                            <button
                                onClick={() => setOpenLogoutModal(false)}
                                className="py-2 rounded-lg outline outline-pink-400 hover:bg-palevioletred hover:text-white
                                         text-palevioletred font-medium w-full text-sm lg:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogOut}
                                className="py-2 rounded-lg bg-palevioletred text-white hover:bg-pink-600 font-medium w-full text-sm 
                                    lg:text-base"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default LogOutModal