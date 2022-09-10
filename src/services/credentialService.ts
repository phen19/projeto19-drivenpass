import * as credentialRepository from "../repositories/credentialRepository.js"
import { userCheck } from "../utils/utils.js"
import { CredentialData, ResultCredential } from "../Types/credentialType.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(process.env.SECRET_KEY!)

async function getCredentialsByUserId(userId:number){
    await userCheck(userId)
    const result: ResultCredential[] = await credentialRepository.getCredentialsByUserId(userId)
    result.forEach((el)=>  delete el.password)
    return result
}

async function getCredentialById(id:number, userId: number){
    const result = await validateCredential(id, userId)
    result.password = cryptr.decrypt(result.password)
    return result
}

async function createCredential(credentialData: CredentialData){
    const existingTitle = await credentialRepository.existingTitle(credentialData.title, credentialData.userId)

    if(existingTitle){
        throw {code: "Conflict", message: "Title already registered for this user"}
    }
    
    const credential:CredentialData = {
        url: credentialData.url,
        title: credentialData.title,
        username:credentialData.username,
        password: cryptr.encrypt(credentialData.password),
        userId: credentialData.userId
    }
    await credentialRepository.createCredential(credential)
}

async function deleteCredential(id:number, userId:number){
    await validateCredential(id, userId)
    await credentialRepository.deleteCredential(id)
}

async function validateCredential(id:number, userId:number){
    const result =await credentialRepository.getCredentialById(id)
    if(!result){
        throw {code: "NotFound", message: "Credential not found"}
    }
    if(result.userId !== userId){
        throw {code: "Unauthorized", message: "credential does not belong to this user"}
    }
    return result
}

export{
    getCredentialsByUserId,
    getCredentialById,
    createCredential,
    deleteCredential
}