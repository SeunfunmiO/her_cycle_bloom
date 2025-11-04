
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AllowNotification = () => {
    const navigate = useNavigate()
    return (
        <div className='h-screen px-5 md:px-auto' style={{ backgroundColor: 'var(--bgLavender)' }}>
            <div className='pt-12 flex justify-end'>
                <img src="./Bell.png" alt="bell" />
            </div>

            <div className="flex flex-col md:justify-center md:items-center">
                <div>
                    <h6 className="font-bold mt-8 text-center md:text-start text-2xl">Never miss a Reminder</h6>
                    <p className='mt-8'>Get timely alerts for your period, ovulation and health tips- only when it matters most.</p>
                </div>

                <div className='mt-10 flex flex-col gap-3'>
                    <button type='button'
                    onClick={()=>navigate('/get-ready')}
                        style={{ backgroundColor: ' var(--bgPalevioletred)' }}
                        className='w-full md:px-12 text-sm text-white py-2 shadow-lg font-bold rounded-3xl'>
                        Enable Notifications
                    </button>

                    <button type='button'
                        onClick={() => navigate('/home')}
                        style={{ backgroundColor: ' var(--bgPalevioletred)' }}
                        className='w-full text-white  text-sm py-2 shadow-lg font-bold rounded-3xl'>
                        Maybe Later
                    </button>
                </div>
            </div>


        </div>
    )
}

export default AllowNotification