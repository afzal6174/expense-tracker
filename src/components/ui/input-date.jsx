import { cn } from "@/lib/utils";

export default function InputDate({ className, ...rest }) {
  return (
    <input
      {...rest}
      type="date"
      autoComplete="off"
      className={cn("", className)}
    />
  );
}
