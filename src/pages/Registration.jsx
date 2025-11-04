
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col justify-end items-center gap-6 h-screen pb-14 reg'>
            <button
            onClick={()=>navigate('/log-in')}
                style={{ backgroundColor: "var(--bgPalevioletred)" }}
                className='px-32  py-2 shadow-xl font-bold text-xl rounded-3xl'><p>Login</p>
            </button>
            <button
            onClick={()=>navigate('/create-account')}
                style={{ backgroundColor: "var(--bgPalevioletred)" }}
                className='px-32 py-2 shadow-xl font-bold text-xl rounded-3xl'>Sign up
            </button>
        </div>
    )
}

export default Registration