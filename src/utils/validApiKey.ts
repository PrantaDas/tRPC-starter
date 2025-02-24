export const validApiKey = (apiKey: string): boolean => {
  if (!apiKey || apiKey !== process.env.API_KEY) return false;
  return true;
};