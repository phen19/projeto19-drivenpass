import {prisma} from "../database/database.js"
import {CredentialData} from "../Types/credentialType"

async function getCredentialsByUserId(userId: number){
    return prisma.credential.findMany({
        where: {userId}
    })
}

async function getCredentialById(id:number) {
    return prisma.credential.findUnique({
        where: {id}
    })
}

async function createCredential(credential: CredentialData){
    await prisma.credential.create({
        data: credential
    })
}

async function existingTitle(title:string, userId: number){
    return prisma.credential.findUnique({
        where:{
            userId_title:{
                userId: userId,
                title: title
            }
        }
    })
}

async function deleteCredential(id:number) {
    await prisma.credential.delete({
        where: {id}
    })
}

export{
    getCredentialsByUserId,
    getCredentialById,
    createCredential,
    existingTitle,
    deleteCredential
}