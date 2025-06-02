"use client";

import { Card, Group, Text, Title, SimpleGrid, Stack } from "@mantine/core";
import {
  IconUsers,
  IconActivity,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";

const stats = [
  {
    title: "Tổng số người dùng",
    value: "1,234",
    icon: IconUsers,
    description: "+12% so với tháng trước",
    color: "blue",
  },
  {
    title: "Hoạt động",
    value: "89%",
    icon: IconActivity,
    description: "+5% so với tháng trước",
    color: "green",
  },
  {
    title: "Cảnh báo",
    value: "12",
    icon: IconAlertCircle,
    description: "Cần xử lý",
    color: "yellow",
  },
  {
    title: "Hoàn thành",
    value: "98%",
    icon: IconCircleCheck,
    description: "Tỷ lệ hoàn thành công việc",
    color: "teal",
  },
];

export default function AdminDashboard() {
  return (
    <Stack>
      <Title order={2}>Dashboard</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.title} withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">
                {stat.title}
              </Text>
              <stat.icon
                size={20}
                color={`var(--mantine-color-${stat.color}-6)`}
              />
            </Group>
            <Text size="xl" fw={700}>
              {stat.value}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              {stat.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
