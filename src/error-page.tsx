import { useRouteError } from "react-router-dom";

interface ErrorPageProps {
  error: Error;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default function ErrorPageWrapper() {
  const error = useRouteError();

  return <ErrorPage error={error} />;
}
