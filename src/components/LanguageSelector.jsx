"use client";
import { Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const languageOptions = [
    { code: "en", label: "English", countryCode: "gb" },
    { code: "fr", label: "French", countryCode: "fr" },
    { code: "es", label: "Spanish", countryCode: "es" },
    { code: "zh", label: "Chinese", countryCode: "cn" },
    { code: "ar", label: "Arabic", countryCode: "sa" },
    { code: "bn", label: "Bengali", countryCode: "bd" },
    { code: "de", label: "German", countryCode: "de" },
    { code: "hi", label: "Hindi", countryCode: "in" },
    { code: "it", label: "Italian", countryCode: "it" },
    { code: "ja", label: "Japanese", countryCode: "jp" },
    { code: "jv", label: "Javanese", countryCode: "id" },
    { code: "ko", label: "Korean", countryCode: "kr" },
    { code: "mr", label: "Marathi", countryCode: "in" },
    { code: "pt", label: "Portuguese", countryCode: "pt" },
    { code: "ru", label: "Russian", countryCode: "ru" },
];

const LanguageSelector = () => {
    const [selectedLang, setSelectedLang] = useState("en");
    const [search, setSearch] = useState("");
    const { t, i18n } = useTranslation("common");

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang.code);
        setSelectedLang(lang.code);
        localStorage.setItem("selectedLang", lang.code);
    };


    useEffect(() => {
        const saved = localStorage.getItem("selectedLang");
        if (saved) {
            setSelectedLang(saved);
            i18n.changeLanguage(saved);
        }
    }, [i18n]);

    const filteredLanguages = languageOptions.filter((lang) =>
        lang.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="w-full max-w-md mx-auto p-4 bg-white rounded-xl dark:bg-neutral-800 shadow-lg border border-gray-100 
        transition-colors mt-10 dark:border-neutral-700"
        >
            <input
                type="text"
                placeholder={t("search_language")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-3 px-3 py-2 text-sm border rounded-lg border-pink-50 outline-0"
            />

            <div className="max-h-90 overflow-y-auto custom-scrollbar scrollbar-hide flex flex-col gap-5 ">
                {filteredLanguages.map((lang, index) => (
                    <div key={lang.code}>
                        <button

                            onClick={() => changeLanguage(lang)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition
                             ${selectedLang === lang.code

                                    ? ""
                                    : "hover:bg-gray-100 dark:hover:bg-palevioletred"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={`https://flagcdn.com/24x18/${lang.countryCode}.png`}
                                    alt={`${lang.label} flag`}
                                    className="w-6 h-4 object-cover rounded-sm"
                                />
                                <span className="text-sm font-medium">
                                    {lang.label}
                                </span>
                            </div>

                            {selectedLang === lang.code
                                && (
                                    <span className="text-palevioletred font-bold"><Check size={20} /></span>
                                )}
                        </button>

                        {index !== filteredLanguages.length - 1 && (
                            <div className="px-4">
                                <div className="border-t border-gray-200 dark:border-neutral-700" />
                            </div>
                        )}
                    </div>
                ))}

                {filteredLanguages.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-neutral-400 text-center py-3">
                        {t('no_language_found')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LanguageSelector;