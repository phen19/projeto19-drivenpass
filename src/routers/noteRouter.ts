import { Router } from "express"
import * as noteController from "../controllers/noteController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js"

const noteRouter = Router();

noteRouter.get("/notes", tokenValidationMiddleware, noteController.getNotes)
noteRouter.post("/notes",tokenValidationMiddleware, schemaValidator(schemas.noteSchema), noteController.createNote)
noteRouter.get("/notes/:id", tokenValidationMiddleware, noteController.getNoteById)
noteRouter.delete("/notes/:id", tokenValidationMiddleware, noteController.deleteNote)

export default noteRouter