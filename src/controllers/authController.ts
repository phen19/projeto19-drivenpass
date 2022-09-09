import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import * as userService from "../services/userService.js";

export async function signUp(req: Request, res: Response){
    const { email, password } = req.body;
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    const userData: userService.CreateUserData = {
        email: email,
        password: passwordEncrypted
    }
    await userService.insert(userData)
    res.status(201).send("Usuário criado")
}

export async function signIn(req: Request, res: Response){
    const { email, password } = req.body;
    const userData: userService.CreateUserData = {
        email: email,
        password: password
    }
    const result:string = await userService.signIn(userData)
    res.status(200).send(result)
}

export async function teste( req: Request, res: Response){
    const {id} = res.locals.id
    console.log(id)
    res.status(200).send("ok")
}