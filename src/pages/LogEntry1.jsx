import React from 'react'
import CalendarComponent from '../components/Calendar'

const LogEntry1 = () => {
    return (
        <div className='p-6 h-screen' style={{ backgroundColor: 'var(--bgLavender)' }}>
            <div className='flex items-center gap-5 mb-3'>
                <img src="./caret.svg" alt="" />
                <h2 className='font-medium text-lg'>Record Data</h2>
            </div>

            <div className='border-b-2' style={{ borderBottomColor: '#8e727b' }}></div>

            <h2 className='font-medium text-lg mt-5'>Select Date</h2>
            <CalendarComponent/>

        </div>
    )
}

export default LogEntry1