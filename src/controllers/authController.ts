import {Request, Response} from "express";
import { CreateUserData, Auth } from "../Types/userTypes.js";
import * as userService from "../services/userService.js";

export async function signUp(req: Request, res: Response){
    const { email, password } = req.body;
    const userData: CreateUserData = {
        email: email,
        password: password
    }
    await userService.createUser(userData)
    res.status(201).send("Usuário criado")
}

export async function signIn(req: Request, res: Response){
    const { email, password } = req.body;
    const userData: CreateUserData = {
        email: email,
        password: password
    }
    const result: Auth = await userService.signIn(userData)
    res.status(200).send(result)
}
