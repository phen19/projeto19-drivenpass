import * as cardRepository from "../repositories/cardRepository.js"
import * as userRepository from "../repositories/userRepository.js"
import { CardData } from "../Types/cardType.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(process.env.SECRET_KEY)

async function getCardsByUserId(id:number){
    const existingUser = await userRepository.findById(id)
    if(!existingUser){
        throw{code:'NotFound', message: 'User not found'}
    }

    const result = await cardRepository.getCardsByUserId(id)
    return result
}

async function getCardById(id:number, userId:number){
    const result = await validateCard(id, userId)
    result.password = cryptr.decrypt(result.password)
    result.securityCode = cryptr.decrypt(result.securityCode)
    return result
}

async function createCard(card: CardData){
    const existingTitle = await cardRepository.existingTitle(card.title, card.userId)
    if(existingTitle){
        throw {code: 'Conflict', message:'Tittle already registered for this user'}
    }

    const cardData: CardData ={
        title: card.title,
        cardHolderName: card.cardHolderName,
        number: card.number,
        securityCode: cryptr.encrypt(card.securityCode),
        expireDate: card.expireDate,
        password: cryptr.encrypt(card.password),
        isVirtual: card.isVirtual,
        type: card.type,
        userId: card.userId
    }

    await cardRepository.createCard(cardData)
}

async function deleteCard(id:number, userId:number){
    const result = await validateCard(id, userId)
    await cardRepository.deleteCard(id)
}

async function validateCard(id:number, userId:number){
    const existingCard = await cardRepository.getCardById(id)
    if(!existingCard){
        throw {code: "NotFound", message: "Card not found"}
    }

    const result =await cardRepository.getCardById(id)
    if(result.userId !== userId){
        throw {code: "Unauthorized", message: "Card does not belong to this user"}
    }

    return result
}

export{
    getCardsByUserId,
    getCardById,
    createCard,
    deleteCard
}