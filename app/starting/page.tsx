import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { insertUser, NewUser } from "@/lib/db";

export default function Page() {

  async function register(formData: FormData) {
    'use server';

    const obj = Object.fromEntries(formData.entries());
    console.log(obj);

    const newUser: NewUser = {
      email: formData.get("email") as string,
      name: obj.firstName as string + " " + obj.lastName as string,
      password: obj.password as string,
    }

    const user = await insertUser(newUser);
    console.log(user);
  }

  return <form action={register} className="w-1/4 m-auto flex flex-col items-center gap-y-6">
    <Input type="email" name="email" placeholder="Email" className="text-white"/>
    <Input type="text" name="firstName" placeholder="First Name" className="text-white"/>
    <Input type="text" name="lastName" placeholder="Last Name" className="text-white"/>
    <Input type="password" name="password" placeholder="Password" className="text-white"/>
    <Input type="password" name="confirmedPassword" placeholder="Confirm Password" className="text-white"/>
    <Button type="submit">Sign Up</Button>
  </form>
}