import { useState, useEffect } from "react";
import { Check, Loader, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CountryStateSelect() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate()


    const handleSave = async () => {
        setLoading(true);
        setSaved(false);

        await new Promise((res) => setTimeout(res, 2000));

        setLoading(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 2000);
    };

    useEffect(() => {
        fetch("https://countriesnow.space/api/v0.1/countries/states")
            .then((res) => res.json())
            .then((data) => setCountries(data.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setSuggestions([]);
            return;
        }

        const filtered = [];

        countries.forEach((country) => {
            if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                filtered.push({ name: country.name, country: null });
            }

            country.states.forEach((state) => {
                if (state.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    filtered.push({ name: state.name, country: country.name });
                }
            });
        });

        setSuggestions(filtered.slice(0, 8)); 
    }, [searchTerm, countries]);

    const handleSelect = (item) => {
        const value = item.country ? `${item.name}, ${item.country}` : item.name;
        setSelectedLocation(value);
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleClear = () => {
        setSelectedLocation("");
        setSearchTerm("");
        setSuggestions([]);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-5 mt-10">
                <img
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg" alt="arrow left" />
                <h1 className="text-lg font-bold">Email</h1>
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
            <div className="relative mt-10">
                <input
                    type="text"
                    name="country"
                    placeholder="Search for your country or state..."
                    value={selectedLocation || searchTerm}
                    autoFocus
                    autoComplete="country"
                    autoSave="country"
                    onChange={(e) => {
                        setSelectedLocation("");
                        setSearchTerm(e.target.value);
                    }}
                    className="w-full border border-pink-300 rounded-2xl px-10 py-3 focus:outline-none text-gray-700"
                />

                <Search
                    className="absolute left-3 top-4 text-gray-400"
                    size={18}
                />


                {(searchTerm || selectedLocation) && (
                    <div className="absolute right-3 top-4">
                        {loading ? (
                            <Loader className="w-4 h-4 text-gray-500 animate-spin" />
                        ) : saved ? (
                                <Check className="w-4 h-4 text-green-500 border rounded-full" />
                        ) : searchTerm ? (
                            <X
                                className="w-4 h-4 text-gray-400 cursor-pointer border rounded-full"
                                onClick={handleClear}
                            />
                        ) : null}
                    </div>
                )}
            </div>

            {suggestions.length > 0 && (
                <ul className="border border-gray-200 rounded-lg mt-2 shadow-sm bg-white max-h-56 overflow-y-auto">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 cursor-pointer hover:bg-pink-50 text-gray-700"
                        >
                            {item.country ? (
                                <span>
                                    {item.name}, <span className="text-gray-500">{item.country}</span>
                                </span>
                            ) : (
                                <span className="font-medium">{item.name}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}