import React from 'react'
import { useNavigate } from 'react-router-dom'
import LabelProps from '../components/LabelProps'

const ChangePassword = () => {
    const navigate = useNavigate()

    return (
        <div className='max-w-md mx-auto mt-10 px-4'>
            <div className="flex w-full items-center pb-5 mb-4 px-3">
                <img
                    className='cursor-pointer'
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg" alt="arrow left"
                />
                <h1 className="font-bold text-lg md:text-xl w-full text-center">
                    Change Password
                </h1>
            </div>

            <hr className="border border-gray-100" />

            <div className="flex flex-col gap-10 mt-8">
                <LabelProps title={"Old Password"} />
                <LabelProps title={"New Password"} />
                <LabelProps title={"Confirm New Password"} />
            </div>

            <button className="bg-palevioletred w-full py-3 rounded-xl text-white mt-10">Save Changes</button>
        </div>
    )
}

export default ChangePassword