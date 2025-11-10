import { ChevronRight, DownloadCloud, LogOut, LucideLockKeyhole } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ExportDataModal from '../components/ExportDataModal'
import ResetDataModal from '../components/ResetDataModal'

const Account = () => {
    const navigate = useNavigate()


    return (
        <div className='bg-[#f9f9f9] lg:h-screen flex flex-col gap-5'>
            <button className="bg-white flex w-full items-center pt-10 pb-5 mb-4 px-3">
                <img
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg" alt="arrow left" />
                <h1 className="font-bold text-xl md:text-2xl w-full text-center">
                    Account
                </h1>
            </button>

            <div className='px-3 pb-8'>
                <h1 className="font-bold text-palevioletred text-lg md:text-xl lg:text-2xl">Manage Data</h1>

                <div className="bg-white shadow my-3 h-40 rounded-xl px-3 flex flex-col justify-center gap-3">
                    <button
                        onClick={() => navigate('/import-file')}
                        className="flex items-center justify-between cursor-pointer">
                        <div className='flex items-center gap-5'>
                            <DownloadCloud className='text-darkslategray size-5 lg:size-6' />
                            <h3 className="text-[15px] md:text-base font-medium lg:text-lg">Import Data</h3>
                        </div>

                        <ChevronRight className="text-gray-300 w-5 md:w-6" />
                    </button>

                    <hr className='border-gray-200 border ml-10' />

                    <ExportDataModal />

                    <hr className='border-gray-200 border ml-10' />

                    <ResetDataModal />
                </div>
            </div>

            <div className='px-3 pb-8'>
                <h1 className="font-bold text-palevioletred text-lg md:text-xl lg:text-2xl">Manage Access</h1>

                <div className="bg-white shadow my-3 h-30 rounded-xl px-3 flex flex-col justify-center gap-3">
                    <button
                        className="flex items-center justify-between cursor-pointer">
                        <div className='flex items-center gap-5'>
                            <LucideLockKeyhole className='text-darkslategray size-5 lg:size-6' />
                            <h3 className="text-[15px] md:text-base font-medium lg:text-lg">Change Password</h3>
                        </div>

                        <ChevronRight className="text-gray-300 w-5 md:w-6" />
                    </button>

                    <hr className='border-gray-200 border ml-10' />

                    <button
                        className="flex items-center justify-between cursor-pointer">
                        <div className='flex items-center gap-5'>
                            <LogOut className='text-darkslategray size-5 lg:size-6' />
                            <h3 className="text-[15px] md:text-base font-medium lg:text-lg">Log Out</h3>
                        </div>

                        <ChevronRight className="text-gray-300 w-5 md:w-6" />
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Account