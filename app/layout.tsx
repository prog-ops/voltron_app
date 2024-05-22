'use client'
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import client from "@/app/api/client";
import {ApolloProvider} from "@apollo/client";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ApolloProvider client={client}>
            <html lang="en">
            <body className={inter.className}>
            {children}
            </body>
            </html>
        </ApolloProvider>
    );
}
