import { Droplet } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from "lucide-react";
import SymptomItem from '../components/SymptomItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FlowButton } from '../components/FlowButton';
import { MoodButton } from '../components/MoodButton';
import { HighlightText } from '../components/HighlightText';
import { useTranslation } from 'react-i18next';



const LogEntry2 = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState([]);
    const [selectedMood, setSelectedMood] = useState([]);
    const [flow, setFlow] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState("");
    const [notes, setNotes] = useState("");
    const { t } = useTranslation([
        "common",
        "cycle",
        "toast",
        "placeholder"
    ])


    const symptomsList = [
        { id: 1, label: t("cycle:cramps"), icon: "./Vector (1).svg" },
        { id: 2, label: t("cycle:back_pain"), icon: "./Vector (2).svg" },
        { id: 3, label: t("cycle:nausea"), icon: "./vector (3).svg" },
        { id: 4, label: t("cycle:headache"), icon: "./Vector (4).svg" },
        { id: 5, label: t("cycle:fatigue"), icon: "./Vector (5).svg" },
        { id: 6, label: t("cycle:bloating"), icon: "./Vector (6).svg" },
    ];

    const moodList = [
        { id: 1, label: t("cycle:happy"), icon: "./Group.svg" },
        { id: 2, label: t("cycle:sad"), icon: "./Group (1).svg" },
        { id: 3, label: t("cycle:irritable"), icon: "./Vector (8).svg" },
        { id: 4, label: t("cycle:anxious"), icon: "./Group (3).svg" },
        { id: 5, label: t("cycle:emotional"), icon: "./Group (2).svg" },
        { id: 6, label: t("cycle:energetic"), icon: "./Vector (7).svg" },
    ];

    const fuzzySearch = (text, search) => {
        text = text.toLowerCase();
        search = search.toLowerCase();

        let i = 0;
        for (let char of text) {
            if (char === search[i]) i++;
            if (i === search.length) return true
        }
        return false;
    }

    const searchSymptoms = symptomsList.filter((symptom) => fuzzySearch(symptom.label, searchTerm))


    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const toggleMood = (id) => {
        setSelectedMood((prev) =>
            prev.includes(id)
                ? prev.filter((m) => m !== id)
                : [...prev, id]
        );
    };

    const saveEntry = async () => {
        setLoading(true)
        try {
            const symptomsSelected = symptomsList.filter(s => selected.includes(s.id)).map(s => s.label)
            const moodsSelected = moodList.filter(m => selectedMood.includes(m.id)).map(m => m.label)


            const token = localStorage.getItem("token");

            await axios.put('https://her-cycle-bloom-backend.onrender.com/period/save-entry', {
                symptoms: symptomsSelected,
                flowIntensity: flow,
                mood: moodsSelected,
                notes: notes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })

            navigate('/success')
        } catch (error) {
            console.log("Error saving entry : ", error);
            toast.error(t("toast:entry_failed"))
        }
        setLoading(false)
    }


    return (
        <div className='bg-pink-100 h-full pt-6 dark:bg-neutral-900 transition-colors duration-300'>
            <div className="max-w-md mx-auto px-4">
                <div
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-5 mb-3 dark:invert'>
                    <img className='size-4' src="./caret.svg" alt="" />
                    <h2 className='font-medium text-lg text-neutral-900 dark:neutral-100'>{t("common:record")}</h2>
                </div>

                <div className="border-b border-gray-400 dark:border-neutral-700 mt-5"></div>

                <div className='mt-5 grid grid-cols-1 gap-5'>

                    <div className='bg-white dark:bg-neutral-800 max-w-100 justify-center rounded-xl flex flex-col p-5 gap-5'>
                        <h1 className="font-semibold text lg:text-lg text-neutral-900 dark:text-neutral-100">
                            {t("cycle:flow_intensity")}
                        </h1>
                        <div className="flex gap-2 flex-wrap items-center">
                            <FlowButton
                                label={t("cycle:flow.light")}
                                droplets={1}
                                color="#ff8be0"
                                selected={flow === "Light"}
                                onClick={() => setFlow("Light")}
                            />

                            <FlowButton
                                label={t("cycle:flow.medium")}
                                droplets={2}
                                color="#e365c1"
                                selected={flow === "Medium"}
                                onClick={() => setFlow("Medium")}
                            />

                            <FlowButton
                                label={t("cycle:flow.heavy")}
                                droplets={3}
                                color="#e210a9"
                                selected={flow === "Heavy"}
                                onClick={() => setFlow("Heavy")}
                            />
                        </div>
                    </div>

                    <div className='bg-white dark:bg-neutral-800 max-w-100 justify-center rounded-xl p-5 flex flex-col gap-3'>
                        <h1 className="font-semibold lg:text-lg text-neutral-900 dark:text-neutral-100">
                            {t("cycle:symptoms")}
                        </h1>

                        <div
                            className='border-2 border-gray-200 px-3 py-2 rounded-xl placeholder:text-gray-100 
                                flex items-center w-11/12 gap-2 placeholder:text-sm'>
                            <img src="./search-normal.svg" alt="" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                className="border-0 outline-0 bg-transparent"
                                placeholder={t("placeholder:search_symptoms")}
                            />
                        </div>


                        <div className="flex items-center flex-wrap gap-10 justify-between mt-2">
                            <div className="flex flex-col gap-10">
                                {searchSymptoms.slice(0, 3).map((symptom) => (
                                    <div key={symptom.id}>
                                        <SymptomItem
                                            key={symptom.id}
                                            label={<HighlightText text={symptom.label} query={searchTerm} />}
                                            data={symptom}
                                            isSelected={selected.includes(symptom.id)}
                                            onClick={() => toggleSelect(symptom.id)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-10">
                                {searchSymptoms.slice(3, 6).map((symptom) => (
                                    <div key={symptom.id}>
                                        <SymptomItem
                                            key={symptom.id}
                                            label={<HighlightText text={symptom.label} query={searchTerm} />}
                                            data={symptom}
                                            isSelected={selected.includes(symptom.id)}
                                            onClick={() => toggleSelect(symptom.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {
                            searchSymptoms.length === 0 && (
                                <p className="text-gray-400 dark:text-neutral-400 text-sm text-center">{t("common:no_symptoms")}</p>
                            )
                        }
                    </div>


                    <div className='bg-white dark:bg-neutral-800 max-w-100 rounded-xl p-5 flex flex-col gap-5'>
                        <h1 className="font-semibold lg:text-lg text-neutral-900 dark:text-neutral-100">{t("common:mood")}</h1>
                        <div className='flex gap-5 flex-wrap'>
                            {
                                moodList.map((mood) => (
                                    <MoodButton
                                        key={mood.id}
                                        data={mood}
                                        isSelected={selectedMood.includes(mood.id)}
                                        onClick={() => toggleMood(mood.id)}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className='bg-white dark:bg-neutral-800 max-w-100 rounded-xl p-5 flex flex-col gap-5'>
                        <h1 className="font-semibold lg:text-lg text-neutral-900 dark:text-neutral-100">{t("common:toast")}</h1>
                        <textarea
                            onChange={(e) => setNotes(e.target.value)}
                            className='bg-gray-100 dark:bg-neutral-700 rounded-lg placeholder:text-sm px-5 pt-3 pb-5'
                            name="notes"
                            value={notes}
                            placeholder={t("placeholder:additional_details")}>
                        </textarea>
                    </div>
                </div>

                <button
                    onClick={saveEntry}
                    disabled={loading}
                    className={`text-white font-bold py-2 mt-5 mb-8 rounded-lg w-full
                    ${loading ? "bg-pink-300 cursor-not-allowed" : "bg-palevioletred"}
                    `}>
                    {loading ? t("common:saving") : t("common:save_entry")}
                </button>

            </div>
        </div>
    )
}

export default LogEntry2