import {Users} from "@prisma/client";

export type CreateUserData = Omit<Users, "id">;
export type Auth = {userId: number, token: string}