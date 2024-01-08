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

export const enableTab = (e: any) => {
  if (e.key == "Tab") {
    e.preventDefault();
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === null || end === null) {
      return;
    }

    textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
}

