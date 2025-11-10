// import { Minus, Plus } from 'lucide-react';
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// const EditPeriodDuration = () => {
//     const [value, setValue] = useState("0");
//     const [loading, setLoading] = useState(false);
//     const [saved, setSaved] = useState(false);
//     const navigate = useNavigate()

//     const handleSave = async () => {
//         if (!value.trim()) return;
//         setLoading(true);
//         setSaved(false);

//         await new Promise((res) => setTimeout(res, 2000)); 

//         setLoading(false);
//         setSaved(true);

//         setTimeout(() => setSaved(false), 2000);
//     };


//     return (
//         <div className="max-w-md mx-auto mt-10 px-4">
//             <div className="flex justify-between items-center mb-5">
//                 <img
//                     onClick={() => navigate(-1)}
//                     src="./Arrow Left.svg" alt="arrow left" />
//                 <h1 className="text-lg font-bold">Period Duration</h1>
//                 <button
//                     onClick={handleSave}
//                     className={`font-bold ${saved ? "text-pink-300" : "text-palevioletred"
//                         }`}
//                     disabled={saved}
//                 >
//                     Save
//                 </button>
//             </div>
//             <hr className="border-gray-200" />

//             <div className="flex justify-between items-center border border-pink-300 rounded-2xl mt-5 p-3">
//                 <h6 className="font-medium">{value}</h6>

//                 <div className="border py-1 px-6 gap-2 flex items-center rounded-lg border-pink-500 text-palevioletred">
//                     <span
//                         className='cursor-pointer'
//                         onClick={() => setValue(-1)}> <Minus size={18} /> </span>
//                     <span className="border border-l h-3 border-pink-400"></span>
//                     <span
//                         className='cursor-pointer'
//                         onClick={() => setValue(+1)}> <Plus size={18} /> </span>
//                 </div>
//             </div>

//             <div className="text-left text-[12px] md:text-sm text-gray-400 mt-1">
//                 Days
//             </div>
//         </div>
//     )
// }

// export default EditPeriodDuration

import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPeriodDuration = () => {
    const [value, setValue] = useState(0); 
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (value <= 0) return; 
        setLoading(true);
        setSaved(false);

        await new Promise((res) => setTimeout(res, 2000));

        setLoading(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 2000);
    };

    const increment = () => setValue((prev) => prev + 1);
    const decrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0));

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <div className="flex justify-between items-center mb-5">
                <img
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg"
                    alt="arrow left"
                    className="cursor-pointer"
                />
                <h1 className="text-lg font-bold">Period Duration</h1>
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

            <div className="text-left text-[12px] md:text-sm text-gray-400 mt-1">
                Days
            </div>
        </div >
    );
};

export default EditPeriodDuration;