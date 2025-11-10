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
import LogEntry2 from './pages/LogEntry2'
import SuccessPage from './pages/SuccessPage'
import ViewCalendar from './pages/ViewCalendar'
import Settings from './pages/Settings'
import SettingsProfile from './pages/SettingsProfile'
import EditName from './pages/EditName'
import EditGmail from './pages/EditGmail'
import CountryStateSelect from './pages/EditAddress'
import CycleInformation from './pages/CycleInformation'
import EditPeriodDuration from './pages/EditPeriodDuration'
import Account from './pages/Account'
import ImportFile from './pages/ImportFile'
import ChangePassword from './pages/ChangePassword'


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
        <Route path='/view-calendar' element={<ViewCalendar />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile-settings' element={<SettingsProfile />} />
        <Route path='/edit-name' element={<EditName />} />
        <Route path='/edit-gmail' element={<EditGmail />} />
        <Route path='/edit-address' element={<CountryStateSelect />} />
        <Route path='/cycle-information' element={<CycleInformation />} />
        <Route path='/period-duration' element={<EditPeriodDuration />} />
        <Route path='/account' element={<Account />} />
        <Route path='/import-file' element={<ImportFile />} />
        <Route path='/change-password' element={<ChangePassword />} />

       








      </Routes>


    </>
  )
}

export default App