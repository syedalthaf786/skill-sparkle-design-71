export function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
          <svg
            className="h-10 w-10 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 15a4 4 0 014-4h10a4 4 0 014 4v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4zM12 9V5m0 0L8 7.5M12 5l4 2.5"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">You're offline</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No internet connection detected. Please check your network settings and try again.
        </p>
        <button onClick={() => window.location.reload()} className="btn-primary mt-6">
          Retry
        </button>
      </div>
    </div>
  );
}
