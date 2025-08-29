import { z } from 'zod'
const mode = import.meta.env.MODE
const language = import.meta.env.VITE_LANGUAGE



const apiUrlResolver = () => {

    if (typeof window !== 'undefined' && window.location.origin) {
        return `${window.location.origin}/api`
    }
    // return `${raw.VITE_API_URL}/api`
}
const languageResolver = () => {
    let language;
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {

        language = navigator.language ?? 'en'
    }

}
const baseUrlResolver = () => {
    if (raw.VITE_MODE === 'dev') {
        return import.meta.env.BASE_URL_DEV
    }
    return import.meta.env.BASE_URL_PROD
}

const rawEnv = z.object({
    VITE_BASE_URL: z.string().url(),
    VITE_API_URL: z.string().url(),
    VITE_LANGUAGE: z.string().optional(),
    VITE_MODE: z.string().optional()
})
const raw = rawEnv.parse({
    VITE_BASE_URL: baseUrlResolver(),
    VITE_API_URL: apiUrlResolver(),
    VITE_LANGUAGE: language ?? languageResolver(),
    VITE_MODE: mode
})


export const env = {
    mainURL: raw.VITE_BASE_URL,
    mode: raw.VITE_MODE,
    language: raw.VITE_LANGUAGE
}

export const MainUrl = env.mainURL
export const Mode = env.mode
export const Language = env.language