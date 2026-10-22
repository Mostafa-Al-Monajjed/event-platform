import Link from "next/link";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { eventState, formatDate } from "../../lib/event-utils";
import type { EventItem } from "../../types/api";

export function EventCard({ event }: { event: EventItem }) {
  const { isPast, isFull } = eventState(event);
  return (
    <Link href={`/events/${event.id}`} className="block">
      <Card
        className={`h-full transition hover:shadow-md ${isPast ? "opacity-60" : ""}`}
      >
        <CardHeader>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="secondary">{event.event_type}</Badge>
            {isPast && <Badge variant="destructive">Past</Badge>}
            {isFull && !isPast && <Badge variant="destructive">Full</Badge>}
          </div>
          <CardTitle className="text-lg">{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p className="line-clamp-2">{event.description}</p>
          <p>{formatDate(event.event_date)}</p>
          <p>Capacity: {event.max_attendees}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
