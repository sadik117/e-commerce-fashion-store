export default function SkeletonCard() {
  return (
    <div className="block">
      <div className="rounded-lg overflow-hidden aspect-[3/4] skeleton" />
      <div className="pt-3 space-y-2">
        <div className="skeleton h-2.5 w-16 rounded" />
        <div className="skeleton h-3.5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="flex gap-1.5 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton w-3 h-3 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
