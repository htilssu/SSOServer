export function passwordValidator(password: string) {

    if (!password || password.length === 0) {
        return "Mật khẩu không được để trống";
    }
    if (password.length < 8) {
        return "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (password.length > 32) {
        return "Mật khẩu không được quá 32 ký tự";
    }
    if (!/[a-z]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất 1 ký tự thường";
    }
    if (!/[A-Z]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất 1 ký tự hoa";
    }
    if (!/[0-9]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất 1 ký tự số";
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt";
    }

    return null;
}

export function confirmPasswordValidator(value: string, values: { password: string }) {
    if (value !== values.password) {
        return "Mật khẩu không khớp";
    }

    return null;
}