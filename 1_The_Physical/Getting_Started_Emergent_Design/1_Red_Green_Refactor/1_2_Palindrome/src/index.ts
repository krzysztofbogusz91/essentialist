export const palindrome = (input: string): boolean => {
  const normalized = input.toLowerCase().replace(/\s/g, "");
  const reversed = normalized.split("").reverse().join("");
  return normalized === reversed;
};
