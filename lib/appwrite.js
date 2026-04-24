import { Client, Account, Avatars, Databases } from "appwrite";

export const client = new Client();

client
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ENDPOINT)

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)