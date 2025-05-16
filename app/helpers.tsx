import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { useAuth } from "react-oidc-context";

type AuthType = ReturnType<typeof useAuth>;

export function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

export function parseFromDynamo(item: Record<string, AttributeValue>) {
  const unmarshalled = unmarshall(item);

  return unmarshalled;
}

export const shuffleArray = (arr: string[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getDb = async (auth: AuthType) => {
  if (!auth.user?.id_token || !auth.isAuthenticated) return;
  const tokenPayload = parseJwt(auth.user?.id_token);
  const userId = tokenPayload?.sub;
  const email = auth.user.profile.email;

  const response = await fetch("/api/getData", {
    method: "POST",
    body: JSON.stringify({ userId, email }),
  });

  const data = await response.json();

  console.log(data);
};
