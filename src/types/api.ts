export type Role = "ADMIN" | "USER";
export type EventType = "CONFERENCE" | "WEBINAR" | "WORKSHOP";
export type EducationLevel =
  | "HIGH_SCHOOL"
  | "BACHELORS"
  | "MASTERS"
  | "PHD"
  | "OTHER";
export type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface EventItem {
  id: number;
  name: string;
  description: string;
  max_attendees: number;
  event_date: string;
  event_type: EventType;
  registrationCount?: number; // يأتي من GET /events/{id}، وربما من القوائم
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AttendedEvent {
  event: EventItem;
  registrationStatus: RegistrationStatus;
  attendanceStatus: string;
}

// عدّل هذا الشكل بعد تجربة GET /registrations/event/{id} في Postman
export interface Registration {
  id: number;
  status: RegistrationStatus;
  linkedinProfile?: string | null;
  educationLevel?: EducationLevel | null;
  motivation?: string | null;
  user?: { id?: number; firstName?: string; lastName?: string; email?: string };
}

export interface RegistrationsPage {
  attendees: Registration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RegisterEventInput {
  linkedinProfile?: string;
  educationLevel?: EducationLevel;
  motivation?: string;
}

export interface CreateEventInput {
  name: string;
  description: string;
  max_attendees: number;
  event_date: string;
  event_type: EventType;
}
