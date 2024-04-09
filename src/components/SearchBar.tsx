import { Search } from "lucide-react";
import { type } from "os";
import React from 'react';
import { cn } from "@/lib/utils";

type SearchBarProps = {
  params:string
  className?: string;
}

const SearchBar = ({params, className}:SearchBarProps) => {
  return (
    <div className={cn(
        "flex w-[350px] items-center justify-center py-[9px] pl-10 border-[1.5px] border-gray-200 rounded-md",
        className
      )}>
      <div className="flex items-center space-x-3">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder={params}
          className="block w-full text-xs focus-0 placeholder:text-gray-500 lg:text-sm xl:text-sm rounded-md outline-none "
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default SearchBar;