import Button from "@src/components/Button/Button";
import { AxiosError } from "axios";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export function Error() {
  const navigate = useNavigate();
  return (
    <div className="notification">
      <div>{RootBoundary()}</div>
      <Button onClick={() => navigate("/")}>На главную</Button>
    </div>
  );
}

function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  if (error instanceof AxiosError) {
    return error.response?.data.message;
  }
  return <div>Something went wrong</div>;
}
