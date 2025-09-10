import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type Props = {
  onSearch: (q: string) => void; // called after user stops typing
  delay?: number; // debounce ms (default 500)
  placeholder?: string;
  loading?: boolean; // show spinner while fetching
  className?: string;
};

export default function SearchBar({
  onSearch,
  delay = 500,
  placeholder = "Search stories…",
  className = "",
}: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(value.trim());
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay, onSearch]);

  return (
    <div className={`w-full bg-white max-w-3xl mb-5 rounded-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(value.trim());
          }}
          placeholder={placeholder}
          className="pl-9 pr-20 rounded-full"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 hover:bg-[#f3eee9] rounded-full"
              onClick={() => {
                setValue("");
                onSearch("");
              }}
              aria-label="Clear search"
            >
              <X className="h-4 w-4 " />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
