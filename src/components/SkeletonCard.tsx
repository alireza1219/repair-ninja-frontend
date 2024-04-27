import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[100px] w-full xl:w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full xl:w-[250px]" />
        <Skeleton className="h-4 w-3/5 xl:w-[200px]" />
      </div>
    </div>
  );
};

export { SkeletonCard };
