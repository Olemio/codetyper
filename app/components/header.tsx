import { Link } from "@remix-run/react";
import { useAuth } from "react-oidc-context";

export default function Header() {
  const auth = useAuth();

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
    : "Not logged in";

  return (
    <header className="flex items-center justify-between px-8 h-20 text-purpleLight bg-purpleDark ">
      <h1 className="text-xl font-mono">{"<CodeTyper />"}</h1>

      <Link to="/results">Hello</Link>
      <Link to="/">Results</Link>

      <div className="flex gap-4">
        <div className="text-gray-400">{statusText}</div>

        <div>
          {auth.isAuthenticated ? (
            <button
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
      </div>
    </header>
  );
}
