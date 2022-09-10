import {Credential} from "@prisma/client"

export type CredentialData = Omit<Credential, "id">
export type ResultCredential = Partial<Credential>
