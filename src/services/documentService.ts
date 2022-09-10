import * as documentRepository from "../repositories/documentRepository.js"
import { userCheck } from "../utils/utils.js"
import { DocumentsData } from "../Types/documentType.js"

async function getDocumentsByUserId(userId:number){
    await userCheck(userId)
    return await documentRepository.getDocumentsByUserId(userId)
}

async function getDocumentById(id:number, userId: number){
    return await validateDocument(id, userId)
}

async function createDocument(document: DocumentsData){
    const existingDocument = await documentRepository.existingDocument(document.type, document.userId)
    if(existingDocument){
        throw {code: 'Conflict', message: 'User already has a document of this type'}
    }
    await documentRepository.createDocument(document)
}

async function deleteDocument(id:number, userId:number){
    await validateDocument(id, userId)
    await documentRepository.deleteDocument(id)
}

async function validateDocument(id: number, userId:number){
    const result = await documentRepository.getDocumentById(id)
    if(!result){
        throw {code: "NotFound", message: "Document not found"}
    }
    if(result.userId !== userId){
        throw {code: "Unauthorized", message: "Document does not belong to this user"}
    }

    return result
}

export{
    getDocumentsByUserId,
    getDocumentById,
    createDocument,
    deleteDocument
}