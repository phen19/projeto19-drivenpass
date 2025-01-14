import * as cardRepository from "../repositories/cardRepository.js"
import { userCheck } from "../utils/utils.js"
import { CardData, ResultCard } from "../Types/cardType.js"
import Cryptr from "cryptr"
import dotenv from "dotenv"

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET_KEY!)

async function getCardsByUserId(userId:number){
    await userCheck(userId)
    const result:ResultCard[]= await cardRepository.getCardsByUserId(userId)
    result.forEach((el)=> {delete el.password
        delete el.securityCode})
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
    await validateCard(id, userId)
    await cardRepository.deleteCard(id)
}

async function validateCard(id:number, userId:number){
    const result = await cardRepository.getCardById(id)
    if(!result){
        throw {code: "NotFound", message: "Card not found"}
    }
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