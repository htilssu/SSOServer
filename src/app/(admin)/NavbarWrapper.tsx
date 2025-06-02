"use client";

import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const [opened, { toggle }] = useDisclosure();

  return <Navbar opened={opened} toggle={toggle} />;
}
