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
import enCycle from "./locales/en/cycle.json";

import frCommon from "./locales/fr/common.json";
import frCycle from "./locales/fr/cycle.json";
import frSettings from "./locales/fr/settings.json";
import frOnboarding from './locales/fr/onboarding.json'
import frAuthoptions from "./locales/fr/authoptions.json";
import frPlaceholder from "./locales/fr/placeholder.json";
import frToast from "./locales/fr/toast.json";

import esOnboarding from './locales/es/onboarding.json'
import esCommon from "./locales/es/common.json";
import esAuthoptions from "./locales/es/authoptions.json";
import esPlaceholder from "./locales/es/placeholder.json";
import esToast from "./locales/es/toast.json";
import esSettings from "./locales/es/settings.json";
import esCycle from "./locales/es/cycle.json";

import zhCommon from "./locales/zh/common.json";
import zhCycle from "./locales/zh/cycle.json";
import zhSettings from "./locales/zh/settings.json";
import zhOnboarding from './locales/zh/onboarding.json'
import zhAuthoptions from "./locales/zh/authoptions.json";
import zhPlaceholder from "./locales/zh/placeholder.json";
import zhToast from "./locales/zh/toast.json";

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
                authoptions: enAuthoptions,
                placeholder: enPlaceholder,
                toast: enToast,
                settings: enSettings,
                cycle: enCycle,
            },
            fr: {
                onboarding: frOnboarding,
                common: frCommon,
                cycle: frCycle,
                settings: frSettings,
                authoptions: frAuthoptions,
                placeholder: frPlaceholder,
                toast: frToast,
            },
            zh: {
                onboarding: zhOnboarding,
                common: zhCommon,
                cycle: zhCycle,
                settings: zhSettings,
                authoptions: zhAuthoptions,
                placeholder: zhPlaceholder,
                toast: zhToast,
            },
            es: {
                onboarding: esOnboarding,
                common: esCommon,
                authoptions: esAuthoptions,
                placeholder: esPlaceholder,
                toast: esToast,
                settings: esSettings,
                cycle: esCycle,
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
