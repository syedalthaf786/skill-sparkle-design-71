export function LoaderPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">

      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="h-100 w-100 object-contain animate-pulse"
      />

      {/* Loading Text */}
      <p className="mt-4 text-lg font-semibold tracking-wide text-black animate-pulse">
        Loading...
      </p>

    </div>
  );
}