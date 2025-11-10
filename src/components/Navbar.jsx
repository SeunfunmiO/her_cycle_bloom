// import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    // const [activeTab, setActiveTab] = useState("overview")
    // const tabs = ["overview", "calendar", "history", "settings"]
    // {
    //     tabs.map((tab) => (
    //         <div>
    //             <button key={tab}
    //                 onClick={() => setActiveTab(tab)}
    //                 className={`flex flex-col items-center ${activeTab === tab ? "bg-[#876370] text-[#876370]" : ''}`}>
    //                 <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 0.svg" alt="Home" />
    //                 {tab}
    //                 {/* <p className="text-xs md:text-base font-bold">Overview</p> */}
    //             </button>


    return (
        <div className='bg-white fixed bottom-0 flex items-center w-full justify-between md:gap-10 p-5'>

            <button
                className={`flex flex-col items-center`}>
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 0.svg" alt="Home" />
                <p className="text-xs md:text-base font-bold">Overview</p>
            </button>

            <button
                onClick={() => navigate('/view-calendar')}
                className="flex flex-col items-center">
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 1.svg" alt="Calendar" />
                <p className="font-bold text-xs md:text-base">Calendar</p>
            </button>

            <img
                className="bg-gray-200 md:w-20 w-12 p-2 md:p-5 rounded-full shadow-lg absolute -top-8 border-8 border-white left-[45%] "
                src="./WappGPT - logo.svg" alt="" />

            <button
                className="flex flex-col items-center">
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 2.svg" alt="History" />
                <p className='font-bold text-xs md:text-base'>History</p>
            </button>

            <button
                onClick={() => navigate('/settings')}
                className="flex flex-col items-center">
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 3.svg" alt="Settings" />
                <p className="font-bold text-xs md:text-base">Settings</p>
            </button>
        </div>

    )
}

export default Navbar