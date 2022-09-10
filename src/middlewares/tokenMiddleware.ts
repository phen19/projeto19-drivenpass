import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function tokenValidationMiddleware(req:Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();

    if(!token){
        throw {code: 'Unauthorized', message: 'Token must been sent'}
    }

        const secretKey:string | undefined= process.env.JWT_SECRET;
        const id:string|JwtPayload = jwt.verify(token, secretKey!);
        res.locals.id = id;
        next();
  
}