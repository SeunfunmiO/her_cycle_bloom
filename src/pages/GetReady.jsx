import React from 'react'
import { useNavigate } from 'react-router-dom'

const GetReady = () => {
    const navigate = useNavigate()
    return (
        <div style={{ backgroundColor: 'var(--bgLavender)' }}
            className='flex flex-col justify-center items-center'>
            <h6 className="font-bold py-12 text-2xl px-6 md:px-auto">You're Ready!</h6>
            <img src="./g763.png" alt="Calender" />

            <div className="pt-24 pb-10 mx-6 md:mx-auto">
                <button type='button'
                onClick={()=>navigate('/home')}
                    style={{ backgroundColor: ' var(--bgPalevioletred)' }}
                    className='w-full px-8 md:px-16 text-xl py-2 shadow-lg font-bold rounded-3xl'>
                    Go to Home Screen
                </button>
            </div>
        </div>
    )
}

export default GetReady