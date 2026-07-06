export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse mx-auto mb-4" />
        <div className="h-4 w-48 bg-muted animate-pulse rounded-lg mx-auto mb-3" />
        <div className="h-3 w-32 bg-muted animate-pulse rounded-lg mx-auto" />
      </div>
    </div>
  );
}