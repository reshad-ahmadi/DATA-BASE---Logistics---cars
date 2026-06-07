import { Search } from "lucide-react";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  placeholder?: string;
};

export const FilterBar = ({ search, onSearch, placeholder = "Search..." }: Props) => (
  <div className="relative max-w-xl">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    <input
      value={search}
      onChange={(event) => onSearch(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);
