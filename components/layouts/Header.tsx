import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyApp
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="outline" className="text-white border-white">
          <Link href="/login" className="text-2xl font-bold">
            MyApp
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
