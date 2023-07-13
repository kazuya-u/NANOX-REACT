import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div id="error-page">
      <h2>404</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage;