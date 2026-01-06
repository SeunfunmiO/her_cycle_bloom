import { ChevronRight, LucideRefreshCcw } from 'lucide-react'
import React, { useState } from 'react'
// import LabelProps from '../components/LabelProps.jsx'

const ResetDataModal = () => {
    const [openResetModal, setOpenResetModal] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)


    return (
        <div>
            <button
                onClick={() => setOpenResetModal(true)}
                className="flex items-center justify-between cursor-pointer w-full">
                <div className='flex items-center gap-5'>
                    <LucideRefreshCcw className='text-darkslategray dark:text-white size-5 lg:size-6' />
                    <h3 className="text-[15px] md:text-base font-medium lg:text-lg">Reset Data</h3>
                </div>

                <ChevronRight className="text-gray-300 dark:text-white w-5 md:w-6" />
            </button>


            {openResetModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setOpenResetModal(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-11/12 max-w-md p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-gray-800 dark:text-neutral-100 text-center mb-4">
                            Reset Data

                        </h2>
                        <div className='border-gray-200 dark:border-neutral-700 border-b ml-10'></div>

                        <p className="text-gray-800 my-5 dark:text-neutral-200 text-center text-sm lg:text-base">
                            Are you sure you want to reset data ? If you click proceed , all your data will be deleted permanently.
                        </p>

                        <div className='flex justify-center items-center my-5'>
                            <img className='dark:invert' src="./Group 828.png" alt="Image" />
                        </div>

                        <div className="flex justify-center items-center gap-3 mt-6">
                            <button
                                onClick={() => setOpenResetModal(false)}
                                className="py-2 rounded-lg outline outline-pink-400 hover:bg-palevioletred hover:text-white
                                     text-palevioletred font-medium w-full text-sm lg:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setOpenResetModal(false)
                                    setIsConfirmed(true);
                                }}
                                className="py-2 rounded-lg bg-palevioletred text-white hover:bg-pink-600 font-medium w-full text-sm 
                                lg:text-base"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmed && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setOpenResetModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Confirm Data Reset</h2>
                        <hr className='border border-gray-200' />
                        <p className="text-gray-800 my-5 text-center text-sm lg:text-base">
                            Please enter your account password to proceed with data reset.
                        </p>

                        {/* <LabelProps title={"Account Password"} /> */}
                        <div className="border rounded-2xl border-pink-200 relative flex justify-center gap-2 flex-col h-12 px-2">
                            <input
                                className='outline-none peer px-2'
                                type="password"
                                name='password'
                            />
                            <label
                                className='text-pink-200 text-sm absolute bg-white peer-focus:-top-5 peer-focus:text-sm transition-all
                                 pointer-events-none left-2 p-2 lg:text-base'
                                htmlFor="account-password">
                                Account Password
                            </label>
                        </div>
                        <div className="flex justify-center items-center gap-3 mt-6">
                            <button
                                onClick={() => setIsConfirmed(false)}
                                className="py-2 rounded-lg outline outline-pink-400 hover:bg-palevioletred hover:text-white
                                     text-palevioletred font-medium w-full text-sm lg:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsConfirmed(true);
                                }}
                                className="py-2 rounded-lg bg-palevioletred text-white hover:bg-pink-600 font-medium w-full text-sm 
                                lg:text-base"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResetDataModal