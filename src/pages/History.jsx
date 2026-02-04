import { ChevronRight, ChevronsDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HistoryFilter from '../components/HistoryFilter'
import axios from 'axios'

const History = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [periodHistories, setPeriodHistories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://her-cycle-bloom-backend.onrender.com/period/get-entry",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )

                const data = res.data.entries || []
                setPeriodHistories(data)
                console.log(res);

            } catch (err) {
                console.log('Error fetching data: ', err);
            }
        }
        fetchData()
    }, [token])
    //         < div className = "flex flex-col gap-1" >
    //         {
    //             formattedPeriod.length > 0 ? (
    //                 formattedPeriod.map((period, index) => (
    //                     <h2
    //                         key={index}
    //                         className='text-gray-400 dark:invert font-medium text-sm lg:text-base'
    //                     >
    //                         {period}
    //                     </h2>
    //                 ))
    //             ) : (
    //                 <h2 className='text-gray-400 dark:invert font-medium text-sm lg:text-base'>
    //                     No period data
    //                 </h2>
    //             )
    //         }
    // </div >


    return (

        <div className='bg-white dark:bg-neutral-900 transition-colors duration-200'>
            <div className="max-w-md mx-auto px-4">
                <div className="flex justify-between items-center pb-5 pt-10">
                    <img
                        className='cursor-pointer dark:invert'
                        onClick={() => navigate(-1)}
                        src="./Arrow Left.svg"
                        alt="arrow left"
                    />
                    <h1 className="text-lg font-bold">History</h1>

                    <HistoryFilter />

                </div>

                <h1 className="font-bold text-lg">Past Cycles</h1>

                <div className='mt-8 flex flex-col gap-3 pb-20'>
                    {
                        periodHistories.map((history) => (
                            <div
                                onClick={() => navigate('/cycle-details')}
                                className='flex justify-between items-center cursor-pointer'
                                key={history.id}
                                >
                                <div className='flex flex-col'>
                                    <p className="font-medium">January 2025</p>
                                    <small className="text-dimgray font-medium">January 3 - January 7</small>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className='flex items-center gap-2'>
                                        <small className='font-medium'>{history.flowIntensity}</small>
                                        <img src="./light-flow.svg" alt="droplet" />
                                    </div>
                                    <ChevronRight />
                                </div>
                            </div>
                        ))
                    }

                    <div className="border-b border-gray-200 dark:border-neutral-700"></div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default History