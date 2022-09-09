import { Router } from "express";
import * as credentialController from "../controllers/credentialController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const credentialRouter = Router()

credentialRouter.get("/credentials", tokenValidationMiddleware, credentialController.getCredentials)
credentialRouter.post("/credentials", tokenValidationMiddleware, schemaValidator(schemas.credentialSchema), credentialController.createCredential)
credentialRouter.get("/credentials/:id", tokenValidationMiddleware,credentialController.getCredentialById)
credentialRouter.delete("/credentials/:id", tokenValidationMiddleware, credentialController.deleteCredential)

export default credentialRouter