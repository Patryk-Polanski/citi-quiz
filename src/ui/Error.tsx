import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

type ErrorProps = {
  errorMessage?: string;
};

export default function Error({ errorMessage }: ErrorProps) {
  const error = useRouteError();
  console.error("💥 ~ Error ~ error:", error);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3">
      {isRouteErrorResponse(error) ? (
        <>
          <h1>404: Page not found</h1>
          <small>{error.data}</small>
        </>
      ) : (
        <>
          <h1>404: Could not find the requested data</h1>
          <small>
            {errorMessage ? errorMessage : "Something went wrong..."}
          </small>
        </>
      )}
      <div className="mt-8">
        <Link to="/">Back home</Link>
      </div>
    </div>
  );
}
