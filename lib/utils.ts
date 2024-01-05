import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {toast} from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showToast(message: string) {
  "use client";

  toast(message, {
    action: {
      label: "Dismiss",
      onClick: () => {}
    }
  });
}