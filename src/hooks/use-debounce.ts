import { useEffect, useState } from "react";

/**
 * Hook để trì hoãn việc cập nhật giá trị
 * @param value Giá trị cần trì hoãn
 * @param delay Thời gian trì hoãn (ms)
 * @returns Giá trị sau khi trì hoãn
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
