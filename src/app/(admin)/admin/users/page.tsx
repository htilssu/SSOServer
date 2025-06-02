"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "../../../../hooks/use-debounce";
import {
  TextInput,
  Button,
  Table,
  Group,
  Title,
  Paper,
  Select,
  Badge,
  ActionIcon,
  Pagination,
  Text,
  Skeleton,
  Center,
  Box,
  Checkbox,
  Modal,
  Notification,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconFilter,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { deleteUsers } from "./actions";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  phoneNumber?: string;
  avatar?: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  Account: {
    email: string;
    accountType: string;
  }[];
  UserRole: {
    Role: {
      name: string;
      description: string;
    };
  }[];
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function UsersPage() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 500);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
      });

      const response = await fetch(`/api/v1/users?${params}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const getRoleBadge = (roles: { Role: { name: string } }[]) => {
    const roleNames = roles.map((ur) => ur.Role.name);
    return (
      <Group gap="xs">
        {roleNames.map((role, index) => (
          <Badge key={index} color={role === "admin" ? "blue" : "gray"}>
            {role}
          </Badge>
        ))}
      </Group>
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const result = await deleteUsers(selectedUsers);

      if (result.success) {
        setNotification({
          type: "success",
          message: `Đã xóa ${selectedUsers.length} người dùng`,
        });
        setSelectedUsers([]);
        fetchUsers();
      } else {
        setNotification({
          type: "error",
          message: result.error || "Không thể xóa người dùng",
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Đã có lỗi xảy ra",
      });
    }
    close();
  };

  const renderContent = () => {
    if (loading) {
      return <Skeleton height={400} radius="md" />;
    }

    if (users.length === 0) {
      return (
        <Center p="xl">
          <Text size="lg" c="dimmed">
            Không tìm thấy người dùng
          </Text>
        </Center>
      );
    }

    return (
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                checked={selectedUsers.length === users.length}
                onChange={(event) =>
                  handleSelectAll(event.currentTarget.checked)
                }
              />
            </Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Tên</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Vai trò</Table.Th>
            <Table.Th>Loại tài khoản</Table.Th>
            <Table.Th>Ngày tạo</Table.Th>
            <Table.Th style={{ textAlign: "right" }}>Hành động</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onChange={(event) =>
                    handleSelectUser(user.id, event.currentTarget.checked)
                  }
                />
              </Table.Td>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{`${user.firstName} ${user.lastName}`}</Table.Td>
              <Table.Td>{user.Account[0]?.email || "-"}</Table.Td>
              <Table.Td>{getRoleBadge(user.UserRole)}</Table.Td>
              <Table.Td>{user.Account[0]?.accountType || "-"}</Table.Td>
              <Table.Td>
                {new Date(user.createdAt).toLocaleDateString()}
              </Table.Td>
              <Table.Td>
                <Group justify="flex-end">
                  <ActionIcon variant="subtle">
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon variant="subtle">
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => {
                      setSelectedUsers([user.id]);
                      open();
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  };

  return (
    <Box p="md">
      {notification && (
        <Notification
          color={notification.type === "success" ? "green" : "red"}
          title={notification.type === "success" ? "Thành công" : "Lỗi"}
          icon={
            notification.type === "success" ? (
              <IconCheck size={16} />
            ) : (
              <IconX size={16} />
            )
          }
          onClose={() => setNotification(null)}
          mb="md"
        >
          {notification.message}
        </Notification>
      )}

      <Group justify="space-between" mb="md">
        <Title order={2}>Quản lý người dùng</Title>
        <Group>
          {selectedUsers.length > 0 && (
            <Button
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={open}
            >
              Xóa ({selectedUsers.length})
            </Button>
          )}
          <Button leftSection={<IconPlus size={16} />}>Thêm người dùng</Button>
        </Group>
      </Group>

      <Group mb="md">
        <TextInput
          placeholder="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ flex: 1 }}
          leftSection={<IconSearch size={16} />}
        />
      </Group>

      <Paper withBorder p={0} mb="md">
        {renderContent()}
      </Paper>

      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          Hiển thị{" "}
          {pagination.total === 0
            ? 0
            : (pagination.page - 1) * pagination.limit + 1}{" "}
          đến {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
          của {pagination.total} kết quả
        </Text>
        <Pagination
          total={pagination.totalPages}
          value={pagination.page}
          onChange={handlePageChange}
        />
      </Group>

      <Modal opened={opened} onClose={close} title="Xác nhận xóa" centered>
        <Text mb="md">
          Bạn có chắc chắn muốn xóa {selectedUsers.length} người dùng đã chọn?
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Hủy
          </Button>
          <Button color="red" onClick={handleDeleteSelected}>
            Xóa
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
