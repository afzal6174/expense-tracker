import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classnames) {
  return twMerge(clsx(classnames));
}

export const formatDateToLocal = (dateStr, locale = "en-US") => {
  const date = new Date(dateStr);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
