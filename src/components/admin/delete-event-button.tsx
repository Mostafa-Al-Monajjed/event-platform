"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { useDeleteEvent } from "../../hooks/use-events";
import type { EventItem } from "../../types/api";

export function DeleteEventButton({ event }: { event: EventItem }) {
  const mutation = useDeleteEvent();
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            disabled={mutation.isPending}
          />
        }
      >
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this event?</AlertDialogTitle>
          <AlertDialogDescription>
            &quot;{event.name}&quot; will be permanently deleted. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate(event.id)}>
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
