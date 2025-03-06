// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterRequest, RegisterResponse } from '../types'

import { getSession } from "next-auth/react";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}

// const baseQuery = fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//     prepareHeaders: async (headers) => {
//         const session = await getSession();
//         headers.set("content-type", "application/json");
//         if (session?.accessToken) {
//             headers.set("Authorization", `Bearer ${session.accessToken}`);
//         }
//         return headers;
//     },
// });

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
                headers: { "Content-Type": "application/json" },
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation } = authApi