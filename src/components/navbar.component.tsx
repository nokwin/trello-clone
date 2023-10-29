import Link from "next/link";
import { Button, UserDropdown } from ".";

export function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 mb-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Trello
          </span>
        </Link>
        <div className="flex gap-4">
          <Button size="xsmall" as="a" href="/auth/sign-up">
            Sign Up
          </Button>
          <Button size="xsmall" as="a" href="/auth/sign-in">
            Sign In
          </Button>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
