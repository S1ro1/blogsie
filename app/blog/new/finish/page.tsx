"use client";
import { FinishPostForm } from "@/components/forms/finish-post-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-6 w-1/2 px-4">
      <h1 className="font-extrabold text-3xl tracking-tight">
        Help people see your blog by providing additional information
      </h1>
      <FinishPostForm />
    </div>
  );
}
