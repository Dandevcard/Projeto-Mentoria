
import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui-components";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function MentorSearchBar({
  searchTerm,
  onSearchChange,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  onResetFilters
}: SearchBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search mentors by name or keywords..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} className="mr-2" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={onResetFilters} className="flex items-center">
            <X size={18} className="mr-2" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
