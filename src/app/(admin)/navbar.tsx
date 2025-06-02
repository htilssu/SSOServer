"use client";

import {
  Burger,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Text,
  Avatar,
  Menu,
  UnstyledButton,
  Box,
  Container,
  Flex,
} from "@mantine/core";
import {
  IconSun,
  IconMoonStars,
  IconUser,
  IconLogout,
  IconSettings,
  IconChevronDown,
} from "@tabler/icons-react";
import React from "react";

interface NavbarProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

export default function Navbar({ opened, setOpened }: NavbarProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Box>
      <Container fluid px="md">
        <Flex justify="space-between" align="center">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              size="sm"
              color={dark ? "white" : "black"}
            />
            <Text fw={700} size="lg">
              SSO Admin
            </Text>
          </Group>

          <Group>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Chuyển đổi chế độ sáng/tối"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>

            <Menu width={200} position="bottom-end" shadow="md" withArrow>
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar
                      src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                      radius="xl"
                      size="sm"
                    />
                    <Text size="sm" fw={500}>
                      Admin
                    </Text>
                    <IconChevronDown size={14} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Tài khoản</Menu.Label>
                <Menu.Item icon={<IconUser size={14} />}>Hồ sơ</Menu.Item>
                <Menu.Item icon={<IconSettings size={14} />}>Cài đặt</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" icon={<IconLogout size={14} />}>
                  Đăng xuất
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
}
