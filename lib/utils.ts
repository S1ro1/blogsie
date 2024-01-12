import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import {put, PutBlobResult} from "@vercel/blob";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showToast(message: string) {
  "use client";

  toast(message, {
    action: {
      label: "Dismiss",
      onClick: () => {},
    },
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

    textarea.value =
      textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
};

export class DefaultDict<T, Q> extends Map<T, Q> {
  defaultFactory: () => Q;

  constructor(defaultFactory: () => Q) {
    super();
    this.defaultFactory = defaultFactory;
  }

  get(name: T): Q {
    if (this.has(name)) {
      return super.get(name)!;
    } else {
      const value = this.defaultFactory();
      this.set(name, value);
      return value;
    }
  }
}
