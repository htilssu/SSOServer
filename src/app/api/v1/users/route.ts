import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { auth } from "@/service/auth.service";
import { Prisma } from "@prisma/client";

/**
 * GET /api/v1/users
 * Lấy danh sách người dùng với phân trang và tìm kiếm
 * @param request - Request object từ Next.js
 * @returns NextResponse chứa danh sách người dùng hoặc lỗi
 */
export async function GET(request: Request) {
  try {
    // Xác thực và kiểm tra quyền admin
    const authInfo = await auth();
    if (!authInfo || !authInfo.user?.roles.includes("admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Lấy các tham số từ URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    // Xây dựng điều kiện tìm kiếm
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { phoneNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    // Lấy tổng số bản ghi
    const total = await prisma.user.count({ where });

    // Lấy danh sách người dùng
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        phoneNumber: true,
        avatar: true,
        dob: true,
        createdAt: true,
        updatedAt: true,
        Account: {
          select: {
            email: true,
            accountType: true,
          },
        },
        UserRole: {
          select: {
            Role: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
