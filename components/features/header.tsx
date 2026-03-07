"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedThemeToggler } from "../ui";
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 ">
      <div className="px-4 py-2 flex w-full items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.png" alt="Artist Network" width={120} height={40} />
        </Link>
        <div className="flex items-center gap-4">
          {/* <AnimatedThemeToggler /> */}
          <Menu className="size-12 text-foreground cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
