import Link from "next/link";
import { UserDropdown } from "./user-dropdown.component";

export function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Trello
          </span>
        </Link>
        <UserDropdown />
      </div>
    </nav>
  );
}
