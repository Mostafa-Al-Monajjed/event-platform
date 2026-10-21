import type { EventItem } from "../types/api";
import type { EventFilters } from "@/services/events";
import { PAGE_LIMIT } from "../lib/constants";

export function eventState(event: EventItem) {
  const isPast = new Date(event.event_date).getTime() < Date.now();
  const isFull =
    event.registrationCount !== undefined &&
    event.registrationCount >= event.max_attendees;
  return { isPast, isFull, canRegister: !isPast && !isFull };
}

export interface FiltersValue {
  search: string;
  type: string;
  dateFrom: string;
  dateTo: string;
}

export const EMPTY_FILTERS: FiltersValue = {
  search: "",
  type: "",
  dateFrom: "",
  dateTo: "",
};

export function buildQuery(f: FiltersValue, page: number): EventFilters {
  return {
    page,
    limit: PAGE_LIMIT,
    search: f.search.trim() || undefined,
    type: f.type || undefined,
    dateFrom: f.dateFrom ? `${f.dateFrom}T00:00:00Z` : undefined,
    dateTo: f.dateTo ? `${f.dateTo}T23:59:59Z` : undefined,
  };
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
