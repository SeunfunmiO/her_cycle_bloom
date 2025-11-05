
import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className="" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px"
        }}
        >
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="custom-calendar shadow-lg rounded-lg outline-none"
            />
        </div>
    )
}

export default CalendarComponent