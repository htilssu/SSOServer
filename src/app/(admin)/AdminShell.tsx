"use client";

import { AppShell } from "@mantine/core";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      style={{
        minHeight: "100vh",
      }}
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { desktop: !opened, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Navbar opened={opened} setOpened={setOpened} />
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
