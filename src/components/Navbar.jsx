

const Navbar = () => {
    return (
        <div className='bg-white fixed bottom-0 flex items-center w-full justify-between md:gap-10 p-5'>
            <div className="flex flex-col items-center">
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 0.svg" alt="Home" />
                <p className="text-sm md:text-base font-bold">Overview</p>
            </div>

            <div className="flex flex-col items-center">
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 1.svg" alt="Calendar" />
                <p className="font-bold text-sm md:text-base">Calendar</p>
            </div>

            <div className="">
                <img className="bg-gray-200 p-2 md:p-5 rounded-full shadow-lg absolute -top-8 border-8 border-white "
                    src="./WappGPT - logo.svg" alt="" />
            </div>

            <div className="flex flex-col items-center">
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 2.svg" alt="History" />
                <p className='font-bold text-sm md:text-base text-[#967682]'>History</p>
            </div>

            <div className="flex flex-col items-center">
                <img className='w-3 h-3 md:w-5 md:h-5' src="./Vector - 3.svg" alt="Settings" />
                <p className="font-bold text-sm md:text-base">Settings</p>
            </div>
        </div>
    )
}

export default Navbar