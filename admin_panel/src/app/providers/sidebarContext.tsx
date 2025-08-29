import React, {createContext, useMemo, useState} from "react";


interface sidebarState {
    toggle:boolean
    toggleSidebar : ()=>void
}

const SidebarProvider = createContext<sidebarState | null>(null)

export const SidebarContext: React.FC<{children:React.ReactNode}>=({children})=>{
    const [toggle,setToggle] =  useState<boolean>(false)
    const toggleSidebar = ()=> setToggle(prev => !prev)
    // const toggleValue = useMemo(toggle,[])
    const value = useMemo(()=>({toggle,toggleSidebar}),[toggle])
    return(
        <SidebarProvider value={value} >
            {children}
    </SidebarProvider>

    )
    
}