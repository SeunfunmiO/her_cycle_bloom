import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateProfile from './pages/CreateProfile'
import AllowNotification from './pages/AllowNotification'
import GetReady from './pages/GetReady'
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
import Languages from './pages/Languages'
import Theme from './pages/Theme'
import History from './pages/History'
import CycleDetails from './components/CycleDetails'
import ExportDataCycle from './pages/ExportDataCycle'
import FlowCare from './pages/FlowCare'
import AiChat from './pages/AiChat'
import ToastContainer from './toast/ToastContainer'
import SplashScreen from './components/SplashScreen'
import SetRemainder from './pages/SetRemainder'
import ForgotPassword from './pages/ForgotPassword'
import OtpPage from './pages/OtpPage'
import ResetPassword from './pages/ResetPassword'


const lightOnlyRoutes = [
  "/",
  '/onboarding',
  '/get-ready',
  '/allow-Notification',
  '/create-profile'
]

function useApplyTheme() {
  const location = useLocation()


  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme")

    if (lightOnlyRoutes.includes(location.pathname)) {
      html.classList.remove("dark");
      return;
    }
    if (savedTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

  }, [location.pathname]);

}
const App = () => {
  useApplyTheme();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={< SplashScreen />} />
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
        <Route path='/theme' element={<Theme />} />
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
        <Route path='/set-reminder' element={<SetRemainder />} />
        <Route path='/languages' element={<Languages />} />
        <Route path='/history' element={<History />} />
        <Route path='/cycle-details' element={<CycleDetails />} />
        <Route path='/export-data' element={<ExportDataCycle />} />
        <Route path='/flow-care' element={<FlowCare />} />
        <Route path='/ai-chat' element={<AiChat />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-otp' element={<OtpPage />} />
        <Route path='/reset-password' element={<ResetPassword />} />

      </Routes>
    </>
  )
}
// agree: yup
//   .boolean()
//   .oneOf([true], "You must accept the Terms & Conditions"),
export default App