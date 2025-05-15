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

  return (
    <header className="flex items-center justify-between px-8 h-20 text-purpleLight bg-purpleDark ">
      <h1 className="text-3xl ">Code Typer</h1>

      <div className="flex gap-4">
        {auth.isLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : auth.error ? (
          <div className="text-gray-400">
            Please click on signin again, and do not refresh the page...
          </div>
        ) : auth.isAuthenticated ? (
          <div className="text-gray-400">{auth.user?.profile.email}</div>
        ) : (
          <div className="text-gray-400">Nothing</div>
        )}
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
