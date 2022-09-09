import { Request, Response} from "express";
import { CredentialData } from "../Types/credentialType";
import * as credentialService from "../services/credentialService.js"



export async function getCredentials(req: Request, res: Response){
    const id:number = res.locals.id.id
    console.log(id)
    const result = await credentialService.getCredentialsByUserId(id)
    res.status(200).send(result)
}

export async function getCredentialById(req: Request, res: Response) {
    const id:number= parseInt(req.params.id)
    const userId:number = res.locals.id.id
    const result = await credentialService.getCredentialById(id, userId)
    res.status(200).send(result)
}

export async function createCredential(req:Request, res: Response) {
    const {url, title, username, password} = req.body
    const id:number = res.locals.id.id
    const credential:CredentialData ={
        url,
        title,
        username,
        password,
        userId:id
    }

    await credentialService.createCredential(credential)
    res.status(201).send("credential created")
}

export async function deleteCredential(req:Request, res:Response){
    const id:number = parseInt(req.params.id)
    const userId:number = res.locals.id.id

    await credentialService.deleteCredential(id, userId)
    res.status(204).send("deleted")
}