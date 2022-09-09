import {prisma} from "../database/database.js"
import { CreateUserData } from "../services/userService.js"

async function findAll() {
    return prisma.users.findMany();
}
  
async function findByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email },
  });
}
  
async function insert(createUserData: CreateUserData) {
  await prisma.users.create({
    data: createUserData,
  });
}

export{
  findAll,
  findByEmail,
  insert,
};