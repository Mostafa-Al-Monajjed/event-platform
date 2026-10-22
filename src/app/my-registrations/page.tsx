"use client";

import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { EmptyState, ErrorState } from "../../components/shared/states";
import { StatusBadge } from "../../components/shared/status-badge";
import { useAttended } from "../../hooks/use-events";
import { eventState, formatDate } from "../../lib/event-utils";
import { getErrorMessage } from "../../lib/errors";

export default function MyRegistrationsPage() {
  const { data, isLoading, isError, error, refetch } = useAttended();

  return (
    <div className="space-y-6">
      <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
        My registrations
      </h1>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : isError ? (
        <ErrorState
          message={getErrorMessage(error)}
          onRetry={() => refetch()}
        />
      ) : !data || data.length === 0 ? (
        <EmptyState text="You have not registered for any event yet." />
      ) : (
        <div className="space-y-3">
          {data.map(({ event, registrationStatus, attendanceStatus }) => {
            const { isPast } = eventState(event);
            const title = isPast ? (
              <span>{event.name}</span>
            ) : (
              <Link href={`/events/${event.id}`} className="underline">
                {event.name}
              </Link>
            );
            return (
              <Card key={event.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.event_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={registrationStatus} />
                    <StatusBadge status={attendanceStatus} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
