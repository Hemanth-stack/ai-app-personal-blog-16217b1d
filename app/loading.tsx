export default function LoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
          aria-label="Loading"
          role="status"
        />
        <p className="text-sm font-medium text-slate-600">Loading the blog...</p>
      </div>
    </main>
  );
}