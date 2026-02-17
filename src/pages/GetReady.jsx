import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const GetReady = () => {
    const navigate = useNavigate()
    const { t } = useTranslation("common")

    return (
        <div className="bg-lavender min-h-screen">
            <div className="max-w-md mx-auto px-4">
                <h6 className="font-bold py-12 text-xl lg:text-2xl text-center">{t("common:ready")}</h6>
                <img src="./g763.png" alt="Calender" />

                <div className="pt-24 pb-10">
                    <button
                        type='button'
                        onClick={() => navigate('/home')}
                        className='w-full lg:text-lg py-2 shadow-sm shadow-gray-200 font-bold rounded-full bg-palevioletred ouline-0'>
                        {t("common:home_screen")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GetReady