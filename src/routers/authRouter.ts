import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(schemas.authSchema), signUp);
authRouter.post("/signin", schemaValidator(schemas.authSchema), signIn);

export default authRouter;
