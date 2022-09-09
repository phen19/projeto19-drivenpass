import {prisma} from "../database/database.js"
import { CreateUserData } from "../Types/userTypes"
  
async function findByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email },
  });
}

async function findById(userId: number){
  return prisma.users.findFirst({
    where:{id:userId}
  })
}
  
async function createUser(createUserData: CreateUserData) {
  await prisma.users.create({
    data: createUserData,
  });
}

export{
  findById,
  findByEmail,
  createUser,
};