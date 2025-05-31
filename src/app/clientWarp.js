"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import Navigation from "./components/Navigation";

const ClientWrapper = ({ children }) => {

  return (
    <SessionProvider>
      {children}

    </SessionProvider>
  );
};

export default ClientWrapper;