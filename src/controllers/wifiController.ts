import { Request, Response } from "express";
import { WifiData } from "../Types/wifiType.js";
import * as wifiService from "../services/wifiService.js"

export async function getWifis(req: Request, res: Response){
    const userId:number = res.locals.userId
    const result = await wifiService.getWifisByUserId(userId)
    res.status(200).send(result)
}

export async function getWifiById(req: Request, res: Response){
    const id: number=parseInt(req.params.id)
    const userId: number=res.locals.userId
    const result = await wifiService.getWifiById(id, userId)
    res.status(200).send(result)
}

export async function createWifi(req:Request, res: Response) {
    const {networkName, title, password} = req.body
    const userId:number = res.locals.userId
    const wifi:WifiData = {
        networkName,
        title,
        password,
        userId
    }
    await wifiService.createWifi(wifi)
    res.status(201).send("wifi created")
}

export async function deleteWifi(req: Request, res: Response){
    const id:number = parseInt(req.params.id)
    const userId:number= res.locals.userId

    await wifiService.deleteWifi(id, userId)
    res.status(204).send("deleted")
}