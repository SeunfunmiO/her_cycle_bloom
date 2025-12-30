import { useFormik } from 'formik';
import { Camera, InfoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Popover, PopoverPanel } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DateofBirth from '../components/DateofBirth';


const CreateProfile = () => {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setLoading(true);
        const reader = new FileReader()
        reader.onloadend = () => {
            const photoBase64 = reader.result
            setPreview(photoBase64);
            formik.setFieldValue('profilePicture', photoBase64);
            toast.success("Photo Added");
            setLoading(false);
        }

        reader.onerror = () => {
            toast.error("Failed to read file");
            setLoading(false);
        };

        reader.readAsDataURL(file)
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            dateOfBirth: "",
            cycleLength: 28,
            lastPeriodDate: "",
            profilePicture: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required!"),
            dateOfBirth: yup.string().required("Birth year is required!"),
            cycleLength: yup.number().required("Cycle length is required!"),
            lastPeriodDate: yup.string().required("Last period date is required!")
        }),
        onSubmit: async (values) => {
            try {
                const payload = {
                    name: values.name,
                    dateOfBirth: values.dateOfBirth,
                    cycleLength: values.cycleLength,
                    lastPeriodDate: values.lastPeriodDate
                }
                const response = await axios.put(
                    `https://her-cycle-bloom-backend.onrender.com/user/create-profile`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                const data = response.data.user
                console.log(data)

                if (data.success) {
                    toast.success(data.message || "Profile saved!");
                    navigate("/allow-notification");
                } else {
                    toast.error("Something went wrong, please try again")
                }
            } catch (error) {
                console.error("Profile update error:", error);
                toast.error(error.response?.data?.message || "Failed to save profile");
            }
        },
    });


    return (
        <div className="bg-lavender min-h-screen">
            <div className="max-w-md mx-auto px-4">
                <h1 className="font-bold pt-5 text-xl lg:text-2xl">Create profile</h1>
                <p className="lg:text-lg mt-5 font-medium">
                    Tell us a bit about yourself to personalize your cycle tracking
                </p>

                <form onSubmit={formik.handleSubmit} className="grid gap-5 mt-8">

                    <div className="flex items-end gap-5">
                        {preview ? (
                            <img
                                src={preview}
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover bg-[#c7c3c3]"
                            />
                        ) : (
                            <div
                                className="w-20 h-20 rounded-full flex justify-center items-center bg-[#c7c3c3]"
                            >
                                <Camera size={28} color="#a49999" />
                            </div>
                        )}

                        <label
                            htmlFor="photo"
                            className={`border text-sm cursor-pointer rounded-lg py-1.5 px-3 font-medium border-black 
                            ${loading && 'text-zinc-400 cursor-not-allowed'}`}
                        >
                            {loading ? "Adding..." : "Add Photo"}
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={loading}
                            />
                        </label>
                    </div>
                    <small
                        className="text-neutral-700 flex items-center font-bold gap-2 text-[10px]"
                    >
                        <InfoIcon size={15} />
                        Image shouldn't be larger than 5mb
                    </small>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="e.g. Sarah"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`border border-black rounded-lg py-3 px-2 bg-transparent placeholder:font-medium outline-0
                                 ${formik.touched.name && formik.errors.name
                                    ? "border-red-600"
                                    : ""
                                }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <small className="text-red-600">{formik.errors.name}</small>
                        )}
                    </div>

                    <DateofBirth
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />


                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Cycle length (days)</label>

                        <div className="relative w-full flex flex-col items-center gap-4 pt-8">
                            <Popover className="w-full">
                                <div className="relative">
                                    <PopoverPanel
                                        static
                                        className="absolute -top-8 left-0 transform transition-all duration-150 ease-out"
                                        style={{
                                            left: `calc(${(formik.values.cycleLength / 45) * 100}% - 1rem)`,
                                        }}
                                    >
                                        <div className="relative flex flex-col items-center">
                                            <p className="bg-gray-200 mx-2 px-3 py-1 rounded-lg text-sm mt-1 font-medium">
                                                {formik.values.cycleLength}
                                            </p>
                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200">
                                            </div>
                                        </div>
                                    </PopoverPanel>

                                    <input
                                        type="range"
                                        name="cycleLength"
                                        min="21"
                                        max="45"
                                        value={formik.values.cycleLength}
                                        onChange={formik.handleChange}
                                        style={{
                                            background: `linear-gradient(to right, #ec4899 ${((formik.values.cycleLength - 21) / 24) * 100}%, #e5e7eb ${((formik.values.cycleLength - 21) / 24) * 100}%)`,
                                        }}
                                        className="w-full h-2 rounded-full appearance-none outline-none bg-gray-200 slider-pink 
                                        cursor-pointer accent-pink-600"
                                    />
                                </div>
                            </Popover>
                        </div>
                        {formik.touched.cycleLength && formik.errors.cycleLength && (
                            <small className="text-red-600">{formik.errors.cycleLength}</small>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Last Period Date</label>
                        <div className="bg-transparent py-2 px-3 w-fit border border-black rounded-lg flex items-center gap-3">
                            <input
                                type="date"
                                name="lastPeriodDate"
                                value={formik.values.lastPeriodDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                max={new Date().toISOString().split('T')[0]}
                                className="bg-transparent outline-none"
                            />
                        </div>
                        {formik.touched.lastPeriodDate && formik.errors.lastPeriodDate && (
                            <small className="text-red-600">{formik.errors.lastPeriodDate}</small>
                        )}
                    </div>

                    <button
                        type='submit'
                        disabled={formik.isSubmitting}
                        className='mt-20 mb-14 w-full py-2 shadow-lg font-bold text-lg lg:text-xl rounded-full
                        flex justify-center items-center gap-3 bg-palevioletred disabled:opacity-50'>
                        {formik.isSubmitting ? 'Saving...' : 'Continue'}
                        <img className='size-5' src="./arrowRight.svg" alt="arrow" />
                    </button>
                </form >
            </div >
        </div >
    );
};

export default CreateProfile;