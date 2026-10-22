"use client";

import { useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import { EventCard } from "../../components/events/event-card";
import { EventFilters } from "../../components/events/event-filters";
import { Pagination } from "../../components/shared/pagination";
import { EmptyState, ErrorState } from "../../components/shared/states";
import { useUpcomingEvents } from "../../hooks/use-events";
import { useDebounce } from "../../hooks/use-debounce";
import {
  buildQuery,
  EMPTY_FILTERS,
  type FiltersValue,
} from "@/lib/event-utils";
import { getErrorMessage } from "@/lib/errors";

export default function EventsPage() {
  const [filters, setFilters] = useState<FiltersValue>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 400);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useUpcomingEvents(
      buildQuery({ ...filters, search: debouncedSearch }, page),
    );

  return (
    <div className="space-y-6">
      <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
        Upcoming events
      </h1>
      <EventFilters
        value={filters}
        onChange={(v) => {
          setFilters(v);
          setPage(1);
        }}
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44" />
          ))}
        </div>
      ) : isError ? (
        <ErrorState
          message={getErrorMessage(error)}
          onRetry={() => refetch()}
        />
      ) : data && data.items.length > 0 ? (
        <div className={isFetching ? "opacity-70 transition" : "transition"}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        </div>
      ) : (
        <EmptyState text="No events match your filters." />
      )}
    </div>
  );
}
