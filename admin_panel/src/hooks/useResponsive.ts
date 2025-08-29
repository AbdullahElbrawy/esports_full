import React, { useLayoutEffect, useRef, useState } from "react";



const UseResponsive =(breakPoint?:number)=>{
    
    const [width,setWidth] = useState<number>(typeof window !== 'undefined'? document.documentElement.clientWidth:0)

useLayoutEffect(()=>{
   const windowReziser =()=>{setWidth(document.documentElement.clientWidth)}
    window.addEventListener('resize',windowReziser)
    windowReziser()
    return ()=>{
        window.removeEventListener('resize',windowReziser)
    }
},[])

return {
    width,
    isMobile:breakPoint?width < breakPoint :width < 768,
    isTablet:width>=768 && width < 1024,
    isDesktop:width>=1024
}
}
export default UseResponsive