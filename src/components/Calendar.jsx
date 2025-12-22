
// import React, { useState } from "react";
// import { Calendar } from "./ui/calendar";




// const CalendarComponent = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());



//     return (
//         <div className="flex flex-col items-center mt-5">
//             <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={setSelectedDate}
//                 className="rounded-lg w-full max-w-md mx-auto"
//             />
//         </div>
//     )
// }

// export default CalendarComponent

import React, { useState } from "react";
import { Calendar } from "./ui/calendar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    const logPeriod = async () => {
        if (!selectedDate) {
            toast.error("Please select a start date");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                'https://her-cycle-bloom-backend.onrender.com/period/create-period-details',
                { periodStart: selectedDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Date saved successfully");

            navigate("/record-data");

        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-5">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg shadow w-full max-w-md mx-auto bg-white dark:bg-neutral-800 text-neutral-900
                outline-0 dark:text-neutral-100"
            />

            <button
                onClick={logPeriod}
                className="mt-5 bg-palevioletred text-neutral-900 dark:text-white px-6 py-2 rounded-lg"
            >
                Continue
            </button>
        </div>
    );
};

export default CalendarComponent;