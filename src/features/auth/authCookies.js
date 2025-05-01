import Cookies from "js-cookie";

// set tokens in cookies

export const setTokensInCookies = (token, refresh) => {
  Cookies.set("access_token", token, { expires: 7 });
  Cookies.set("refresh_token", refresh);
};

export const getTokensInCookies = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  return { accessToken, refreshToken };
};
