import * as credentialRepository from "../repositories/credentialRepository.js"
import * as userRepository from "../repositories/userRepository.js"
import { CredentialData } from "../Types/credentialType.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(process.env.SECRET_KEY)

async function getCredentialsByUserId(id:number){
    const existingUser = await userRepository.findById(id)
    if(!existingUser){
        throw {code: "NotFound", message: "User not found"}
    }

    const result =await credentialRepository.getCredentialsByUserId(id)
    return result
}

async function getCredentialById(id:number, userId: number){
    const result = await validateCredential(id, userId)
    result.password = cryptr.decrypt(result.password)
    return result
}

async function createCredential(credentialData: CredentialData): Promise< void> {
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
    const result = await validateCredential(id, userId)
    await credentialRepository.deleteCredential(id)
}

async function validateCredential(id:number, userId:number){
    const existingCredential = await credentialRepository.getCredentialById(id)
    if(!existingCredential){
        throw {code: "NotFound", message: "Credential not found"}
    }

    const result =await credentialRepository.getCredentialById(id)
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