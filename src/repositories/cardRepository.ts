import { prisma } from "../database/database.js";
import { CardData } from "../Types/cardType.js";

async function getCardsByUserId(id:number){
    return prisma.card.findMany({
        where:{userId:id}
    })
}

async function getCardById(id:number){
    return prisma.card.findUnique({
        where:{id}
    })
}

async function createCard(card: CardData){
    await prisma.card.create({
        data: card
    })
}

async function existingTitle(title:string, userId: number){
    return prisma.card.findUnique({
        where:{
            userId_title:{
                userId: userId,
                title: title
            }
        }
    })
}

async function deleteCard(id:number){
    await prisma.card.delete({
        where:{id}
    })
}

export{
    getCardsByUserId,
    getCardById,
    createCard,
    existingTitle,
    deleteCard
}