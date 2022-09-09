import { Request, Response } from "express";
import { CardData } from "../Types/cardType.js";
import * as cardService from "../services/cardService.js"

export async function getCards(req: Request, res: Response) {
    const userId:number = res.locals.id.id
    const result = await cardService.getCardsByUserId(userId)
    res.status(200).send(result)
}

export async function getCardById(req: Request,res: Response){
    const id:number= parseInt(req.params.id)
    const userId:number = res.locals.id.id
    const result = await cardService.getCardById(id, userId)
    res.status(200).send(result)
}

export async function createCard(req:Request, res:Response) {
    const {title, cardHolderName ,number, securityCode, expireDate, password, isVirtual, type} = req.body
    const userId:number = res.locals.id.id
    const card:CardData = {
        title,
        cardHolderName,
        number,
        securityCode,
        expireDate,
        password,
        isVirtual,
        type,
        userId
    }

    await cardService.createCard(card)
    res.status(201).send("card created")
}

export async function deleteCard(req:Request, res: Response){
    const id:number = parseInt(req.params.id)
    const userId:number = res.locals.id.id

    await cardService.deleteCard(id, userId)
    res.status(204).send("deleted")
}