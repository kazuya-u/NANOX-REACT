import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error;
  console.error(error);
  const errorMessage = error?.message;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
