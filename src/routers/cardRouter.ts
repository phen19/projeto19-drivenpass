import { Router } from "express";
import { createCard, deleteCard, getCardById, getCards } from "../controllers/cardController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const cardRouter = Router()


cardRouter.get("/cards", tokenValidationMiddleware, getCards)
cardRouter.post("/cards", tokenValidationMiddleware, schemaValidator(schemas.cardSchema),createCard)
cardRouter.get("/cards/:id", tokenValidationMiddleware, getCardById);
cardRouter.delete("/cards/:id", tokenValidationMiddleware, deleteCard)

export default cardRouter