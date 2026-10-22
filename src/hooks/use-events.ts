import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { eventsService, type EventFilters } from "../services/events";
import { registrationsService } from "../services/registrations";
import { getErrorMessage } from "../lib/errors";
import type { RegisterEventInput } from "../types/api";

export const useUpcomingEvents = (f: EventFilters) =>
  useQuery({
    queryKey: ["events", "upcoming", f],
    queryFn: () => eventsService.upcoming(f),
    placeholderData: keepPreviousData,
  });

export const useAdminEvents = (f: EventFilters) =>
  useQuery({
    queryKey: ["events", "admin", f],
    queryFn: () => eventsService.all(f),
    placeholderData: keepPreviousData,
  });

export const useEvent = (id: number) =>
  useQuery({
    queryKey: ["event", id],
    queryFn: () => eventsService.byId(id),
    enabled: Number.isFinite(id),
    retry: false,
  });

export const useAttended = () =>
  useQuery({ queryKey: ["attended"], queryFn: eventsService.attended });

export function useCreateEvent(onDone?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsService.create,
    onSuccess: () => {
      toast.success("Event created");
      qc.invalidateQueries({ queryKey: ["events"] });
      onDone?.();
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsService.remove,
    onSuccess: () => {
      toast.success("Event deleted");
      qc.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useRegisterForEvent(eventId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: RegisterEventInput) =>
      registrationsService.register(eventId, body),
    onSuccess: () => {
      toast.success("Registration submitted. Waiting for approval.");
      qc.invalidateQueries({ queryKey: ["attended"] });
      qc.invalidateQueries({ queryKey: ["event", eventId] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export const useEventRegistrations = (eventId: number, page: number) =>
  useQuery({
    queryKey: ["registrations", eventId, page],
    queryFn: () => registrationsService.listByEvent(eventId, page),
    placeholderData: keepPreviousData,
    enabled: Number.isFinite(eventId),
  });

export function useApproveRegistration(eventId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: registrationsService.approve,
    onSuccess: () => {
      toast.success("Registration approved");
      qc.invalidateQueries({ queryKey: ["registrations", eventId] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
