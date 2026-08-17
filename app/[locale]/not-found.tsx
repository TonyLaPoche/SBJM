import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-32 md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-6xl">Page not found</h1>
      <Link href="/" className="mt-8 inline-block text-sm underline-offset-4 hover:underline">
        Home
      </Link>
    </div>
  );
}
