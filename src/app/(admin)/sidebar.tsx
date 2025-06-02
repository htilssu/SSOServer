"use client";

import {
  Box,
  Text,
  NavLink,
  Stack,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconBuildingStore,
  IconKey,
  IconShield,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuGroups = [
  {
    title: "Tổng quan",
    items: [
      {
        label: "Dashboard",
        icon: IconDashboard,
        description: "Thống kê và báo cáo",
        href: "/admin",
        color: "blue",
      },
      {
        label: "Báo cáo",
        icon: IconReportAnalytics,
        description: "Phân tích dữ liệu",
        href: "/admin/reports",
        color: "cyan",
      },
    ],
  },
  {
    title: "Quản lý",
    items: [
      {
        label: "Người dùng",
        icon: IconUsers,
        description: "Quản lý tài khoản người dùng",
        href: "/admin/users",
        color: "green",
      },
      {
        label: "Đối tác",
        icon: IconBuildingStore,
        description: "Quản lý đối tác",
        href: "/admin/partners",
        color: "teal",
      },
      {
        label: "Dịch vụ",
        icon: IconKey,
        description: "Quản lý dịch vụ",
        href: "/admin/services",
        color: "grape",
      },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      {
        label: "Phân quyền",
        icon: IconShield,
        description: "Quản lý vai trò và quyền",
        href: "/admin/roles",
        color: "violet",
      },
      {
        label: "Cài đặt",
        icon: IconSettings,
        description: "Cấu hình hệ thống",
        href: "/admin/settings",
        color: "gray",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        backgroundColor: dark ? theme.colors.dark[6] : theme.white,
        borderRight: `1px solid ${
          dark ? theme.colors.dark[5] : theme.colors.gray[3]
        }`,
        position: "relative",
      })}
    >
      <Box p="md" sx={{ height: "100%", overflowY: "auto" }}>
        <Stack spacing="xs">
          {menuGroups.map((group) => (
            <Box key={group.title} mb="md">
              <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb={5}>
                {group.title}
              </Text>
              <Stack spacing={0}>
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    component={Link}
                    href={item.href}
                    label={item.label}
                    icon={<item.icon size={18} />}
                    description={item.description}
                    color={item.color}
                    active={pathname === item.href}
                    variant="filled"
                    sx={(theme) => ({
                      borderRadius: theme.radius.sm,
                      marginBottom: theme.spacing.xs / 2,
                    })}
                  />
                ))}
              </Stack>
              {group.title !== menuGroups[menuGroups.length - 1].title && (
                <Divider my="md" color={dark ? "dark.5" : "gray.2"} />
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
