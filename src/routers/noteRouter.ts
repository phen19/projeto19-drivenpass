import { Router } from "express"
import { createNote, deleteNote, getNoteById, getNotes } from "../controllers/noteController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js"

const noteRouter = Router();

noteRouter.get("/notes", tokenValidationMiddleware, getNotes)
noteRouter.post("/notes",tokenValidationMiddleware, schemaValidator(schemas.noteSchema), createNote)
noteRouter.get("/notes/:id", tokenValidationMiddleware, getNoteById)
noteRouter.delete("/notes/:id", tokenValidationMiddleware, deleteNote)

export default noteRouter