import { cn } from "@/lib/utils";

export default function InputNumber({ className, ...rest }) {
  return (
    <input
      {...rest}
      type="number"
      autoComplete="off"
      placeholder="12931"
      className={cn("", className)}
    />
  );
}
