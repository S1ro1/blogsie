import { auth } from "@/auth";
import { EditUserForm } from "@/components/forms/edit-user-form";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function Component() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (!session.user) {
    redirect("/auth/signin");
  }

  return (
    <div key="1" className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Edit User Information</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Update your profile details below
        </p>
      </div>
      <SessionProvider session={session}>
        <EditUserForm />
      </SessionProvider>
    </div>
  );
}
