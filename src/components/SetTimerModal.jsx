import axios from "axios";
import { Clock } from "lucide-react";
import React, { useState } from "react";

const SetTimeModal = () => {
    const [time, setTime] = useState({
        hour: "10",
        minute: "00",
        second: "00",
        period: "PM",
    });
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (key, value) => {
        setTime((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                return;
            }

            await axios.put("https://her-cycle-bloom-backend.onrender.com/user/set-reminder", {
                reminderTime: true,
                reminderTypes: {
                    periodStartAlarm: true,
                    periodEndAlarm: true,
                    symptomsAlarm: true,
                    ovulationAlarm: true
                },
                reminderEnabled: true,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setOpenModal(false);
        } catch (error) {
            console.log("Error setting reminder : ", error);

        }
    };


    const hours = Array.from({ length: 12 }, (_, i) =>
        String(i + 1).padStart(2, "0")
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
    );
    const seconds = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
    );



    return (
        <div>
            <div className="flex justify-between items-center w-full">
                <h1
                    className="font-medium text-neutral-900 dark:text-neutral-100">
                    Set Time
                </h1>

                <button
                    className="text-gray-500 dark:text-neutral-500 flex items-center gap-2 outline-0 cursor-pointer"
                    onClick={() => setOpenModal(true)}
                >
                    <span>
                        {time.hour}:{time.minute} {time.period}
                    </span>
                    <Clock />
                </button>
            </div>

            {openModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm"
                    onClick={() => setOpenModal(false)}
                >
                    <div
                        className="bg-white dark:bg-neutral-800 w-[90%] max-w-sm rounded-2xl shadow-lg p-5 animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-center mb-4 text-gray-800 dark:text-neutral-100">
                            Set Time
                        </h2>

                        <hr className="border dark:border-neutral-700 border-gray-200 mb-4" />

                        <div className="flex justify-center items-center gap-3 my-6">
                            <div className="h-32 overflow-y-scroll snap-y snap-mandatory scrollbar-hide w-16 text-center">
                                {hours.map((hr) => (
                                    <div
                                        key={hr}
                                        onClick={() => handleChange("hour", hr)}
                                        className={`py-2 cursor-pointer snap-center text-lg font-semibold ${hr === time.hour
                                            ? "text-palevioletred"
                                            : "text-gray-600 dark:text-neutral-300"
                                            }`}
                                    >
                                        {hr}
                                    </div>
                                ))}
                            </div>

                            <span className="font-bold text-2xl text-neutral-900 dark:text-neutral-300">:</span>

                            <div className="h-32 overflow-y-scroll snap-y snap-mandatory scrollbar-hide w-16 text-center">
                                {minutes.map((min) => (
                                    <div
                                        key={min}
                                        onClick={() => handleChange("minute", min)}
                                        className={`py-2 cursor-pointer snap-center text-lg font-semibold ${min === time.minute
                                            ? "text-palevioletred"
                                            : "text-gray-600 dark:text-neutral-300"
                                            }`}
                                    >
                                        {min}
                                    </div>
                                ))}
                            </div>

                            <span className="font-bold text-2xl text-neutral-900 dark:text-neutral-300">:</span>

                            <div className="h-32 overflow-y-scroll snap-y snap-mandatory scrollbar-hide w-16 text-center">
                                {seconds.map((sec) => (
                                    <div
                                        key={sec}
                                        onClick={() => handleChange("second", sec)}
                                        className={`py-2 cursor-pointer snap-center text-lg font-semibold ${sec === time.second
                                            ? "text-palevioletred"
                                            : "text-gray-600 dark:text-neutral-300"
                                            }`}
                                    >
                                        {sec}
                                    </div>
                                ))}
                            </div>


                            <div className="h-32 overflow-y-scroll snap-y snap-mandatory scrollbar-hide w-16 text-center">
                                {["AM", "PM"].map((period) => (
                                    <div
                                        key={period}
                                        onClick={() => handleChange("period", period)}
                                        className={`py-2 cursor-pointer snap-center text-lg font-semibold ${period === time.period
                                            ? "text-palevioletred"
                                            : "text-gray-600 dark:text-neutral-300"
                                            }`}
                                    >
                                        {period}
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="flex justify-center items-center gap-3 mt-6">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="py-2 rounded-lg outline outline-pink-400 hover:bg-palevioletred hover:text-white text-palevioletred font-medium w-full text-sm lg:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="py-2 rounded-lg bg-palevioletred text-white hover:bg-pink-600 font-medium w-full text-sm lg:text-base"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SetTimeModal;