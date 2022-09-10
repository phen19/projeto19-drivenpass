import { Router } from "express";
import * as documentController from "../controllers/documentController.js"
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const documentRouter = Router()

documentRouter.get("/documents", tokenValidationMiddleware, documentController.getDocuments)
documentRouter.post("/documents", tokenValidationMiddleware, schemaValidator(schemas.documentSchema), documentController.createDocument)
documentRouter.get("/documents/:id", tokenValidationMiddleware, documentController.getDocumentById)
documentRouter.delete("/documents/:id", tokenValidationMiddleware, documentController.deleteDocument)

export default documentRouter