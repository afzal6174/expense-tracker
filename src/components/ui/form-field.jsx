import { cn } from "@/lib/utils";

export default function Field({ className, children, ...props }) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
