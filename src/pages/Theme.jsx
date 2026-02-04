import { Check } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Theme = () => {
    const navigate = useNavigate()
    const html = document.documentElement;

    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme')
        return savedTheme === "dark" ? true : false
    });

    const setTheme = (isDark)=>{

        if (isDark) {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark")
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000000');
            setDarkMode(true)
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light")
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
            setDarkMode(false)
        }

    }
    
    return (
        <div className='bg-[#f9f9f9] dark:bg-neutral-900 h-screen transition-colors duration-300'>

            <div className="max-w-md mx-auto">
                <div className="bg-white dark:bg-neutral-800 flex w-full items-center pt-10 pb-5 px-3">
                    <img
                        className='dark:invert'
                        onClick={() => navigate(-1)}
                        src="./Arrow Left.svg" alt="back" />
                    <h1 className="font-bold text-lg lg:text-xl text-center w-full">
                        Theme
                    </h1>
                </div>

                <div className="bg-white dark:bg-neutral-800 mt-8 mx-3 px-3 rounded-xl h-30 flex flex-col justify-center gap-3">
                    <button
                        onClick={() => setTheme(false)}
                        className="flex gap-3 items-center outline-0">
                        <img
                            className='size-4 lg:size-5 dark:invert'
                            src="./sun.svg" alt="Sun Icon" />
                        <h1 className="font-medium text-neutral-900 dark:text-neutral-100 ">Light Mode</h1>
                        {!darkMode && <Check size={18} className='ml-auto text-palevioletred' />}
                    </button>

                    <div className='border-b border-gray-200 dark:border-neutral-700 ml-8'></div>

                    <button
                        onClick={() => setTheme(true)}
                        className="flex gap-3 items-center outline-0">
                        <img
                            className='size-4 lg:size-5 dark:invert'
                            src="./moon.svg" alt="Moon Icon"
                        />
                        <h1 className="font-medium text-neutral-900 dark:text-neutral-100 ">Dark Mode</h1>
                        {darkMode && <Check size={18} className='ml-auto text-palevioletred' />}
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Theme