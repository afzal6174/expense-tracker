import { siteNavItems } from "@/lib/constants/nav";

export default function NavSection() {
  return (
    <nav>
      <div className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1 mt-2 border px-4 rounded-md mx-auto">
        <div>
          <img src="/favicon.svg" className="h-14" />
        </div>

        <div className="hidden md:block">
          <ul className="flex gap-4 text-gray-500 font-medium">
            {siteNavItems.map((item) => (
              <li key={item.label}>{item.label}</li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-2 bg-teal-600 text-white w-fit rounded-md">
          Get App
        </div>
      </div>
    </nav>
  );
}
