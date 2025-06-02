import { NextRequest, NextResponse } from "next/server";
import { expiredTimeInSecs, jwtSign } from "@/service/jwt.service.ts";
import { verifyPassword } from "@/service/password.service.ts";
import prisma from "@/prisma";
import { removeNullProperties } from "@/util/object.util.ts";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "@/exception/Error.ts";

export type SignInBody = {
  email: string;
  username: string;
  password: string;
  remember: boolean;
};

/**
 * Xử lý đăng nhập người dùng
 * @param request - Request object từ Next.js
 * @returns NextResponse chứa token JWT hoặc lỗi
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignInBody;

    // Tìm tài khoản theo email
    const account = await prisma.account.findFirst({
      where: {
        email: body.email,
      },
      include: {
        Partner: {
          include: {
            PartnerService: true,
            Service: true,
          },
        },
        User: {
          include: {
            UserRole: {
              include: {
                Role: true,
              },
            },
          },
        },
      },
    });

    if (!account) {
      return NextResponse.json(USER_NOT_FOUND, {
        status: 401,
      });
    }

    // Xác thực mật khẩu
    const isValidPassword = await verifyPassword(
      body.password,
      account.password
    );
    if (!isValidPassword) {
      return NextResponse.json(WRONG_PASSWORD, {
        status: 401,
      });
    }

    // Tạo payload cho JWT
    const payload = removeNullProperties({
      sub: account.id,
      email: account.email,
      accountType: account.accountType,
      user: account.User
        ? {
            id: account.User.id,
            firstName: account.User.firstName,
            lastName: account.User.lastName,
            username: account.User.username,
            roles: account.User.UserRole.map((ur) => ur.Role.name),
          }
        : null,
      partner: account.Partner
        ? {
            id: account.Partner.id,
            name: account.Partner.name,
            services: account.Partner.Service.map((s) => ({
              id: s.id,
              name: s.name,
            })),
          }
        : null,
    });

    // Tạo token JWT
    const token = await jwtSign(payload);

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          "Set-Cookie": `Token=${token};Max-Age=${expiredTimeInSecs};Path=/;SameSite=Strict;Secure`,
        },
      }
    );
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
