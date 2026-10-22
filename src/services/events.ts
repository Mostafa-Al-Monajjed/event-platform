import { api } from "../lib/api";
import type {
  AttendedEvent,
  CreateEventInput,
  EventItem,
  Paginated,
} from "@/types/api";

export interface EventFilters {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
}

const clean = (f: EventFilters) =>
  Object.fromEntries(
    Object.entries(f).filter(([, v]) => v !== undefined && v !== ""),
  );

export const eventsService = {
  upcoming: (f: EventFilters) =>
    api
      .get<Paginated<EventItem>>("/events/upcoming", { params: clean(f) })
      .then((r) => r.data),
  all: (f: EventFilters) =>
    api
      .get<Paginated<EventItem>>("/events", { params: clean(f) })
      .then((r) => r.data),
  byId: (id: number) => api.get<EventItem>(`/events/${id}`).then((r) => r.data),
  attended: () =>
    api
      .get<{ events: AttendedEvent[] }>("/events/attended")
      .then((r) => r.data.events),
  create: (body: CreateEventInput) =>
    api.post("/events", body).then((r) => r.data),
  remove: (id: number) => api.delete(`/events/${id}`).then((r) => r.data),
};
