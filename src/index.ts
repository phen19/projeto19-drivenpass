import cors from "cors";
import express, {json, NextFunction, Request, Response} from "express";
import 'express-async-errors';
import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv"

dotenv.config();

const app = express()
app.use(json());
app.use(cors());
app.use(router);

// Middleware de erro explicitamente definido 
app.use((error: any, req: Request, res: Response, next: NextFunction) => { 
    errorHandler(error, req, res, next);
})

const PORT: number = Number(process.env.PORT) || 5000

app.listen(PORT, () => console.log(`Rodando na porta : ${PORT}`))