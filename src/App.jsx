import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateProfile from './pages/CreateProfile'
import AllowNotification from './pages/AllowNotification'
import GetReady from './pages/GetReady'
import LandingPage from './pages/LandingPage'
import LogEntry1 from './pages/LogEntry1'
import CalendarComponent from './components/Calendar'
import LogEntry2 from './pages/LogEntry2'
import SuccessPage from './pages/SuccessPage'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/log-in' element={<Login />} />
        <Route path='/create-account' element={<Signup />} />
        <Route path='/create-profile' element={<CreateProfile />} />
        <Route path='/allow-Notification' element={<AllowNotification />} />
        <Route path='/get-ready' element={<GetReady />} />
        <Route path='/home' element={<Home />} />
        <Route path='/log-entry' element={<LogEntry1 />} />
        <Route path='/record-data' element={<LogEntry2 />} />
        <Route path='/success' element={<SuccessPage />} />

      </Routes>


    </>
  )
}

export default App