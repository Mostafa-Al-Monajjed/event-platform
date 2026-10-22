import { api } from "@/lib/api";
import type { Gender } from "@/types/api";

export const authService = {
  login: (body: { email: string; password: string }) =>
    api
      .post<{ message: string; access_token: string }>("/auth/login", body)
      .then((r) => r.data),

  register: (body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    gender: Gender;
  }) => api.post("/auth/register", body).then((r) => r.data),
};
