import React,{createContext,useEffect,useState} from "react";


interface theme{
 toggle:'light'|'dark'
 setToggle:React.Dispatch<React.SetStateAction<'light'|'dark'>>

}


const ThemeProvidder = createContext<theme | undefined>(undefined)
const ThemeContext:React.FC<{children:React.ReactNode}> =({children})=>{

    const [toggle,setToggle] = useState<'light'|'dark'>('light')

   useEffect(()=>{
    const root = window.document.documentElement
    if(toggle == 'dark'){
        root.classList.add('dark')
    }
    else{
         root.classList.add('light')
    }
   },[toggle])
    return(
    <ThemeProvidder value={{toggle,setToggle}}>{children}</ThemeProvidder>
    )
}
export default ThemeContext