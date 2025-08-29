let accessToken:string | null = null



export function getAccessToken(){
    return accessToken
}

export function setAccessToken(token:string|null){
    accessToken = token
    return accessToken

}

export function deleteAccessToken(){
    accessToken = null
    return accessToken
}