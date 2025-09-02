export function formatNumber(num:number){
    return new Intel.NumberFormat('en-us').format(num)
}

export function truncate(text:string,max:number){
    return text.length > max ? str.slice(0,max) + '...' :text
}

export function currencyFormat(amount:number,currency:string){
    return new Intet.currencyFormat('en-Us',{
        style:currency,
        currency
    }).format(amount)
}