"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { FieldError } from "../../components/shared/field-error";
import { NativeSelect } from "../../components/shared/native-select";
import { useCreateEvent } from "../../hooks/use-events";
import { createEventSchema, type CreateEventForm } from "../../lib/validators";
import { EVENT_TYPES } from "../../lib/constants";

export function CreateEventDialog() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventForm>({ resolver: zodResolver(createEventSchema) });

  const mutation = useCreateEvent(() => {
    reset();
    setOpen(false);
  });

  const onSubmit = (v: CreateEventForm) =>
    mutation.mutate({
      name: v.name,
      description: v.description,
      max_attendees: Number(v.max_attendees),
      event_date: new Date(v.event_date).toISOString(),
      event_type: v.event_type,
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Create event</DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create event</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} {...register("description")} />
            <FieldError message={errors.description?.message} />
          </div>
          <div>
            <Label htmlFor="max_attendees">Max attendees</Label>
            <Input
              id="max_attendees"
              type="number"
              min={1}
              {...register("max_attendees")}
            />
            <FieldError message={errors.max_attendees?.message} />
          </div>
          <div>
            <Label htmlFor="event_date">Event date</Label>
            <Input
              id="event_date"
              type="datetime-local"
              {...register("event_date")}
            />
            <FieldError message={errors.event_date?.message} />
          </div>
          <div>
            <Label htmlFor="event_type">Event type</Label>
            <NativeSelect
              id="event_type"
              defaultValue=""
              {...register("event_type")}
            >
              <option value="">Select...</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
            <FieldError message={errors.event_type?.message} />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
