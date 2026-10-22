"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateEventDialog } from "../../components/admin/create-event-dialog";
import { DeleteEventButton } from "../../components/admin/delete-event-button";
import { EventFilters } from "../../components/events/event-filters";
import { Pagination } from "../../components/shared/pagination";
import { EmptyState, ErrorState } from "../../components/shared/states";
import { useAdminEvents } from "../../hooks/use-events";
import { useDebounce } from "../../hooks/use-debounce";
import {
  buildQuery,
  EMPTY_FILTERS,
  eventState,
  formatDate,
  type FiltersValue,
} from "@/lib/event-utils";
import { getErrorMessage } from "@/lib/errors";

export default function AdminEventsPage() {
  const [filters, setFilters] = useState<FiltersValue>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 400);
  const { data, isLoading, isError, error, refetch } = useAdminEvents(
    buildQuery({ ...filters, search: debouncedSearch }, page),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
          Admin: all events
        </h1>

        <CreateEventDialog />
      </div>
      <EventFilters
        value={filters}
        onChange={(v) => {
          setFilters(v);
          setPage(1);
        }}
      />

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : isError ? (
        <ErrorState
          message={getErrorMessage(error)}
          onRetry={() => refetch()}
        />
      ) : !data || data.items.length === 0 ? (
        <EmptyState text="No events found." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((e) => {
                  const { isPast } = eventState(e);
                  return (
                    <TableRow key={e.id} className={isPast ? "opacity-60" : ""}>
                      <TableCell className="font-medium">{e.name}</TableCell>
                      <TableCell>{formatDate(e.event_date)}</TableCell>
                      <TableCell>{e.event_type}</TableCell>
                      <TableCell>{e.max_attendees}</TableCell>
                      <TableCell>
                        <Badge variant={isPast ? "destructive" : "secondary"}>
                          {isPast ? "Past" : "Upcoming"}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2 whitespace-nowrap text-right">
                        <Link href="/admin">
                          <Button variant="outline">Back</Button>
                        </Link>

                        <DeleteEventButton event={e} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
