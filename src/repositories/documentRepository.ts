import {prisma} from "../database/database.js";
import { DocumentsData } from "../Types/documentType.js";


enum document {
    RG = "RG",
    CNH= "CNH",
}
type documentType = keyof typeof document


async function getDocumentsByUserId(userId:number){
    return prisma.documents.findMany({
        where:{userId}
    })
}

async function getDocumentById(id:number){
    return prisma.documents.findUnique({
        where:{id}
    })
}

async function createDocument(document: DocumentsData){
    await prisma.documents.create({
        data:document
    })
}

async function existingDocument(type:string, userId: number) {
    const teste :documentType= document[type as keyof typeof document]
    return prisma.documents.findUnique({
        where:{
            userId_type:{
            userId:userId,
            type:teste
            }
        }
    })
}

async function deleteDocument(id:number){
    await prisma.documents.delete({
        where:{id}
    })
}

export {
    getDocumentsByUserId,
    getDocumentById,
    createDocument,
    deleteDocument,
    existingDocument
}