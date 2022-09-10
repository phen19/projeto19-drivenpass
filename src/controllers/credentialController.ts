import { Request, Response} from "express";
import { CredentialData } from "../Types/credentialType";
import * as credentialService from "../services/credentialService.js"



export async function getCredentials(req: Request, res: Response){
    const userId:number = res.locals.userId
    const result = await credentialService.getCredentialsByUserId(userId)
    res.status(200).send(result)
}

export async function getCredentialById(req: Request, res: Response) {
    const id:number= parseInt(req.params.id)
    const userId:number = res.locals.userId
    const result = await credentialService.getCredentialById(id, userId)
    res.status(200).send(result)
}

export async function createCredential(req:Request, res: Response) {
    const {url, title, username, password} = req.body
    const userId:number = res.locals.userId
    const credential:CredentialData ={
        url,
        title,
        username,
        password,
        userId
    }

    await credentialService.createCredential(credential)
    res.status(201).send("credential created")
}

export async function deleteCredential(req:Request, res:Response){
    const id:number = parseInt(req.params.id)
    const userId:number = res.locals.userId

    await credentialService.deleteCredential(id, userId)
    res.status(204).send("deleted")
}