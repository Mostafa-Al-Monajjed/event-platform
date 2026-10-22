import { Input } from "../../components/ui/input";
import { NativeSelect } from "../../components/shared/native-select";
import { EVENT_TYPES } from "../../lib/constants";
import type { FiltersValue } from "../../lib/event-utils";

interface Props {
  value: FiltersValue;
  onChange: (v: FiltersValue) => void;
}

export function EventFilters({ value, onChange }: Props) {
  const set = (key: keyof FiltersValue, v: string) =>
    onChange({ ...value, [key]: v });
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        placeholder="Search by name or description..."
        value={value.search}
        onChange={(e) => set("search", e.target.value)}
        aria-label="Search events"
      />
      <NativeSelect
        value={value.type}
        onChange={(e) => set("type", e.target.value)}
        aria-label="Event type"
      >
        <option value="">All types</option>
        {EVENT_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </NativeSelect>
      <Input
        type="date"
        value={value.dateFrom}
        onChange={(e) => set("dateFrom", e.target.value)}
        aria-label="From date"
      />
      <Input
        type="date"
        value={value.dateTo}
        onChange={(e) => set("dateTo", e.target.value)}
        aria-label="To date"
      />
    </div>
  );
}
