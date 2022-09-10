import {Wifi} from "@prisma/client";

export type WifiData = Omit<Wifi, "id">;

export type ResultWifi = Partial<Wifi>