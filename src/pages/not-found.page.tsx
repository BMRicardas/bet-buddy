import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">404 Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Link to="/">Go back</Link>
    </main>
  );
}
