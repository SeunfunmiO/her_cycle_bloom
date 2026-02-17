import React from 'react'
import CalendarComponent from '../components/Calendar'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LogEntry1 = () => {
    const navigate = useNavigate()
    const{t}=useTranslation([
        "common",
        "placeholder"
    ])

    return (
        <div className='bg-lavender h-screen dark:bg-neutral-900'>
            <div className='max-w-md mx-auto p-4 max-h-120 lg:max-h-130 overflow-y-auto custom-scrollbar scrollbar-hide'>
                <div className='flex items-center gap-5 mb-3'>
                    <img
                        onClick={() => navigate(-1)}
                        className='size-3.5 dark:invert'
                        src="./caret.svg" alt="" />
                    <h2 className='font-medium text-lg text-neutral-900 dark:text-neutral-100'>
                        {t("common:record")}
                    </h2>
                </div>

                <div className=" border-gray-400 dark:border-neutral-700 border-b"></div>

                <h2 className='font-medium mt-5'>{t("placeholder:select_date")}</h2>
                <CalendarComponent />
            </div>
            <Navbar />
        </div>
    )
}

export default LogEntry1