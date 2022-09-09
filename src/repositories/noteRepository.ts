import {prisma} from "../database/database.js"
import { NoteData } from "../Types/safeNotesType.js"

async function getNotesByUserId(id:number){
    return prisma.note.findMany({
        where: {userId:id}
    })
}

async function getNoteById(id:number){
    return prisma.note.findUnique({
        where:{id}
    })
}

async function createNote(note: NoteData){
    await prisma.note.create({
        data: note
    })
}

async function existingTitle(title:string, userId: number){
    return prisma.note.findUnique({
        where:{
            userId_title:{
                userId: userId,
                title: title
            }
        }
    })
}

async function deleteNote(id:number) {
    await prisma.note.delete({
        where: {id}
    })
}

export{
    getNotesByUserId,
    getNoteById,
    createNote,
    existingTitle,
    deleteNote
}