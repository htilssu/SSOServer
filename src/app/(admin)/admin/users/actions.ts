"use server";

import prisma from "@/prisma";
import { checkAdminAuth } from "@/util/auth.util";
import { revalidatePath } from "next/cache";

/**
 * Xóa nhiều người dùng
 * @param userIds - Mảng ID của người dùng cần xóa
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function deleteUsers(userIds: string[]) {
  try {
    // Kiểm tra quyền admin
    const authCheck = await checkAdminAuth();
    if (!authCheck.success) {
      return authCheck;
    }

    // Xóa người dùng
    await prisma.user.deleteMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    // Revalidate path để cập nhật UI
    revalidatePath("/admin/users");

    return { success: true };
  } catch (error) {
    console.error("Error deleting users:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
