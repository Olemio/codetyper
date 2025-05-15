import { useAuth } from "react-oidc-context";

export default function Header() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "6qa9g30jeggbngk0ghiaj2va3g";
    const logoutUri = "<logout uri>";
    const cognitoDomain =
      "https://eu-central-1raw62sfjg.auth.eu-central-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return (
    <header className="flex items-center justify-between px-8 h-20 text-purpleLight bg-purpleDark ">
      <h1 className="text-3xl ">Code Typer</h1>
      {auth.isLoading ? (
        <div>Loading...</div>
      ) : auth.error ? (
        <div>Encountering error... {auth.error.message}</div>
      ) : auth.isAuthenticated ? (
        <div>{auth.user?.profile.email}</div>
      ) : (
        <div>Nothing</div>
      )}
      <div>
        {auth.isAuthenticated ? (
          <button onClick={() => auth.removeUser()}>Sign out</button>
        ) : (
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        )}
      </div>
    </header>
  );
}
