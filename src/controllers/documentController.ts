import { Request, Response} from "express"
import { DocumentsData } from "../Types/documentType.js"
import * as documentService from "../services/documentService.js"

export async function getDocuments(req: Request, res: Response){
    const userId:number = res.locals.userId
    const result = await documentService.getDocumentsByUserId(userId)
    res.status(200).send(result)
}

export async function getDocumentById(req: Request, res: Response){
    const id:number=parseInt(req.params.id)
    const userId:number = res.locals.userId
    const result = await documentService.getDocumentById(id, userId)
    res.status(200).send(result)
}

export async function createDocument(req: Request, res: Response){
    const {fullName, type, emissionDate, expireDate, number, issuer} = req.body
    const userId:number = res.locals.userId
    const document:DocumentsData ={
        fullName,
        type,
        emissionDate,
        expireDate,
        number,
        issuer,
        userId
    }
    await documentService.createDocument(document)
    res.status(201).send("document created")
}

export async function deleteDocument(req:Request, res: Response){
    const id:number = parseInt(req.params.id)
    const userId:number = res.locals.userId

    await documentService.deleteDocument(id, userId)
    res.status(204).send("deleted")
}