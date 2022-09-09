import { prisma } from "../database/database.js";
import { WifiData } from "../Types/wifiType.js";

async function getWifisByUserId (userId:number){
    return prisma.wifi.findMany({
        where:{userId}
    })
}

async function getWifiById(id:number) {
    return prisma.wifi.findUnique({
        where:{id}
    })
}

async function createWifi(wifi: WifiData){
    await prisma.wifi.create({
        data:wifi
    })
}

async function deleteWifi(id:number){
    await prisma.wifi.delete({
        where:{id}
    })
}

export {
    getWifisByUserId,
    getWifiById,
    createWifi,
    deleteWifi
}