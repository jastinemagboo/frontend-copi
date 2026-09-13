import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type Props = {
  onSearch: (q: string) => void;
  delay?: number;
  placeholder?: string;
  loading?: boolean;
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

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value.trim());
    }
  };

  return (
    <div className={`w-full mb-8 ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B5E3C]/70" />

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-11 w-full rounded-full border-[#E8DED5] bg-white pl-10 pr-12 text-sm shadow-sm placeholder:text-[#9A8C82] focus-visible:border-[#C9B7A8] focus-visible:ring-[#8B5E3C]/20"
        />

        {value && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 text-[#76685E] hover:bg-[#F3EEE9] hover:text-[#4B3C2F]"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
