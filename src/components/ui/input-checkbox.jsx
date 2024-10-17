import { cn } from "@/lib/utils";

export default function InputCheckbox({ className, ...rest }) {
  return (
    <input
      {...rest}
      type="checkbox"
      className={cn("form-checkbox", className)}
    />
  );
}
