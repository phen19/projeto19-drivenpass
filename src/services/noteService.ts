import * as noteRepository from "../repositories/noteRepository.js"
import { userCheck } from "../utils/utils.js"
import { NoteData} from "../Types/safeNotesType.js"

async function getNotesByUserId(userId:number){
    await userCheck(userId)
    return await noteRepository.getNotesByUserId(userId)
}

async function getNoteById(id:number, userId: number){
    return await validateNote(id, userId)
}

async function createNote(note:NoteData) {
    const existingTitle = await noteRepository.existingTitle(note.title, note.userId)
    if(existingTitle){
        throw {code: "Conflict", message: "Title already registered for this user"}
    }
  await noteRepository.createNote(note)  
}

async function deleteNote(id:number, userId: number){
    await validateNote(id, userId)
    await noteRepository.deleteNote(id)
}

async function validateNote(id:number, userId:number){
    const result = await noteRepository.getNoteById(id)
    if(!result){
        throw {code: "NotFound", message: "Note not found"}
    }
    if(result.userId !== userId){
        throw {code: "Unauthorized", message: "Note does not belong to this user"}
    }

    return result
}

export{
    getNotesByUserId,
    getNoteById,
    createNote,
    deleteNote
}