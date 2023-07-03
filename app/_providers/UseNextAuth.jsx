"use client"
import React from "react"

import { SessionProvider } from "next-auth/react";

export const UseNextAuth = ({ children }) => (
    <SessionProvider>
        {children}
    </SessionProvider>
);