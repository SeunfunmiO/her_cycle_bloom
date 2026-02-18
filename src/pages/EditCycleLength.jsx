import axios from 'axios';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditCycleLength = () => {


    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [cycleLength, setCycleLength] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCycleLength = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.APP_URL}/user/user-profile`                );
                const initialLength = response.data.user.cycleLength || 0;
                setValue(initialLength);
                setCycleLength(initialLength);
            } catch (error) {
                console.error("Failed to fetch cycle length:", error);
            }
        };
        fetchCycleLength();
    }, []);

    const handleSave = async () => {
        if (value <= 0) return;

        setLoading(true);
        setSaved(false);

        try {
            const response = await axios.put(
                `${import.meta.env.APP_URL}/user/create-profile`,
                { cycleLength: value }
            );

            const savedLength = response.data.user.cycleLength;
            setCycleLength(savedLength);
            setValue(savedLength); 
            setSaved(true);

            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error("Failed to save cycle length:", error);
        } finally {
            setLoading(false);
        }
    };

    const increment = () => setValue((prev) => prev + 1);
    const decrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));

    return (
        <div className="bg-white dark:bg-neutral-900 h-screen">
            <div className="max-w-md mx-auto pt-10 px-4">
                <div className="flex justify-between items-center mb-5">
                    <img
                        onClick={() => navigate(-1)}
                        src="./Arrow Left.svg"
                        alt="arrow left"
                        className="cursor-pointer dark:invert"
                    />
                    <h1 className="text-lg font-bold">Cycle Length</h1>
                    <button
                        onClick={handleSave}
                        className={`font-bold ${saved ? "text-pink-300" : "text-palevioletred"}`}
                        disabled={saved || loading}
                    >
                        {loading ? "Saving..." : saved ? "Saved" : "Save"}
                    </button>
                </div>
                <hr className="border-gray-200" />

                <div className="flex justify-between items-center border border-pink-300 rounded-2xl mt-5 p-3">
                    <h6 className="font-medium text-lg">{value}</h6>

                    <div className="border py-1 px-6 gap-2 flex items-center rounded-lg border-pink-500 text-palevioletred">
                        <span className="cursor-pointer" onClick={decrement}>
                            <Minus size={18} />
                        </span>
                        <span className="border-l h-3 border-pink-400 mx-2"></span>
                        <span className="cursor-pointer" onClick={increment}>
                            <Plus size={18} />
                        </span>
                    </div>
                </div>

                <div className="text-left text-[12px] md:text-sm dark:invert text-gray-400 mt-1">
                    Days
                </div>
            </div >
        </div>
    );
};


export default EditCycleLength