"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { ErrorState } from "../../../components/shared/states";
import { RegisterForm } from "../../../components/events/register-form";
import { useEvent } from "../../../hooks/use-events";
import { eventState, formatDate } from "../../../lib/event-utils";
import { getErrorMessage } from "../../../lib/errors";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const { data: event, isLoading, isError, error, refetch } = useEvent(eventId);

  if (isLoading) return <Skeleton className="h-72 w-full" />;
  if (isError || !event) {
    return (
      <div className="space-y-4">
        <ErrorState
          message={getErrorMessage(error)}
          onRetry={() => refetch()}
        />
        <Button asChild variant="outline">
          <Link href="/events">Back to events</Link>
        </Button>
      </div>
    );
  }

  const { isPast, isFull, canRegister } = eventState(event);
  const count = event.registrationCount ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="secondary">{event.event_type}</Badge>
            {isPast && <Badge variant="destructive">Event has ended</Badge>}
            {isFull && !isPast && (
              <Badge variant="destructive">Fully booked</Badge>
            )}
          </div>
          <CardTitle className="text-2xl">{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="whitespace-pre-line">{event.description}</p>
          <dl className="grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted-foreground">Date</dt>
              <dd className="font-medium">{formatDate(event.event_date)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Capacity</dt>
              <dd className="font-medium">{event.max_attendees}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Registered</dt>
              <dd className="font-medium">
                {count} / {event.max_attendees}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!canRegister && (
            <p className="rounded-md bg-muted p-3 text-sm">
              {isPast
                ? "Registration is closed because this event has ended."
                : "Registration is closed because this event is full."}
            </p>
          )}
          <RegisterForm eventId={eventId} disabled={!canRegister} />
        </CardContent>
      </Card>
    </div>
  );
}
