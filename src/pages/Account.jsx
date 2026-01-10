import { ChevronRight, DownloadCloud, LogOut, LucideLockKeyhole } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ExportDataModal from '../components/ExportDataModal'
import ResetDataModal from '../components/ResetDataModal'
import LogOutModal from '../components/LogOutModal'

const Account = () => {
    const navigate = useNavigate()


    return (
        <div className='bg-[#f9f9f9] dark:bg-neutral-900 h-screen transition-colors duration-200'>
            <div className="max-w-md mx-auto">
                <div className="bg-white dark:bg-neutral-800 flex w-full items-center pt-10 pb-5 px-3">
                    <img
                        className='cursor-pointer dark:invert'
                        onClick={() => navigate(-1)}
                        src="./Arrow Left.svg" alt="arrow left"
                    />
                    <h1 className="font-bold text-xl lg:text-2xl w-full text-center">
                        Account
                    </h1>
                </div>

                <div className='px-3 py-8'>
                    <h1 className="font-bold text-palevioletred text-lg  lg:text-xl">Manage Data</h1>

                    <div
                        className="bg-white dark:bg-neutral-800 shadow my-3 h-40 rounded-xl px-3 flex flex-col justify-center gap-3"
                    >
                        <button
                            onClick={() => navigate('/import-file')}
                            className="flex items-center justify-between cursor-pointer">
                            <div className='flex items-center gap-5'>
                                <DownloadCloud className='text-darkslategray dark:text-white size-5 lg:size-6' />
                                <h3 className="text-[15px] md:text-base font-medium lg:text-lg">Import Data</h3>
                            </div>

                            <ChevronRight className="text-gray-300 dark:text-white w-5 md:w-6" />
                        </button>

                        <div className='border-gray-200 dark:border-neutral-700 border-b ml-10'></div>

                        <ExportDataModal />

                        <div className='border-gray-200 dark:border-neutral-700 border-b ml-10'></div>

                        <ResetDataModal />
                    </div>
                </div>

                <div className='px-3 pt-8 mb-5'>
                    <h1 className="font-bold text-palevioletred text-lg md:text-xl lg:text-2xl">Manage Access</h1>

                    <div
                        className="bg-white dark:bg-neutral-800 shadow my-3 h-30 rounded-xl px-3 flex flex-col justify-center gap-3"
                    >
                        <button
                            onClick={() => navigate('/change-password')}
                            className="flex items-center justify-between cursor-pointer">
                            <div className='flex items-center gap-5'>
                                <LucideLockKeyhole
                                    className='text-darkslategray dark:text-white size-5 lg:size-6'
                                />
                                <h3 className="text-[15px] md:text-base font-medium lg:text-lg">Change Password</h3>
                            </div>

                            <ChevronRight className="text-gray-300 dark:text-white w-5 md:w-6" />
                        </button>

                        <div className='border-gray-200 dark:border-neutral-700 border-b ml-10'></div>

                        <LogOutModal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account