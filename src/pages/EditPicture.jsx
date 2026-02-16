import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const EditPicture = ({ photo }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState(photo || "");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB");
            return;
        }

        setLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicture(reader.result);
            setLoading(false);
        };
        reader.onerror = () => {
            toast.error("Failed to read file");
            setLoading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!profilePicture) {
            toast.error("No picture to save");
            return;
        }

        try {
            const res = await axios.put(
                'https://her-cycle-bloom-backend.onrender.com/user/create-profile',
                { profilePicture },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (res.status !== 200) {
                toast.error('Failed to edit picture');
                return;
            }

            toast.success('Picture updated successfully');
        } catch (error) {
            console.error('Error saving picture:', error);
            toast.error('Something went wrong while updating picture');
        }
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
                        className='size-16 rounded-full w-fit'
                        src={profilePicture || "User Pic.png"}
                        alt="Profile Picture"
                    />
                </div>

                <label
                    htmlFor='photo'
                    className='size-6 rounded-full bg-palevioletred items-center flex justify-center absolute top-12 cursor-pointer'>
                    {
                        loading ? <BarLoader size={10} /> : <img src="./edit-2.svg" alt="Edit" />
                    }

                </label>

                <input
                    onChange={handleFileChange}
                    onBlur={handleSave} // optional: you can trigger save after selection
                    className='hidden'
                    accept='image/*'
                    name='photo'
                    id='photo'
                    type="file"
                />
            </div>
        </div>
    );
};

export default EditPicture;
