declare global{
    type Nullable<T> = T | null
    type Undefined<T> = T | undefined
    type Json = string | number | boolean | null | Json[] | {[key:string]:Json}
    interface window{
        __APP_VERSION__:string
    }
}
declare module "*.svg"{
    import React from 'react'
    const content:React.FC<React.SVGProps<SVGSVGElement>>
    export default content
}

declare module "*.png"{
    const value:string;
    export default value
}
interface ApiResponse<T>{
    success:boolean
    message?:string;
    data:T
}
interface pagination{
    page:number;
    limit:number;
    total:numer;
}

interface AppEvents{
    "user:login":{userId:number}
    // "user:register":{step:'main info'| 'location' | 'game info',data:registerationData}
    "user:logout":undefined
}

type EventHandler<T> = (payload:T)=> void
// type User = { id: number; name: string };
// const maybeUser: Nullable<User> = null;

// const onLogin: EventHandler<AppEvents["user:login"]> = (data) => {
//   console.log(data.userId);
// };
export {}