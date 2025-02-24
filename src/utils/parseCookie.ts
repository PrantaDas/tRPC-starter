export const parseCookies = (cookieHeader?: string): Record<string, string> => {
  const cookies: Record<string, string> = {};
  cookieHeader?.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=").map((c) => c.trim());
    cookies[key] = decodeURIComponent(value);
  });
  return cookies;
};