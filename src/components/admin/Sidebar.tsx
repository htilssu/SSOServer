"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Settings, LogOut, Home } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    name: "Quản lý người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg px-4 py-2 transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-700 p-4">
        <button className="flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
