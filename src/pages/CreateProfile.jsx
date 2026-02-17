import { useFormik } from 'formik';
import { Camera, InfoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Popover, PopoverPanel } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DateofBirth from '../components/DateofBirth';
import { useTranslation } from 'react-i18next';


const CreateProfile = () => {
    const [preview, setPreview] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation([
        "common",
        "toast",
        "placeholder"
    ])

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error(t("toast:image_info"));
            return;
        }


        setLoading(true);
        const reader = new FileReader()
        reader.onloadend = () => {
            const photoBase64 = reader.result
            setPreview(photoBase64);
            setProfilePicture(photoBase64)
            formik.setFieldValue('profilePicture', photoBase64);
            setLoading(false);
        }

        reader.onerror = () => {
            toast.error(t("toast:failed_file"));
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
            profilePicture: "",
        },
        validationSchema: yup.object({
            name: yup.string().required(t("toast:name_required")),
            dateOfBirth: yup.string().required(t("toast:birth_year_required")),
            cycleLength: yup.number().required(t("toast:cycle_required")),
            lastPeriodDate: yup.string().required(t("toast:last_period_required")),
            profilePicture: yup.string().notRequired()
        }),
        onSubmit: async (values) => {
            try {
                const payload = {
                    name: values.name,
                    dateOfBirth: values.dateOfBirth,
                    cycleLength: values.cycleLength,
                    lastPeriodDate: values.lastPeriodDate,
                    profilePicture: profilePicture
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
                const data = response.data


                if (data.success) {
                    toast.success(t("toast:profile_created"));
                    navigate("/allow-notification");
                } else {
                    toast.error(t("toast:profile_failed"))
                }
            } catch (error) {
                console.error("Profile update error:", error);
                toast.error(t("toast:profile_filed"));
            }
        },
    });


    return (
        <div className="bg-lavender min-h-screen">
            <div className="max-w-md mx-auto px-4">
                <h1 className="font-bold pt-5 text-xl lg:text-2xl">{t("common:create_profile")}</h1>
                <p className="lg:text-lg mt-5 font-medium">
                    {t("common:profile_info")}
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
                            {loading ? t("common:adding") : t("common:add_photo")}
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
                        {t("toast:image_info")}
                    </small>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium">{t("common:name")}</label>
                        <input
                            name="name"
                            type="text"
                            placeholder={t("placeholder:name_placeholder")}
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
                        name='dateOfBirth'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />


                    <div className="flex flex-col gap-2">
                        <label className="font-medium">{t("common:cycle_length")}</label>

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
                        <label className="font-medium">{t("common:last_period")}</label>
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
                        {formik.isSubmitting ? t("common:saving") : t("common:continue")}
                        <img className='size-5' src="./arrowRight.svg" alt="arrow" />
                    </button>
                </form >
            </div >
        </div >
    );
};

export default CreateProfile;