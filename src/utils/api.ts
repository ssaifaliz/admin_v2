import FailToast from "@/components/modals/failToast";
import Cookies from "js-cookie";

async function fetchWithToken(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get("session");
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `${token}`);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   if (errorData?.errors?.length)
  //     errorData?.errors?.map((each: any) => FailToast(each?.msg));
  //   throw new Error(errorData?.message);
  // }

  return response.json();
}

export default fetchWithToken;
