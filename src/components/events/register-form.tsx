"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { FieldError } from "../../components/shared/field-error";
import { NativeSelect } from "../../components/shared/native-select";
import { useRegisterForEvent } from "../../hooks/use-events";
import {
  registerEventSchema,
  type RegisterEventForm,
} from "../../lib/validators";
import { EDUCATION_LEVELS } from "../../lib/constants";
import type { EducationLevel, RegisterEventInput } from "../../types/api";

export function RegisterForm({
  eventId,
  disabled,
}: {
  eventId: number;
  disabled: boolean;
}) {
  const mutation = useRegisterForEvent(eventId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterEventForm>({
    resolver: zodResolver(registerEventSchema),
    defaultValues: { linkedinProfile: "", educationLevel: "", motivation: "" },
  });

  const onSubmit = (v: RegisterEventForm) => {
    const body: RegisterEventInput = {};
    if (v.linkedinProfile) body.linkedinProfile = v.linkedinProfile;
    if (v.educationLevel)
      body.educationLevel = v.educationLevel as EducationLevel;
    if (v.motivation.trim()) body.motivation = v.motivation.trim();
    mutation.mutate(body, { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="linkedinProfile">LinkedIn profile (optional)</Label>
        <Input
          id="linkedinProfile"
          placeholder="https://linkedin.com/in/username"
          disabled={disabled}
          {...register("linkedinProfile")}
        />
        <FieldError message={errors.linkedinProfile?.message} />
      </div>
      <div>
        <Label htmlFor="educationLevel">Education level (optional)</Label>
        <NativeSelect
          id="educationLevel"
          disabled={disabled}
          {...register("educationLevel")}
        >
          <option value="">Select...</option>
          {EDUCATION_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l.replace("_", " ")}
            </option>
          ))}
        </NativeSelect>
      </div>
      <div>
        <Label htmlFor="motivation">Motivation (optional)</Label>
        <Textarea
          id="motivation"
          rows={4}
          disabled={disabled}
          {...register("motivation")}
        />
        <FieldError message={errors.motivation?.message} />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={disabled || mutation.isPending}
      >
        {mutation.isPending ? "Submitting..." : "Register for this event"}
      </Button>
    </form>
  );
}
