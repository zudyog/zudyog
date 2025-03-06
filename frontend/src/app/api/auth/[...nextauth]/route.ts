import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
    id: string;
    access_token: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing username or password");
                }

                try {
                    const formData = new URLSearchParams();
                    formData.append("username", credentials.username);
                    formData.append("password", credentials.password);
                    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/token";
                    const res = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: formData,
                    });

                    if (!res.ok) throw new Error("Invalid credentials");

                    const user: User = await res.json();
                    return { ...user, id: user.id };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.accessToken = (user as User).access_token;
            return token;
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    // secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
