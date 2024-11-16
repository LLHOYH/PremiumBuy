export const getContractByChain=(chainId:number|undefined)=>{

    switch(chainId){
        case 84532:
            return '0x0c7f1cAeb6365A417805574fb202551C6479E888'
        case 44787:
            return '0xEe93D1909Ba7377cfa4e2831cdAe258553d051bc'
        case 545:
            return '0x973D1412aD84C20aA212992809C322221C32078b'
        case 2810:
            return '0xEe2D92f71A623b032b281b057F52B3f6d0d9b9c5'
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
        case 545:
            return 'flow'
        case 2810:
            return 'morph'
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
        case 545:
            return 'https://evm-testnet.flowscan.io/tx/'
        case 2810:
            return 'https://explorer-holesky.morphl2.io/tx/'
        default:
            return ''
    }

}