
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          Sorry! The page you are looking for
          doesn't exist or has been moved.
        </p>

        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
