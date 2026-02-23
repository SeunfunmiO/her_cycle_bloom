
import { useNavigate } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'
import { useTranslation } from 'react-i18next'

const Languages = () => {
    const navigate = useNavigate()
    const { t } = useTranslation("common")

    return (
        <div className='bg-[#f9f9f9] dark:bg-neutral-900 transition-colors duration-200 h-screen'>

            <div className="max-w-md mx-auto">
                <div className="bg-white dark:bg-neutral-800 flex w-full items-center pt-10 pb-5 px-3">
                    <img
                        onClick={() => navigate(-1)}
                        className='dark:invert'
                        src="./Arrow Left.svg"
                        alt="arrow left"
                    />
                    <h1 className="font-bold text-xl md:text-2xl w-full flex justify-center">
                        {t("common:languages")}
                    </h1>
                </div>

                <LanguageSelector />
            </div>

        </div>
    )
}

export default Languages