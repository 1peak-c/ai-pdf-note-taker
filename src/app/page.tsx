"use client"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.use.createUser)

  useEffect(() => {
    if (user) {
      createUser({
        userName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        imageUrl: user.imageUrl || ""
      })
    }
  }, [user])
  return (
    <div>
      <h1>Hello World</h1>
      <Button variant="destructive">Button</Button>
      <UserButton />
    </div >
  );
}
