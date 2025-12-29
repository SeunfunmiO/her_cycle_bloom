import { useState } from "react"
import { useNavigate } from "react-router-dom"


const tabs = [
    { id: 1, label: "Overview", icon: "./Vector - 0.svg", path: '/home' },
    { id: 2, label: "Calendar", icon: "./Vector - 1.svg", path: '/view-calendar' },
    { id: 3, label: "History", icon: "./Vector - 2.svg", path: '/history' },
    { id: 4, label: "Settings", icon: "./Vector - 3.svg", path: "/settings" }
]

const Navbar = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("")


    return (
        <div className='bg-white dark:bg-neutral-900 fixed bottom-0 flex items-center w-full justify-between
         lg:gap-10 p-5 border-t border-gray-200 dark:border-neutral-700'>

            {
                tabs.slice(0, 2).map((tab) => (
                    <button key={tab.id}
                        onClick={() => {
                            navigate(tab.path)
                            setActiveTab(tab);
                        }}
                        className={`flex flex-col items-center outline-0`}>
                        <img
                            className='size-3 lg:size-5 dark:invert'
                            src={tab.icon}
                            alt={tab.label} />
                        <p
                            className={`text-xs lg:text-base font-bold 
                            ${activeTab === tab ? "text-dimgray" : "text-neutral-900 dark:text-neutral-100"}`}>
                            {tab.label}
                        </p>
                    </button>
                ))
            }

            <img
                onClick={() => navigate('/flow-care')}
                className="bg-gray-200 dark:bg-neutral-800 lg:w-18 w-12 p-2 rounded-full shadow-lg absolute
                 -top-8 border-8 cursor-pointer border-white dark:border-neutral-700 left-[45%]"
                src="./WappGPT - logo.svg" alt=""
            />


            {
                tabs.slice(2, 4).map((tab) => (
                    <button key={tab.id}
                        onClick={() => {
                            navigate(tab.path)
                            setActiveTab(tab);
                        }}
                        className={`flex flex-col items-center outline-0`}>
                        <img
                            className='size-3 lg:size-5 dark:invert'
                            src={tab.icon}
                            alt={tab.label} />
                        <p
                            className={`text-xs lg:text-base font-bold 
                            ${activeTab === tab ? "text-dimgray" : "text-neutral-900 dark:text-neutral-100"}`}>
                            {tab.label}
                        </p>
                    </button>
                ))
            }
        </div>

    )
}

export default Navbar