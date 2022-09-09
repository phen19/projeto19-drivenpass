import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { schemas } from "../schemas/schemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(schemas.authSchema), authController.signUp);
authRouter.post("/signin", schemaValidator(schemas.authSchema), authController.signIn);

export default authRouter;
