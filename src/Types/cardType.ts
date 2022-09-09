import {Card} from "@prisma/client"

export type CardData = Omit<Card, "id">;