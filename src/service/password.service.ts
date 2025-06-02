import bcrypt from "bcryptjs";
import prisma from "@/prisma.ts";

const saltRounds = 10;

/**
 * Hash mật khẩu sử dụng bcryptjs
 * @param password - Mật khẩu cần hash
 * @returns Promise<string> - Mật khẩu đã được hash
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Xác thực mật khẩu với hash đã lưu
 * @param password - Mật khẩu cần xác thực
 * @param hash - Hash đã lưu
 * @returns Promise<boolean> - Kết quả xác thực
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Thay đổi mật khẩu cho tài khoản
 * @param accountId - ID của tài khoản
 * @param password - Mật khẩu mới
 */
export async function changePassword(accountId: string, password: string) {
  const account = await prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      password: await hashPassword(password),
    },
  });
}

/**
 * Gửi yêu cầu thay đổi mật khẩu
 * @param password - Mật khẩu mới
 */
export async function changePasswordRequest(password: string) {
  const res = fetch("/v1/password/new");
}
