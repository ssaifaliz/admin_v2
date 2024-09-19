import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("session", token, {
    expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000), // Expires in 1 hour
    secure: true,
    sameSite: "strict",
  });
};

export const getToken = () => {
  return Cookies.get("session");
};

export const removeToken = () => {
  Cookies.remove("session");
};
