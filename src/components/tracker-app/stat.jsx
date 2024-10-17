import { cn } from "@/lib/utils";

export default function Stat({ title, value = 0 }) {
  return (
    <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
      <dt className="text-base leading-7 text-gray-600">{title}</dt>
      <dd
        className={cn(
          "order-first text-xl font-semibold tracking-tight sm:text-3xl",
          value < 0 ? "text-red-700" : "text-gray-700"
        )}
      >
        BDT {value}
      </dd>
    </div>
  );
}
