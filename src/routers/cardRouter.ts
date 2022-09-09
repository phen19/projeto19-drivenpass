import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const cardRouter = Router()


cardRouter.get("/cards", tokenValidationMiddleware, cardController.getCards)
cardRouter.post("/cards", tokenValidationMiddleware, schemaValidator(schemas.cardSchema), cardController.createCard)
cardRouter.get("/cards/:id", tokenValidationMiddleware, cardController.getCardById);
cardRouter.delete("/cards/:id", tokenValidationMiddleware, cardController.deleteCard)

export default cardRouter