import Cookies from "js-cookie";

async function fetchWithToken(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get("session");
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("something went wrong and fix this message");
  }

  return response.json();
}

export default fetchWithToken;
