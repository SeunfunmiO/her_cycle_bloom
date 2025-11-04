import { Settings } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='m-5'>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center justify-center">
          <img src="Profile.svg" alt="profile" />
          <h2 className='font-bold text-xl'>Hi, Mary</h2>
        </div>
        <Settings size={28} />
      </div>

      <div className='my-3'>
        <h2 className='font-bold text-xl'>Your Cycle Overview</h2>
        <div className='rounded-3xl mt-2 flex md:gap-0 md:justify-between items-center max-w-full' style={{ backgroundColor: '#fccbd9' }}>
          <img className='w-40' src="./photo-curlyhair.png" alt="photo" />
          <div className='px-2 md:px-6'>
            <h2 className='font-bold md:text-xl'>Day 14 of 28</h2>
            <h2 className='font-bold  md:text-lg' style={{ color: '#514145' }}>Next period:</h2>
            <p className='font-bold text-xs md:text-base' style={{ color: '#7c646a' }}>August 15</p>
            <p className='font-bold text-xs md:text-base' style={{ color: '#8e727b' }}>14 days to go</p>
          </div>
        </div>
      </div>

      <div className='mt-3'>
        <h2 className='font-bold text-xl'>Quick Actions</h2>

        <div className='items-center justify-center gap-6 grid grid-cols-2 md:grid-cols-4 mt-3'>
          <button onClick={() => navigate('/log-entry')} className='px-5 py-2 rounded-2xl flex flex-col items-center justify-center/ shadow-lg border-2 ' type="button" style={{ backgroundColor: '#feebf1' }}>
            <img src="./LOG.svg" className='w-6 md:w-10' alt="log file" />
            <p className='font-medium text-sm md:text-sm'>Log Entry</p>
          </button>

          <button className='px-5 py-2 flex flex-col items-center justify-center/ rounded-2xl shadow-lg border-2' type="button" style={{ backgroundColor: '#feebf1' }}>
            <img src="./calender.svg" className='w-6 md:w-10' alt="log file" />
            <p className='font-medium text-sm md:text-sm'>View calender</p>
          </button>

          <button className='px-5 py-2 flex flex-col items-center justify-center/ rounded-2xl shadow-lg border-2' type="button" style={{ backgroundColor: '#feebf1' }}>
            <img src="./Alarm.svg" className='w-6 md:w-10' alt="log file" />
            <p className='font-medium text-sm md:text-sm'>Set Reminder</p>
          </button>

          <button className='px-5 py-2 flex flex-col items-center justify-center/ rounded-2xl shadow-lg border-2' type="button" style={{ backgroundColor: '#feebf1' }}>
            <img src="./Activity History.svg" className='w-6 md:w-10' alt="log file" />
            <p className='font-medium text-sm md:text-sm'>View History</p>
          </button>
        </div>
      </div>

      <div className="">
        <h2 className='font-bold text-xl text-center my-4'>Cycle Care Tip</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p className='rounded-2xl px-4 py-2 text-sm md:text-base' style={{ backgroundColor: '#feebf1' }}>
            Light exercise can boost your energy during your luteal phase.
          </p>
          <p className='rounded-2xl px-4 py-2 text-sm md:text-base' style={{ backgroundColor: '#feebf1' }}>
            Light exercise can boost your energy during your luteal phase.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home