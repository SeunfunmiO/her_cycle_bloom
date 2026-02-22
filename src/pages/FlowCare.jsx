import { ArrowLeft, SendHorizonal } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const FlowCare = () => {
    const navigate = useNavigate()
    const {t}=useTranslation([
        "cycle",
        "placeholder"
    ])

    return (
        <div
            className="bg-white dark:bg-neutral-900 h-screen transition-colors duration-200"
        >
            <div className="max-w-md mx-auto pt-10 ">
                <div className="flex justify-between items-center mb-2 px-4">
                    <ArrowLeft
                        onClick={() => navigate(-1)}
                        className='cursor-pointer'
                    />

                    <h1 className="text-lg font-bold">{t("cycle:flow_care")}</h1>
                    <div></div>
                </div>

                <div className="border-t border-gray-300 dark:border-neutral-700"></div>

                <div className='flex flex-col gap-10 items-center justify-center mt-16'>
                    <img
                        className="bg-gray-200 dark:bg-neutral-800 md:w-24 w-24 p-2 md:p-5 rounded-full"
                        src="./WappGPT - logo.svg"
                        alt=""
                    />

                    <h1 className="font-bold text-center">{t("cycle:health_help")}</h1>

                    <div
                        className='h-12 rounded-xl w-11/12 bg-gray-200 outline-gray-100 px-3 justify-between flex
                        dark:bg-neutral-800 items-center'
                    >
                        <input
                            className='w-11/12 outline-0 placeholder:text-[12px] placeholder:font-bold'
                            name="" id=""
                            placeholder={t("placeholder:type_message")}
                        />

                        <div
                            className='bg-white dark:bg-neutral-800 rounded-full size-6 flex items-center justify-center'
                        >
                            <img
                                onClick={() => navigate('/ai-chat')}
                                className='size-4'
                                src="./send.svg"
                                alt="Send"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FlowCare