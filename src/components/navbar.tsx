import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav
      className={cn(
        "flex justify-between items-center border-b border-border h-[60px] px-4 py-2"
      )}
    >
      <Link
        href="/"
        className={cn(
          "font-bold md:text-3xl text-xl main-color",
          "text-transparent bg-clip-text hover:cursor-pointer"
        )}
      >
        NextJs Forms
      </Link>
      <header className={cn("flex justify-center items-center gap-8")}>
        <Link
          href="/forms"
          className={cn(
            "text-white bg-indigo-400",
            "hover:bg-gradient-to-l focus:ring-4 focus:outline-none",
            "font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          )}
        >
          View Forms
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>
    </nav>
  );
};

export default Navbar;
