'use client'
import client from "@/app/api/client";
import {ApolloProvider} from "@apollo/client";
import Main from "@/app/components/Main";

export default function Home() {
    return (
        <ApolloProvider client={client}>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Main/>
            </main>
        </ApolloProvider>
    );
}
