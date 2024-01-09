"use client";
import { NavBar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFileAction } from "@/lib/actions";
import { PutBlobResult } from "@vercel/blob";
import { useState } from "react";

export default function App() {
  const uploadFile = async (formData: FormData) => {
    const file = formData.get("picture") as File;
    if (!file) {
      return;
    }

    const blob = await uploadFileAction(formData);
    if (!blob) {
      return;
    }

    setBlob(blob);
  };

  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form action={uploadFile}>
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" name="picture" />
        <Button type="submit">Submit</Button>
      </form>
      <div>{blob && blob.url}</div>
    </div>
  );
}
