"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const user = useAppSelector((state: RootState) => state.userSlice.user);
  console.log(user);
  return (
    <main className="overflow-hidden bg-blue-100 min-h-[95vh]">
      <h1 className="text-black">Landing page</h1>
      <Link href="/login">
        <Button variant="outline">Button</Button>
      </Link>
    </main>
  );
}
