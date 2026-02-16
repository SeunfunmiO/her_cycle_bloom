
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('common')

    return (
        <div
            className='flex flex-col justify-end items-center gap-6 h-screen pb-14 bg-white dark:bg-neutral-900'
        >
            <button
                onClick={() => navigate('/log-in')}
                className='w-9/12  md:w-5/12 py-2 shadow-xl font-bold lg:text-xl rounded-3xl text-neutral-900
                dark:text-neutral-100 bg-palevioletred outline-0'>
                {t("login")}
            </button>

            <button
                onClick={() => navigate('/create-account')}
                className='w-9/12  md:w-5/12 py-2  shadow-xl font-bold lg:text-xl rounded-3xl text-neutral-900
                dark:text-neutral-100 bg-palevioletred outline-0'>
                {t("sign_up")}
            </button>
        </div>
    )
}

export default Registration