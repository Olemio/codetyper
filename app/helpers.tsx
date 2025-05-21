import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { useAuth } from "react-oidc-context";

// generert av chat gpt
type AuthType = ReturnType<typeof useAuth>;

// generert av chat gpt
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

// generert av chat gpt
export function parseFromDynamo(item: Record<string, AttributeValue>) {
  const unmarshalled = unmarshall(item);

  return unmarshalled;
}

// generert av chat gpt
export const shuffleArray = (arr: string[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getUserDB = async (auth: AuthType) => {
  if (!auth.user?.id_token || !auth.isAuthenticated) return;
  const tokenPayload = parseJwt(auth.user?.id_token); // forslag fra chat gpt
  const userId = tokenPayload?.sub;

  const response = await fetch("/api/getData", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();

  return data;
};

export const getAllUsersDB = async () => {
  const response = await fetch("/api/getAllUsers", {
    method: "POST",
  });

  const data = await response.json();

  return data;
};

export const saveTimeDynamo = async (
  auth: AuthType,
  {
    wpm,
    misClicks,
    text,
    time,
  }: {
    wpm: number;
    misClicks: number;
    text: string;
    time: number;
  }
) => {
  if (!auth.user?.id_token || !auth.isAuthenticated) return;
  const tokenPayload = parseJwt(auth.user?.id_token);
  const userId = tokenPayload?.sub;
  const email = auth.user.profile.email;

  const response = await fetch("/api/saveTime", {
    method: "POST",
    body: JSON.stringify({ userId, wpm, misClicks, text, time, email }),
  });

  const data = await response.json();

  console.log(data);
};

export const deleteResult = async (id: string) => {
  await fetch("/api/deleteItem", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
};

// generert av chat gpt
export function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);

  const padded = (n: number) => n.toString().padStart(2, "0");

  let time = `${secs}.${ms}`;

  if (mins > 0 || hrs > 0) {
    time = `${padded(mins)}.${time}`;
  }

  if (hrs > 0) {
    time = `${padded(hrs)}.${time}`;
  }

  return time;
}
