import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFallbackLetter = (username: string) => {
  if (!username) {
    return "";
  }

  // Extract the first character from the username
  const firstLetter = username.charAt(0).toUpperCase();

  // Check if the first character is a letter
  if (firstLetter.match(/[A-Za-z]/)) {
    return firstLetter;
  }

  return "";
};
