import { ArrowLeft, Dot } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const AiChat = () => {
    const navigate = useNavigate()
    const{t}=useTranslation("cycle")

    return (
        <div
         className="bg-white dark:bg-neutral-900 transition-colors duration-200 lg:h-screen
        ">
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


                <div
                    className="bg-gray-100 dark:bg-neutral-800 h-18 w-1/2 rounded-xl mt-10 p-3 mx-3"
                >
                    Hi, How is my health status this month?
                </div>
                <div
                    className="bg-gray-100 dark:bg-neutral-800 h-10 rounded-xl mt-10 w-1/2 float-end mx-3"
                >
                    <p
                        className=' text-blue-600 text-center flex justify-center items-center'
                    >
                        <Dot /> <Dot /> <Dot />
                    </p>
                </div>



                <div className='flex h-100 justify-end items-end'>
                    <div className="border-b border-blue-300 mb-3"></div>
                    {/* <div className='h-12 rounded-xl w-11/12 bg-gray-200 outline-gray-100 px-3 justify-between flex items-center'>
                    <input
                        className='w-11/12 outline-0 placeholder:text-[12px] placeholder:font-bold'
                        name="" id=""
                        placeholder='Type your message here...'
                    />

                    <div className='bg-white rounded-full size-6 flex items-center justify-center'>
                        <img onClick={() => navigate('/ai-chat')} className='size-4' src="./send.svg" alt="Send" />
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default AiChat