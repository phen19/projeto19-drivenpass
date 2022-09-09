import { Router } from "express";
import { createCredential, deleteCredential, getCredentialById, getCredentials } from "../controllers/credentialController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const credentialRouter = Router()

credentialRouter.get("/credentials", tokenValidationMiddleware, getCredentials)
credentialRouter.post("/credentials", tokenValidationMiddleware, schemaValidator(schemas.credentialSchema), createCredential)
credentialRouter.get("/credentials/:id", tokenValidationMiddleware,getCredentialById)
credentialRouter.delete("/credentials/:id", tokenValidationMiddleware, deleteCredential)

export default credentialRouter