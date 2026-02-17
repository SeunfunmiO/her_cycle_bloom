
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AllowNotification = () => {
    const navigate = useNavigate()
    const {t}=useTranslation([
        "settings",
        "toast"
    ])

    const handleEnableNotifications = async () => {
        if (!("Notification" in window)) {
            toast.error("This browser does not support notifications.");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const id = user?.id;

            if (!id) {
                toast.error("User not found. Please log in again.");
                return;
            }

            const permission = await Notification.requestPermission();
            const isGranted = permission === "granted";

            const response = await axios.put(
                `https://her-cycle-bloom-backend.onrender.com/user/enable-notification`,
                { isNotification: isGranted },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            const data = response.data;

            if (isGranted) {
                toast.success(data.message || "Notifications enabled!");
            } else if (permission === "denied") {
                toast.error("Notifications denied!");
            } else {
                toast.info("Notifications permission dismissed.");
            }

            if (data?.success) {
                navigate('/get-ready');
            }
        } catch (error) {
            console.error("Notification Error:", error);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong, please try again"
            );
        }
    };

    return (
        <div className="bg-lavender min-h-screen">
            <div className="max-w-md mx-auto px-4">
                <div className='pt-12 flex justify-end'>
                    <img
                        className='size-9'
                        src="./Bell.png"
                        alt="bell"
                    />
                </div>

                <div className='text-black '>
                    <h6 className="font-bold mt-8 text-center text-2xl">Never miss a Reminder</h6>
                    <p className='mt-8 font-medium'>
                        Get timely alerts for your period, ovulation and health tips- only when it matters most.
                    </p>
                </div>

                <div className='mt-10 flex flex-col gap-3'>
                    <button type='button'
                        onClick={handleEnableNotifications}
                        className='w-full text-sm text-white py-3 font-semibold outline-0 rounded-full bg-palevioletred'>
                        Enable Notifications
                    </button>

                    <button type='button'
                        onClick={() => navigate('/home')}
                        className='w-full text-white text-sm py-3 font-semibold outline-0 rounded-full bg-palevioletred'>
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllowNotification