import { Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useTranslation } from 'react-i18next'


const SuccessPage = () => {
    const { t } = useTranslation("common")

    return (
        <div>
            <div className='bg-pink-100 dark:bg-neutral-900 h-screen flex flex-col items-center justify-center gap-3'>
                <div
                    className="text-white size-16 bg-palevioletred rounded-full flex justify-center items-center">
                    <Check size={16} />
                </div>
                <p className="text-semibold text-neutral-900 dark:text-neutral-100">{t("common:entry_success")}</p>

            </div>
            <Navbar />
        </div>
    )
}

export default SuccessPage