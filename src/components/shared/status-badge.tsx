import { Badge } from "../../components/ui/badge";

const styles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  APPROVED: "bg-green-100 text-green-800 border-green-300",
  REJECTED: "bg-red-100 text-red-800 border-red-300",
  COMPLETED: "bg-blue-100 text-blue-800 border-blue-300",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={styles[status] ?? ""}>
      {status}
    </Badge>
  );
}
