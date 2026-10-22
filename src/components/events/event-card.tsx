import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { eventState, formatDate } from "../../lib/event-utils";
import type { EventItem } from "../../types/api";

const typeStyle: Record<string, string> = {
  CONFERENCE:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  WEBINAR: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
  WORKSHOP:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
};

const barStyle: Record<string, string> = {
  CONFERENCE: "border-t-indigo-500",
  WEBINAR: "border-t-sky-500",
  WORKSHOP: "border-t-amber-500",
};

export function EventCard({ event }: { event: EventItem }) {
  const { isPast, isFull } = eventState(event);
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <Card
        className={`h-full overflow-hidden border-t-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ${
          barStyle[event.event_type] ?? "border-t-indigo-500"
        } ${isPast ? "opacity-60 grayscale" : ""}`}
      >
        <CardHeader>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="secondary" className={typeStyle[event.event_type]}>
              {event.event_type}
            </Badge>
            {isPast && <Badge variant="destructive">Past</Badge>}
            {isFull && !isPast && <Badge variant="destructive">Full</Badge>}
          </div>
          <CardTitle className="text-lg transition-colors group-hover:text-primary">
            {event.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p className="line-clamp-2">{event.description}</p>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="size-4 text-primary" />
            <span>Capacity: {event.max_attendees}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
