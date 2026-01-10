import { ChevronRight, LogOut } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogOutModal = () => {
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpenLogoutModal(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleLogOut = () => {
        try {
            localStorage.removeItem("token");
            setOpenLogoutModal(false);
            toast.success("You have successfully logged out");
            navigate('/log-in');
        } catch (error) {
            console.log("Error logging out:", error);
            toast.error("Something went wrong while logging out");
        }
    };

    return (
        <div>
            <button
                onClick={() => setOpenLogoutModal(true)}
                className="flex items-center justify-between cursor-pointer w-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg"
            >
                <div className="flex items-center gap-3">
                    <LogOut className="text-darkslategray dark:text-white" size={24} />
                    <h3 className="text-sm md:text-base font-medium lg:text-lg">Log Out</h3>
                </div>
                <ChevronRight className="text-gray-300 dark:text-white" size={24} />
            </button>

            {openLogoutModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setOpenLogoutModal(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-gray-800 dark:text-neutral-100 text-center mb-3">
                            Logout
                        </h2>
                        <hr className='border border-gray-200 dark:border-neutral-600 mb-4' />
                        <p className="text-gray-800 dark:text-neutral-200 text-center text-sm lg:text-base mb-6">
                            Are you sure you want to logout? You will need to enter your credentials to access your account again.
                        </p>

                        <div className='flex justify-center items-center mb-6'>
                            <img className='dark:invert' src="/Logout.png" alt="Logout illustration" />
                        </div>

                        <div className="flex justify-center items-center gap-3">
                            <button
                                onClick={() => setOpenLogoutModal(false)}
                                className="py-2 rounded-lg outline outline-pink-400 hover:bg-palevioletred hover:text-white text-palevioletred font-medium w-full text-sm lg:text-base transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogOut}
                                className="py-2 rounded-lg bg-palevioletred text-white hover:bg-pink-600 font-medium w-full text-sm lg:text-base transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogOutModal;
