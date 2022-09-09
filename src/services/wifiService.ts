import * as wifiRepository from "../repositories/wifiRepository.js"
import { userCheck } from "../utils/utils.js"
import { WifiData } from "../Types/wifiType.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(process.env.SECRET_KEY)

async function getWifisByUserId(userId:number){
    await userCheck(userId)
    return await wifiRepository.getWifisByUserId(userId)
}

async function getWifiById(id:number, userId:number){
    const result = await validateWifi(id, userId)
    result.password = cryptr.decrypt(result.password)
    return result
}

async function createWifi(wifi: WifiData){
    const wifiData:WifiData ={
        networkName: wifi.networkName,
        title: wifi.title,
        password: cryptr.encrypt(wifi.password),
        userId: wifi.userId
    }

    await wifiRepository.createWifi(wifiData)
}

async function deleteWifi(id:number, userId:number){
    await validateWifi(id, userId)
    await wifiRepository.deleteWifi(id)
}

async function validateWifi(id:number, userId:number){
    const result = await wifiRepository.getWifiById(id)
    if(!result){
        throw {code: "NotFound", message: "Wifi not found"}
    }
    if(result.userId !== userId){
        throw {code: "Unauthorized", message: "Wifi does not belong to this user"}
    }

    return result
}

export {
    getWifisByUserId,
    getWifiById,
    createWifi,
    deleteWifi
}