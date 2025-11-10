
import { useState } from "react";
import { X, Check, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditName() {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate()

    const handleSave = async () => {
        if (!value.trim()) return;
        setLoading(true);
        setSaved(false);

        await new Promise((res) => setTimeout(res, 2000));
        toast.success('Name updated successfuly')

        setLoading(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 2000);
    };

    const handleClear = () => setValue("");

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <div className="flex justify-between items-center mb-5">
                <img
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg" alt="arrow left" />
                <h1 className="text-lg font-bold">Name</h1>
                <button
                    onClick={handleSave}
                    className={`font-bold ${loading ? "text-pink-300" : "text-palevioletred"
                        }`}
                    disabled={loading}
                >
                    Save
                </button>
            </div>
            <hr className="border-gray-200" />

            <div className="relative border border-pink-300 rounded-2xl mt-5 py-3 px-3">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full outline-none text-gray-800 text-base"
                    maxLength={30}
                    autoFocus
                />

                <div className="absolute right-0 top-0 h-full flex items-center pr-2">
                    {loading ? (
                        <Loader className="w-4 h-4 text-gray-500 animate-spin" />
                    ) : saved ? (
                        <Check className="w-4 h-4 text-green-500" />
                    ) : value ? (
                        <X
                            className="w-4 h-4 text-gray-400 cursor-pointer border rounded-full"
                            onClick={handleClear}
                        />
                    ) : null}
                </div>
            </div>

            <div className="text-left text-[12px] md:text-sm text-gray-400 mt-1">
                {value.length}/30 characters
            </div>
        </div>
    );
}