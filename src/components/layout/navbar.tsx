"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
  const router = useRouter();
  const { token, role, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/events" className="text-lg font-bold">
          EventHub
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {mounted && token ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/events">Events</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/my-registrations">My registrations</Link>
              </Button>
              {role === "ADMIN" && (
                <Button asChild variant="ghost" size="sm">
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            mounted && (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
