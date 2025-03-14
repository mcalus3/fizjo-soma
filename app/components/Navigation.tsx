"use client";

import { useContent } from "@/app/hooks/useContent";
import { Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navigation() {
  const { content } = useContent("pl");
  const pathname = usePathname();

  return (
    <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-bold text-xl text-primary">
            {content.navigation.brand}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {content.navigation.links.map((link, index) => (
            <Link
              prefetch
              key={index}
              href={link.href}
              className={`text-sm font-medium relative px-4 py-2 transition-all rounded-md hover:bg-gray-100 ${
                pathname === link.href
                  ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
                  : ""
              }`}
            >
              {link.text}
            </Link>
          ))}
          <KontaktLink
            pathname={pathname}
            content={content.navigation.contactButton}
          />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="flex flex-col space-y-4">
                {content.navigation.links.map((link, index) => (
                  <Link
                    prefetch
                    key={index}
                    href={link.href}
                    className="text-sm font-medium px-4 py-2 transition-all rounded-md hover:bg-gray-100"
                  >
                    {link.text}
                  </Link>
                ))}
                <Link
                  href="/#kontakt"
                  className='text-sm font-medium px-4 py-2 transition-all rounded-md hover:bg-gray-100 "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"'
                >
                  {content.navigation.contactButton}
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}

type KontaktLinkProps = {
  pathname: string;
  content: string;
  className?: string;
};

export function KontaktLink({
  pathname,
  content,
  className = "border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition-colors",
}: KontaktLinkProps) {
  return (
    <Link
      href={pathname === "/" ? "#kontakt" : "/#kontakt"}
      className={className}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          document
            .getElementById("kontakt")
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      {content}
    </Link>
  );
}
