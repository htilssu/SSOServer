import { auth } from "@/service/auth.service";

/**
 * Kiểm tra người dùng có phải là admin không
 * @returns Promise<boolean> - true nếu là admin, false nếu không
 */
export async function isAdmin(): Promise<boolean> {
  const authInfo = await auth();
  return !!authInfo?.user?.roles.includes("admin");
}

/**
 * Kiểm tra và trả về thông tin xác thực của admin
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function checkAdminAuth(): Promise<{
  success: boolean;
  error?: string;
}> {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) {
    return { success: false, error: "Unauthorized" };
  }
  return { success: true };
}
