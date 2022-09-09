import {prisma} from "../database/database.js"
import { CreateUserData } from "../Types/userTypes"
  
async function findByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email },
  });
}

async function findById(id: number){
  return prisma.users.findFirst({
    where:{id}
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