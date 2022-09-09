import { Router } from "express";
import { signUp, signIn, teste } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(schemas.authSchema), signUp);
authRouter.post("/signin", schemaValidator(schemas.authSchema), signIn);
authRouter.get("/signin",tokenValidationMiddleware, teste)

export default authRouter;
