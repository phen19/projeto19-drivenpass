import * as userRepository from "../repositories/userRepository.js";
import { CreateUserData } from "../Types/userTypes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



async function createUser(CreateUserData: CreateUserData){
    const existingEmail = await userRepository.findByEmail(CreateUserData.email);
    if(existingEmail){
        throw { code: "Conflict", message: "Email already registered"}
    }

    const passwordEncrypted = bcrypt.hashSync(CreateUserData.password, 10);
    const userData:CreateUserData = {
        email: CreateUserData.email,
        password: passwordEncrypted
    }
    await userRepository.createUser(userData);
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

    const secretKey:string | undefined = process.env.JWT_SECRET
    const token:string = jwt.sign({id: existingEmail.id}, secretKey!)
    return { userId: existingEmail.id, token: token}
}

export{
    createUser,
    signIn
}