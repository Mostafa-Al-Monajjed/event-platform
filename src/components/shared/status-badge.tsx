import { Badge } from "../../components/ui/badge";

const styles: Record<string, string> = {
  PENDING:
    "border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-500/40 dark:bg-yellow-500/15 dark:text-yellow-300",
  APPROVED:
    "border-green-300 bg-green-100 text-green-800 dark:border-green-500/40 dark:bg-green-500/15 dark:text-green-300",
  REJECTED:
    "border-red-300 bg-red-100 text-red-800 dark:border-red-500/40 dark:bg-red-500/15 dark:text-red-300",
  COMPLETED:
    "border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-500/40 dark:bg-blue-500/15 dark:text-blue-300",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={styles[status] ?? ""}>
      {status}
    </Badge>
  );
}
