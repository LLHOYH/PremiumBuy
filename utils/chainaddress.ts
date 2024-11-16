export const getContractByChain=(chainId:number|undefined)=>{

    switch(chainId){
        case 84532:
            return '0x0c7f1cAeb6365A417805574fb202551C6479E888'
        default:
            return ''
    }

}

export const getNameByChain=(chainId:number|undefined)=>{

    switch(chainId){
        case 84532:
            return 'base'
        default:
            return ''
    }

}