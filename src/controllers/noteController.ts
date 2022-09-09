import { Request, Response} from "express"
import { NoteData } from "../Types/safeNotesType"
import * as noteService from "../services/noteService.js"

export async function getNotes(req:Request, res: Response) {
    const userId:number = res.locals.id.id
    const result = await noteService.getNotesByUserId(userId)
    res.status(200).send(result)
}

export async function getNoteById(req:Request, res:Response){
    const id:number= parseInt(req.params.id)
    const userId:number = res.locals.id.id
    const result = await noteService.getNoteById(id, userId)
    res.status(200).send(result)
}

export async function createNote(req:Request,res:Response) {
    const {title, note} = req.body
    const userId:number = res.locals.id.id
    const noteData:NoteData ={
        title,
        note,
        userId
    }
    await noteService.createNote(noteData)
    res.status(201).send("note created")
}

export async function deleteNote(req:Request, res:Response){
    const id:number=parseInt(req.params.id)
    const userId:number = res.locals.id.id
    
    await noteService.deleteNote(id, userId)
    res.status(204).send("deleted")
}