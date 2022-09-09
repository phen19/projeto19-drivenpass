import {Users} from "@prisma/client";
import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type CreateUserData = Omit<Users, "id">;

async function insert(CreateUserData: CreateUserData){
    const existingEmail = await userRepository.findByEmail(CreateUserData.email);
    if(!existingEmail){
        throw { code: "Conflict", message: "Email already registered"}
    }

    await userRepository.insert(CreateUserData);
}

async function signIn(CreateUserData: CreateUserData){
    const existingEmail = await userRepository.findByEmail(CreateUserData.email);
    if(!existingEmail){
        throw { code: "Unauthorized", message: "Incorrect e-mail and/or password"}
    }
    const checkPassword = bcrypt.compareSync(CreateUserData.password, existingEmail.password);
    if(!checkPassword){
        throw { code: "Unauthorized", message: "Incorrect e-mail and/or password"}
    }

    const secretKey:string = process.env.JWT_SECRET
    const token:string = jwt.sign({id: existingEmail.id}, secretKey)
    return token
}

export{
    insert,
    signIn
}