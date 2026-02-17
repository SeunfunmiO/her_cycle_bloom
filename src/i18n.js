// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

// export default i18n
//     .use(Backend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         fallbackLng: "en", // Default if language is missing
//         interpolation: { escapeValue: false }
//     });

// export default i18n;

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";


// import en from "./locales/en.json";
// import fr from "./locales/fr.json";
// import zn from "./locales/zn.json";
// import es from "./locales/es.json";

// i18n
//     .use(Backend)
//     .use(LanguageDetector)
//     .use(initReactI18next).init({
//         resources: {
//             en: { translation: en },
//             fr: { translation: fr },
//             zn: { translation: zn },
//             es: { translation: es },
//         },
//         lng: "en",
//         fallbackLng: "en",
//         interpolation: {
//             escapeValue: false,
//         },
//     });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import enOnboarding from './locales/en/onboarding.json'
import enCommon from "./locales/en/common.json";
import enAuthoptions from "./locales/en/authoptions.json";
import enPlaceholder from "./locales/en/placeholder.json";
import enToast from "./locales/en/toast.json";
import enSettings from "./locales/en/settings.json";
// import enCycle from "./locales/en/cycle.json";

// import frCommon from "./locales/fr/common.json";
// import frCycle from "./locales/fr/cycle.json";
// import frSettings from "./locales/fr/settings.json";

import esOnboarding from './locales/es/onboarding.json'
import esCommon from "./locales/es/common.json";
import esAuthoptions from "./locales/es/authoptions.json";
import esPlaceholder from "./locales/es/placeholder.json";
import esToast from "./locales/es/toast.json";
import esSettings from "./locales/es/settings.json";
// import esCycle from "./locales/es/cycle.json";

// import znCommon from "./locales/zn/common.json";
// import znCycle from "./locales/zn/cycle.json";
// import znSettings from "./locales/zn/settings.json";

const selectedLang = localStorage.getItem('selectedLang')

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                onboarding: enOnboarding,
                common: enCommon,
                authoptions:enAuthoptions,
                placeholder:enPlaceholder,
                toast:enToast,
                settings: enSettings
                // cycle: enCycle,
            },
            // fr: {
            //     common: frCommon,
            //     cycle: frCycle,
            //     settings: frSettings
            // },
            // zn: {
            //     common: znCommon,
            //     cycle: znCycle,
            //     settings: znSettings
            // },
            es: {
                onboarding: esOnboarding,
                common: esCommon,
                authoptions: esAuthoptions,
                placeholder: esPlaceholder,
                toast: esToast,
                settings: esSettings
                // cycle: esCycle,
            }
        },
        lng: selectedLang || "en",
        fallbackLng: "en",
        ns: ["common", "cycle", "settings"],
        defaultNS: "common",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
