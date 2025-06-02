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
 *  * Created: 3-11-2024
 *  ******************************************************
 */

import { jwtVerify } from "@/service/jwt.service.ts";
import { cookies } from "next/headers";

/**
 * Interface định nghĩa thông tin xác thực người dùng
 */
export interface Auth {
  isAuthenticated: boolean;
  sub: string;
  email: string;
  accountType: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    username?: string;
    roles: string[];
  };
  partner?: {
    id: string;
    name?: string;
    services: Array<{
      id: string;
      name: string;
    }>;
  };
}

/**
 * Lấy thông tin xác thực từ JWT token
 * @returns Promise<Auth | null> - Thông tin xác thực hoặc null nếu không hợp lệ
 */
export async function auth(): Promise<Auth | null> {
  try {
    const cookie = await cookies();
    const token = cookie.get("Token");

    if (!token) return null;

    const payload = await jwtVerify(token.value);
    if (!payload) return null;

    // Kiểm tra tính hợp lệ của payload
    const { sub, email, accountType, user, partner } =
      payload as unknown as Auth;

    if (!sub || !email || !accountType) {
      return null;
    }

    return {
      isAuthenticated: true,
      sub,
      email,
      accountType,
      user: user
        ? {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            roles: user.roles,
          }
        : undefined,
      partner: partner
        ? {
            id: partner.id,
            name: partner.name,
            services: partner.services,
          }
        : undefined,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
