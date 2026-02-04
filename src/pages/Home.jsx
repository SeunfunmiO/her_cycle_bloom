
import axios from 'axios'
import { Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Bell, Calendar, Heart, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [nextPeriodDate, setNextPeriodDate] = useState('')
  const [currentDay, setCurrentDay] = useState(0)
  const [tapMore, setTapMore] = useState(false)
  const token = localStorage.getItem("token")


  const [formattedDate, setFormattedDate] = useState("")
  const [active, setActive] = useState("log");

  const menuItems = [
    { key: "log", label: "Log Entry", icon: <Plus size={20} />, path: "/record-data" },
    { key: "calendar", label: "View Calendar", icon: <Calendar size={20} />, path: "/view-calendar" },
    { key: "reminder", label: "Set Reminder", icon: <Bell size={20} />, path: "/set-reminder" },
    {
      key: "history", label: "View History", icon: <img className="size-5 dark:invert" src="./Vector - 2.svg" alt="History" />, path: "/history"
    }
  ];

  if (!token) {
    navigate('/create-account')
  }

  useEffect(() => {
    setInterval(() => {
      const date = new Date()
      let dateOption = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
      setFormattedDate(date.toLocaleDateString('en-US', dateOption))
    }, 1000)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Why are you still up ? 👀";

  };

  const [greeting, setGreeting] = useState(getGreeting)

  useEffect(() => {

    const interval = setInterval(() => {
      setGreeting(getGreeting)
    }, 60000)

    return clearInterval(interval)
  }, [])


  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await axios.get(`https://her-cycle-bloom-backend.onrender.com/user/get-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const data = response.data
  
        
        if (data?.user) {
          setName(data.user.name)

          const lastPeriod = data.user.lastPeriodDate
          const userCycleLength = data.user.cycleLength || 28



          if (lastPeriod) {
            // Calculate next period date
            const userLastPeriodDate = new Date(lastPeriod)
            const nextPeriod = new Date(lastPeriod)
            nextPeriod.setDate(nextPeriod.getDate() + userCycleLength)

            // Format date as "Month Day" (e.g., "August 15")
            const formattedDate = nextPeriod.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
            })
            setNextPeriodDate(formattedDate)

            // Calculate days until next period
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            nextPeriod.setHours(0, 0, 0, 0)

            // const daysRemaining = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24))
            // setDaysUntilPeriod(daysRemaining > 0 ? daysRemaining : 0)

            // Calculate current day of cycle
            userLastPeriodDate.setHours(0, 0, 0, 0)
            const daysSinceLastPeriod = Math.ceil((today - userLastPeriodDate) / (1000 * 60 * 60 * 24))
            setCurrentDay(daysSinceLastPeriod > 0 ? daysSinceLastPeriod : 1)
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    fetchUser()
  }, [token])


  return (
    <div
      className='pb-40 bg-white dark:bg-neutral-900 
      transition-colors duration-300'
    >
      <div className='max-w-md mx-auto pt-5 px-4 flex flex-col gap-5'>
        <div className="flex items-center justify-between">
          <div>
            <h2 className='font-bold text-xl text-neutral-900 dark:text-neutral-100'>{greeting}, {name || "User"}!</h2>
            <h3 className='font-semibold text-neutral-700 dark:text-neutral-400'>{formattedDate}</h3>
          </div>

          <img
            className='size-5 dark:invert'
            src="./Bell2.svg"
            alt="notification"
          />
        </div>

        <div
          className="border-2 mt-3 border-gray-200 dark:border-neutral-700 w-full h-60 rounded-lg flex flex-col justify-center 
          bg-white dark:bg-neutral-800 transition items-center"
        >
          <h2 className='font-semibold text-xl text-neutral-900 dark:text-neutral-100'>Cycle Overview</h2>

          <div className="grid grid-cols-1 gap-3 w-11/12 mt-8">
            <div className="bg-[#ffe8ef] dark:bg-[#42222a] h-12 rounded-xl flex items-center justify-between px-5">

              <div className="flex items-center gap-5">
                <img
                  className='dark:invert'
                  src="./Calendar12.svg"
                  alt="calendar"
                />
                <p className="text-neutral-800 dark:text-neutral-200 text-sm font-medium">Next Period</p>
              </div>

              <p className="font-bold text-sm  text-neutral-900 dark:text-neutral-100">
                {nextPeriodDate || "Period may start soon"}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-neutral-700 h-12 rounded-xl flex items-center justify-between px-5">

              <div className="flex items-center gap-5">
                <Heart className='text-[#7a757f] dark:text-neutral-300' />
                <p className="text-neutral-800 dark:text-neutral-200 text-sm font-medium">Current Cycle</p>
              </div>

              <p className="font-bold text-sm  text-neutral-900 dark:text-neutral-100">Day {currentDay}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {
            menuItems.map((item) => (
              <div
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  navigate(item.path)
                }}
                className={`h-20 rounded-lg flex items-center flex-col justify-center cursor-pointer
                   ${active === item.key ?
                    "bg-palevioletred text-white" :
                    "bg-neutral-300 text-black dark:bg-neutral-700 dark:text-neutral-200"}
          `}
              >
                {item.icon}
                <p className="font-semibold text-xs">{item.label}</p>
              </div>
            ))}
        </div>


        <div>
          <div className='flex items-center gap-2'>
            <img className='dark:invert' src="./idea.svg" alt="" />

            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Daily Insights Tips
            </h3>
          </div>
          <div className="flex flex-col gap-2 mt-2">

            <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-300">
              Staying hydrated can help you reduce period bloating and cramps.
            </p>

            {
              tapMore && (
                <p className='font-semibold text-sm text-neutral-800 dark:text-neutral-300'>
                  Light exercise can boost your energy during your luteal phase.
                </p>
              )
            }
          </div>

          <button
            onClick={() => {
              tapMore ? setTapMore(false) : setTapMore(true)
            }}
            className="text-[#945465] font-medium text-xs outline-0 dark:text-[#d8a8b5]">
            {tapMore ? "Show Less....." : "Tap to Learn More....."}
          </button>

        </div>

      </div>
      <Navbar />
    </div>
  )
}

export default Home