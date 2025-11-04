import { Check } from 'lucide-react'
import Navbar from '../components/Navbar'


const SuccessPage = () => {
    return (
        <div>
            <div className='bg-pink-100 h-screen flex flex-col items-center justify-center gap-3'>
                <div style={{ backgroundColor: '#e365c1' }} className="text-white w-16 h-16 rounded-full flex justify-center items-center">
                    <Check size={16} />
                </div>
                <p className="text-semibold">Your entry has been saved successfully</p>

            </div>
            <Navbar />
        </div>
    )
}

export default SuccessPage