import { Link, useLocation } from "@remix-run/react";
import { useAuth } from "react-oidc-context";

export default function Header() {
  const auth = useAuth();
  const location = useLocation();

  const signOutRedirect = () => {
    const clientId = "6qa9g30jeggbngk0ghiaj2va3g";
    const logoutUri = "http://localhost:5173";
    const cognitoDomain =
      "https://eu-central-1raw62sfjg.auth.eu-central-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  const statusText = auth.isLoading
    ? "Loading..."
    : auth.error
    ? "Please click on signin again, and do not refresh the page..."
    : auth.isAuthenticated
    ? auth.user?.profile.email
    : "";

  return (
    <header className="flex items-center justify-between px-8 h-20 text-purpleLight bg-purpleDark ">
      <h1 className="text-xl font-mono">{"<CodeTyper />"}</h1>

      <div className="flex gap-4">
        <div className="flex gap-4">
          <div className="text-gray-400 capitalize">
            {statusText?.split("@")[0]}
          </div>

          <div>
            {auth.isAuthenticated ? (
              <button
                className="text-gray-400"
                onClick={() => {
                  signOutRedirect();
                  auth.removeUser();
                }}
              >
                Sign out
              </button>
            ) : (
              <button onClick={() => auth.signinRedirect()}>Sign in</button>
            )}
          </div>
          <div className="flex gap-2">
            {location.pathname !== "/results" && auth.isAuthenticated && (
              <Link to="/results">Results</Link>
            )}
            {location.pathname !== "/" && auth.isAuthenticated && (
              <Link to="/">Home</Link>
            )}
            {location.pathname !== "/leaderboard" && auth.isAuthenticated && (
              <Link to="/leaderboard">Leaderboard</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
