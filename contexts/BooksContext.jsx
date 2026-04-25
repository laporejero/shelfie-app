import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "appwrite";
import { useUser } from '../hooks/useUser'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID

export const BooksContext = createContext()

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([])
    const { user } = useUser()

    async function fetchBooks() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                TABLE_ID,
                [
                    Query.equal('userId', user.$id)
                ]
            )

            setBooks(response.documents)
            console.log(response.documents)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function fetchBookById(id) {
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                TABLE_ID,
                id
            )

            return response
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

    // useEffect(() => {
    //     let unsubscribe
    //     const channel = `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents`

    //     if (user) {
    //         fetchBooks()

    //         unsubscribe = client.subscribe(channel, (response) => {
    //             const { payload, events } = response

    //             if (events[0].includes('create')) {
    //                 setBooks((prevBooks) => [...prevBooks, payload])
    //             }
    //         })
    //     } else {
    //         setBooks([])
    //     }

    //     return () => {
    //         if (unsubscribe) unsubscribe()
    //     }

    // }, [user])

    useEffect(() => {
        if (!user) {
            setBooks([]);
            return;
        }

        fetchBooks();

        const channel = `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents`;

        const unsubscribe = client.subscribe(channel, (response) => {
            console.log("Realtime:", response);

            if (response.events.some(e => e.includes('.create'))) {
                fetchBooks();
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user]);

    return (
        <BooksContext.Provider
            value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
        >
            {children}
        </BooksContext.Provider>
    )
}