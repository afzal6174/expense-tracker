import { cn } from "@/lib/utils";

export default function Select({ className, options, ...rest }) {
  return (
    <select {...rest} autoComplete="off" className={cn("", className)}>
      <option value="" disabled>
        --Choose a Category--
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
