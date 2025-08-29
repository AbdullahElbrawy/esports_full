import i18n, {type InitOptions} from 'i18next'

import {initReactI18next} from 'react-i18next'

import enCommon from '../locals/en/common.json'
import arCommon from '../locals/ar/common.json'


const resources ={
    en:{common:enCommon},
    ar:{common:arCommon}

} as const
 


const options:InitOptions = {
 resources,
 lng:localStorage.getItem('langauge') || (window?.navigator.language.startsWith('ar') ? 'ar' : 'en' ),
 fallbackLng:'en',
 supportedLngs:['ar','en'],
 ns:'common',
  /** Key & separator */
  keySeparator: '.',               // false to allow dots inside keys
  nsSeparator: ':',                // e.g. 'home:title'
  contextSeparator: '_',           // e.g. 'button_submit_male'
    /** Interpolation (variables & formatting) */
    interpolation: {
        escapeValue: false,            // react already escapes
        format: (value, fmt, lng) => {
          if (fmt === 'number' && typeof value === 'number') {
            return new Intl.NumberFormat(lng).format(value);
          }
          if (fmt === 'date') {
            return new Intl.DateTimeFormat(lng, { dateStyle: 'medium' }).format(value as any);
          }
          return String(value ?? '');
        }
      },
 nonExplicitSupportedLngs:true, // 'for example treat ar-eg as ar '
 react:{useSuspense:true},
 returnNull:false,
 returnEmptyString:false
}

i18n.use(initReactI18next).init(options)
document.documentElement.dir = i18n.dir()

i18n.on('languageChanged',()=>{
    document.documentElement.dir = i18n.dir()
    localStorage.setItem('langauge',i18n.language)
})

export default 18n
export type Resources = typeof resources