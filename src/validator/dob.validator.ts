export const maxAge = 100;
export const minAge = 18;

export function isEighteenOrOlder(date: string | Date): boolean {
    if (typeof date === "string") {
        date = new Date(date);
    }

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    return date <= eighteenYearsAgo;
}

export function dobValidator(data: string | Date) {
    if (!isEighteenOrOlder(data)) {
        return "Bạn phải đủ 18 tuổi trở lên";
    }

    return null;
}