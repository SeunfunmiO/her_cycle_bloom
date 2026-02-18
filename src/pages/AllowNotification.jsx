
import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AllowNotification = () => {
    const navigate = useNavigate()
    const { t } = useTranslation([
        "settings",
        "toast"
    ])

    const handleEnableNotifications = async () => {
        if (!("Notification" in window)) {
            toast.error(t("toast:browser_support"));
            return;
        }

        try {
            const permission = await Notification.requestPermission();
            const isGranted = permission === "granted";
            const token = localStorage.getItem("token")
            if (!token) return;

            const response = await axios.put(
                `https://hercyclebloom.vercel.app/user/enable-notification`,
                { isNotification: isGranted },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = response.data;

            if (isGranted) {
                toast.success(t("toast:notif_enabled"));
            } else if (permission === "denied") {
                toast.error(t("toast:notif_denied"));
            } else {
                toast.info(t("toast:notif_dismissed"));
            }

            setTimeout(() => {
                if (data?.success) {
                    navigate('/get-ready');
                }
            }, 3000)

        } catch (error) {
            console.error("Notification Error:", error);
            toast.error(t("toast:notif_denied"));
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
                    <h6 className="font-bold mt-8 text-center text-2xl">{t("settings:reminder_info")}</h6>
                    <p className='mt-8 font-medium'>
                        {t("settings:reminder_details")}
                    </p>
                </div>

                <div className='mt-10 flex flex-col gap-3'>
                    <button type='button'
                        onClick={handleEnableNotifications}
                        className='w-full text-sm text-white py-3 font-semibold outline-0 rounded-full bg-palevioletred'>
                        {t("settings:enable")}
                    </button>

                    <button type='button'
                        onClick={() => navigate('/home')}
                        className='w-full text-white text-sm py-3 font-semibold outline-0 rounded-full bg-palevioletred'>
                        {t("settings:later")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllowNotification