export const toInt = (input: unknown, fallback: number) => {
  const parsed = parseInt(String(input));
  return isNaN(parsed) ? fallback : parsed;
};
