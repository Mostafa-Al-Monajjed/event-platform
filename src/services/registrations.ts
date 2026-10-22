import { api } from "../lib/api";
import type { RegisterEventInput, RegistrationsPage } from "@/types/api";

export const registrationsService = {
  register: (eventId: number, body: RegisterEventInput) =>
    api.post(`/registrations/${eventId}`, body).then((r) => r.data),
  approve: (id: number) =>
    api.patch(`/registrations/${id}/approve`).then((r) => r.data),
  listByEvent: (eventId: number, page: number, limit = 10) =>
    api
      .get<RegistrationsPage>(`/registrations/event/${eventId}`, {
        params: { page, limit },
      })
      .then((r) => r.data),
};
