import { initReactI18next} from "react-i18next";
import resources from "./resources";
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
export const defaultNS = "menu";
const detectionOptions={
  order: ['localStorage'],
  lookupLocalStorage: 'Lng',
}
i18next
.use(LanguageDetector)
.use(initReactI18next)
.init({
    debug: true,
    fallbackLng: 'es',
    defaultNS: defaultNS,
    fallbackNS: "fallback",
    interpolation: {
        escapeValue: false,
      },
    resources,
    detection:detectionOptions
})
export default i18next;