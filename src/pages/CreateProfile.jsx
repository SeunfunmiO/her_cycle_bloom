import { useFormik } from 'formik'
import { Calendar, Camera } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Popover, PopoverPanel } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'

const CreateProfile = () => {
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const [cycleLength, setCycleLength] = useState('7')
    const [lastPeriodDate, setLastPeriodDate] = useState('14/07/2025')
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLoading(true)
            setTimeout(() => {
                setPreview(URL.createObjectURL(file))
                toast.success('Photo Added')
            }, 1500)
            setLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            console.log(values);
        },

        validationSchema: yup.object({
            name: yup.string().required('Name is required!')
        })
    })
    console.log(formik.values);



    return (
        <div className='px-4 md:px-auto h-full/' style={{ backgroundColor: 'var(--bgLavender)' }}>
            <h1 className='font-bold pt-5 text-2xl md:text-3xl'>Create profile</h1>
            <p className='text-lg md:text-xl mt-8'>Tell us a bit about yourself to personalize your cycle tracking</p>

            <form onSubmit={formik.handleSubmit} className='grid md:grid-cols-2 gap-5 md:items-center'>
                <div className='mt-8 flex items-end gap-5'>
                    {
                        preview ?
                            <img src={preview} alt='photo' style={{ backgroundColor: '#c7c3c3' }}
                                className='w-20 h-20 rounded-full flex justify-center object-cover'
                            /> : <div style={{ backgroundColor: '#c7c3c3' }} className='w-20 h-20 rounded-full flex justify-center items-center' >
                                <Camera size={28} color='#a49999' />
                            </div>
                    }
                    <label htmlFor="photo"
                        className='border cursor-pointer rounded-lg py-2 px-3 font-medium border-black '>
                        {loading ? 'Adding...' : ' Add Photo'}
                        <input type="file" name="picture" id="photo"
                            className='hidden'
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-base font-medium' htmlFor="name">Name</label>
                    <input className={`border border-black rounded-lg py-3 px-2 bg-transparent
                     ${formik.touched.name && formik.errors.name ? `border-red-600` : ''}`} type="text"
                        name="name" placeholder='eg. Sarah'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name ? <small className="text-red-600">{formik.errors.name}</small> : ''}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="birthYear" className="text-base font-medium">
                        Birth Year
                    </label>
                    <select
                        id="birthYear"
                        name="birthYear"
                        className="border font-semibold border-black rounded-lg py-2 px-3 bg-transparent w-28"
                    >
                        <option value="">2025</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="days">Cycle length (days) </label>
                    <div className="relative w-full flex flex-col items-center gap-4 pt-10">
                        <Popover className="w-full">
                            <div className="relative">
                                <PopoverPanel
                                    static
                                    className="absolute -top-12 left-0 transform transition-all duration-150 ease-out"
                                    style={{
                                        left: `calc(${cycleLength}% - 1rem)`,
                                    }}
                                >
                                    <div className="relative flex flex-col items-center">
                                        <p className="bg-gray-200 px-3 py-2 rounded-lg text-sm mt-1 font-medium">
                                            {cycleLength} days
                                        </p>
                                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                                    </div>
                                </PopoverPanel>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={cycleLength}
                                    onChange={(e) => setCycleLength(e.target.value)}
                                    style={{
                                        background: `linear-gradient(to right, #ec4899 ${cycleLength}%, #e5e7eb ${cycleLength}%)`,
                                    }}
                                    className="w-full h-2 bg-/gray-200 rounded-full
                        appearance-none outline-none bg-gray-200 slider-pink cursor-pointer accent-pink-600"
                                />
                            </div>

                        </Popover>

                    </div>


                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="days">Last Period Date</label>
                    <div className='bg-transparent py-2 px-3 w-fit border border-black rounded-lg flex items-center gap-3'>
                        <Calendar size={17} />
                        <input type="text" placeholder='14-07-2025' className='bg-transparent outline-none' />
                        {/* onChange={(e) => setLastPeriodDate(e.target.value)}
                            value={lastPeriodDate} className='bg-transparent outline-none ' */}
                    </div>
                </div>

            </form>
           <div className='pb-14 md:pb-auto'>
                <button
                onClick={()=>navigate('/allow-notification')}
                    style={{ backgroundColor: ' var(--bgPalevioletred)' }}
                    className='mt-24 md:mb-14 w-full md:w-1/2 py-2 shadow-lg font-bold text-xl md:text-2xl rounded-3xl flex justify-center items-center gap-3'>
                    Continue
                    <img src="./arrowRight.svg" alt="arrow" />
                </button>
           </div>
        </div>
    )
}

export default CreateProfile