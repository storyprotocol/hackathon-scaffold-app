"use client";
import CreateIPOBtn from "@/components/CreateIPOBtn";
import useCreateIpOrg from "@/hooks/useCreateIpOrg";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useAccount } from "wagmi";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-2">
        <ConnectKitButton />

        <CreateIPOBtn />
      </div>
    </main>
  );
}
