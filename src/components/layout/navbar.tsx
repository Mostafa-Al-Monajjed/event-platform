"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/layout/theme-toggle";
import { useAuthStore } from "../../stores/auth-store";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { token, role, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const navLink = (href: string, label: string) => (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      variant={pathname.startsWith(href) ? "secondary" : "ghost"}
      size="sm"
    >
      {label}
    </Button>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link
          href="/events"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30">
            <CalendarDays className="size-4" />
          </span>

          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            EventHub
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {mounted && token ? (
            <>
              {navLink("/events", "Events")}
              {navLink("/my-registrations", "My registrations")}
              {role === "ADMIN" && navLink("/admin", "Admin")}

              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            mounted && (
              <>
                <Button
                  render={<Link href="/login" />}
                  nativeButton={false}
                  variant="ghost"
                  size="sm"
                >
                  Login
                </Button>

                <Button
                  render={<Link href="/register" />}
                  nativeButton={false}
                  size="sm"
                >
                  Register
                </Button>
              </>
            )
          )}

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
