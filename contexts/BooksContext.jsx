import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "appwrite";
import { useUser } from '../hooks/useUser'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID

export const BooksContext = createContext()

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([])
    const { user } = useUser()

    async function fetchBooks() {
        try {
            
        } catch (error) {
            console.error(error.message)
        }
    }

    async function fetchBookById(id) {
        try {
            
        } catch (error) {
            console.error(error.message)
        }
    }

    async function createBook(data) {
        try {
            const newBook = await databases.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {...data, userId: user.$id},
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            )
        } catch (error) {
            console.error(error.message)
        }
    }

    async function deleteBook(id) {
        try {
            
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <BooksContext.Provider
            value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
        >
            {children}
        </BooksContext.Provider>
    )
}