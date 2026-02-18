import axios from 'axios';
import { Check, Loader, X } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditGmail = () => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate()

    const handleSave = async () => {
        if (!value.trim()) return;
        setLoading(true);
        setSaved(false);

        const res = await axios.put(`https://hercyclebloom.vercel.app/user/create-profile`, { email: value },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        if (!res.status) {
            toast.error('Failed to edit email')
        }
        toast.success('Email updated successfuly')

        setLoading(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 2000);
        navigate('/profile-settings')

    };

    const handleClear = () => setValue("");

    return (
        <div className="bg-white dark:bg-neutral-900 transition-colors duration-300 h-screen">
            <div className="max-w-md mx-auto pt-10 px-4">
                <div className="flex justify-between items-center mb-5">
                    <img
                        onClick={() => navigate(-1)}
                        className='dark:invert'
                        src="./Arrow Left.svg" alt="arrow left" />
                    <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        Email
                    </h1>
                    <button
                        onClick={handleSave}
                        className={`font-bold ${loading ? "text-pink-300" : "text-palevioletred"
                            }`}
                        disabled={loading}
                    >
                        Save
                    </button>
                </div>

                <div className="border-b border-gray-200 dark:border-neutral-100"></div>

                <div className="relative border border-pink-300 rounded-2xl mt-5 py-3 px-3">
                    <input
                        type="email"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full outline-none text-gray-800 dark:text-neutral-100 text-base"
                        maxLength={30}
                        autoFocus
                    />

                    <div className="absolute right-0 top-0 h-full flex items-center pr-2">
                        {loading ? (
                            <Loader className="w-4 h-4 text-gray-500 animate-spin" />
                        ) : saved ? (
                            <Check className="w-4 h-4 text-green-500 border rounded-full" />
                        ) : value ? (
                            <X
                                className="w-4 h-4 text-gray-400 dark:text-neutral-100 dark:border-white  cursor-pointer
                                         border rounded-full"
                                onClick={handleClear}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditGmail