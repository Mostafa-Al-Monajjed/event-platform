"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Skeleton } from "../../../../../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { Pagination } from "../../../../../components/shared/pagination";
import {
  EmptyState,
  ErrorState,
} from "../../../../../components/shared/states";
import { StatusBadge } from "../../../../../components/shared/status-badge";
import {
  useApproveRegistration,
  useEventRegistrations,
} from "@/hooks/use-events";
import { getErrorMessage } from "@/lib/errors";

export default function EventRegistrationsPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useEventRegistrations(
    eventId,
    page,
  );
  const approve = useApproveRegistration(eventId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Registrations (event #{eventId})</h1>

        <Link href="/admin">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : isError ? (
        <ErrorState
          message={getErrorMessage(error)}
          onRetry={() => refetch()}
        />
      ) : !data || data.attendees.length === 0 ? (
        <EmptyState text="No registrations for this event yet." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attendee</TableHead>
                  <TableHead>LinkedIn</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Motivation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.attendees.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="font-medium">
                        {r.user?.firstName} {r.user?.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {r.user?.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {r.linkedinProfile ? (
                        <a
                          href={r.linkedinProfile}
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          Profile
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>{r.educationLevel ?? "—"}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {r.motivation ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {r.status === "PENDING" && (
                        <Button
                          size="sm"
                          disabled={approve.isPending}
                          onClick={() => approve.mutate(r.id)}
                        >
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
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
