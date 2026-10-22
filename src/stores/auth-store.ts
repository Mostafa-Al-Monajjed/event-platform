import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import type { Role } from "@/types/api";

interface JwtPayload {
  role?: Role;
  sub?: string | number;
  email?: string;
}

interface AuthState {
  token: string | null;
  role: Role | null;
  login: (token: string) => Role;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      login: (token) => {
        const payload = jwtDecode<JwtPayload>(token);
        // لو اسم الحقل مختلف، افحص التوكن في jwt.io وعدّل هنا
        const role: Role = payload.role ?? "USER";
        Cookies.set("token", token, { sameSite: "strict", expires: 7 });
        Cookies.set("role", role, { sameSite: "strict", expires: 7 });
        set({ token, role });
        return role;
      },
      logout: () => {
        Cookies.remove("token");
        Cookies.remove("role");
        set({ token: null, role: null });
      },
    }),
    { name: "auth" },
  ),
);
