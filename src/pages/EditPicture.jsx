import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const EditPicture = ({ photo, setPhoto }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState(photo || "");
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64 = reader.result;
            setProfilePicture(base64);

            try {
                setLoading(true);

                const res = await axios.put(
                    `https://hercyclebloom.vercel.app/user/create-profile`,
                    { profilePicture: base64 },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (res.status !== 200) {
                    toast.error("Failed to update picture");
                    return;
                }
                setPhoto(base64);
                toast.success("Picture updated successfully");

            } catch (error) {
                console.error(error);
                toast.error("Error saving picture");
            } finally {
                setLoading(false);
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className="bg-white dark:bg-neutral-800 flex w-full items-center pt-10 pb-5">
                <img
                    onClick={() => navigate(-1)}
                    className='dark:invert cursor-pointer'
                    src="./Arrow Left.svg"
                    alt="arrow left"
                />
                <h1 className="font-bold text-lg lg:text-xl w-full text-center text-neutral-900 dark:text-neutral-100">
                    Profile
                </h1>
            </div>

            <div className='flex justify-center mt-5 relative'>
                <div className="bg-[#febcb7] rounded-full flex justify-center items-center size-16 dark:bg-neutral-900">
                    <img
                        className='size-16 rounded-full object-cover'
                        src={photo || "/User Pic.png"}
                        alt="Profile"
                    />
                </div>

                <label
                    htmlFor='photo'
                    className='size-6 rounded-full bg-palevioletred items-center flex justify-center absolute top-12 cursor-pointer'
                >
                    {loading ? <BarLoader fill='palevioletred' height={4} width={40} /> : <img src="./edit-2.svg" alt="Edit" />}
                </label>

                <input
                    onChange={handleFileChange}
                    className='hidden'
                    accept='image/*'
                    id='photo'
                    type="file"
                />
            </div>
        </div>
    );
};

export default EditPicture;
