/*
 * ******************************************************
 *  * Copyright (c) 2024 htilssu
 *  *
 *  * This code is the property of htilssu. All rights reserved.
 *  * Redistribution or reproduction of any part of this code
 *  * in any form, with or without modification, is strictly
 *  * prohibited without prior written permission from the author.
 *  *
 *  * Author: htilssu
 *  * Created: 27-10-2024
 *  ******************************************************
 */

import { MantineProvider } from "@mantine/core";
import { Rubik } from "next/font/google";
import React from "react";

import type { Metadata } from "next";
import AdminShell from "./AdminShell";
import "@/app/globals.css";
import "@mantine/core/styles.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SSO Server",
  description: "SSO Server for authentication and authorization",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <MantineProvider>
          <AdminShell>{children}</AdminShell>
        </MantineProvider>
      </body>
    </html>
  );
}
