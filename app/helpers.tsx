import { unmarshall } from "@aws-sdk/util-dynamodb";

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

export function parseFromDynamo(item) {
  const unmarshalled = unmarshall(item);

  return unmarshalled;
}
