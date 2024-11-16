export const getContractByChain=(chainId:number|undefined)=>{

    switch(chainId){
        case 84532:
            return '0x0c7f1cAeb6365A417805574fb202551C6479E888'
        case 44787:
            return '0xEe93D1909Ba7377cfa4e2831cdAe258553d051bc'
        default:
            return ''
    }

}

export const getNameByChain=(chainId:number|undefined)=>{

    switch(chainId){
        case 84532:
            return 'base'
        case 44787:
            return 'celo'
        default:
            return ''
    }

}


export const getExplorerByChain=(chainId:number|undefined)=>{

    switch(chainId){
        case 84532:
            return 'https://base-sepolia.blockscout.com/tx/'
        case 44787:
            return 'https://celo-alfajores.blockscout.com/tx/'
        default:
            return ''
    }

}