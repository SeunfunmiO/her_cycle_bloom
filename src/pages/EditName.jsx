
import { useState } from "react";
import { X, Check, Loader } from "lucide-react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditName() {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate()

    const handleSave = async () => {
        if (!value.trim()) return;
        setLoading(true);
        setSaved(false);

        const res = await axios.put('https://her-cycle-bloom-backend.onrender.com/user/create-profile', { name: value },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if(!res.status){
            toast.error('Failed to edit name')
        }
        
        toast.success('Name updated successfuly')

        setLoading(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 2000);
        redirect('/profile-settings')
    };

    const handleClear = () => setValue("");

    return (
        <div className=" bg-white h-screen dark:bg-neutral-900 transition-colors duration-300">
            <div className="max-w-md mx-auto pt-10 px-4 ">
                <div className="flex justify-between items-center mb-5">
                    <img
                        onClick={() => navigate(-1)}
                        className="dark:invert"
                        src="./Arrow Left.svg" alt="back" />
                    <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 ">Name</h1>
                    <button
                        onClick={handleSave}
                        className={`font-bold outline-0 ${loading ? "text-pink-300" : "text-palevioletred"
                            }`}
                        disabled={loading}
                    >
                        Save
                    </button>
                </div>

                <div className="border-b border-gray-200 dark:border-neutral-100"></div>

                <div className="relative border border-pink-300 rounded-2xl mt-5 py-3 px-3">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full outline-none text-gray-800 dark:text-neutral-100 text-base"
                        maxLength={30}
                        autoFocus
                    />

                    <div className="absolute right-0 top-0 h-full flex items-center pr-2">
                        {loading ? (
                            <Loader className="w-4 h-4 text-gray-500 animate-spin" />
                        ) : saved ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : value ? (
                            <X
                                className="w-4 h-4 text-gray-400 dark:text-neutral-100 dark:border-white cursor-pointer border 
                                rounded-full"
                                onClick={handleClear}
                            />
                        ) : null}
                    </div>
                </div>

                <div className="text-left text-[12px] md:text-sm text-gray-400 dark:invert mt-1">
                    {value.length}/30 characters
                </div>
            </div>

        </div>
    );
}