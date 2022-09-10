import {Documents} from "@prisma/client";

export type DocumentsData = Omit<Documents, "id">;