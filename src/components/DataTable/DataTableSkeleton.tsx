import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  columns: number;
  rows?: number;
};

const DataTableSkeleton = ({ columns, rows = 10 }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-1/4" />
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <Skeleton
              key={`${rowIndex}-${columnIndex}`}
              className="h-4 w-1/3"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export { DataTableSkeleton };
