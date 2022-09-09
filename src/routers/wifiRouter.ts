import { Router } from "express";
import * as wifiController from "../controllers/wifiController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware.js";
import { schemas } from "../schemas/schemas.js";


const wifiRouter = Router()

wifiRouter.get("/wifis", tokenValidationMiddleware, wifiController.getWifis)
wifiRouter.post("/wifis", tokenValidationMiddleware, schemaValidator(schemas.wifiSchema), wifiController.createWifi)
wifiRouter.get("/wifis/:id", tokenValidationMiddleware, wifiController.getWifiById)
wifiRouter.delete("/wifis/:id", tokenValidationMiddleware, wifiController.deleteWifi)

export default wifiRouter