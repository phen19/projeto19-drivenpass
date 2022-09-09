import * as noteRepository from "../repositories/noteRepository.js"
import * as userRepository from "../repositories/userRepository.js"
import { NoteData} from "../Types/safeNotesType.js"

async function getNotesByUserId(id:number){
    const existingUser = await userRepository.findById(id)
    if(!existingUser){
        throw {code: "NotFound", message: "User not found"}
    }

    const result = await noteRepository.getNotesByUserId(id)
    return result
}

async function getNoteById(id:number, userId: number){
    const result = await validateNote(id, userId)
    return result
}

async function createNote(note:NoteData) {
    const existingTitle = await noteRepository.existingTitle(note.title, note.userId)
    if(existingTitle){
        throw {code: "Conflict", message: "Title already registered for this user"}
    }
  await noteRepository.createNote(note)  
}

async function deleteNote(id:number, userId: number){
    const result = await validateNote(id, userId)
    await noteRepository.deleteNote(id)
}

async function validateNote(id:number, userId:number){
    const existingNote = await noteRepository.getNoteById(id)
    if(!existingNote){
        throw {code: "NotFound", message: "Note not found"}
    }

    const result =await noteRepository.getNoteById(id)
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