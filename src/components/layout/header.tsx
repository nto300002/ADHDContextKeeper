"use client";

import { useState } from "react";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { LayoutGrid, LayoutList, Search, Settings } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface HeaderProps {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  onSettingsClick: () => void;
}

export function Header({
  viewMode,
  onViewModeChange,
  onSettingsClick,
}: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex h-12 items-center justify-between border-b border-neutral-700 bg-neutral-800 px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-neutral-400 hover:bg-neutral-700 hover:text-white",
            viewMode === "list" && "bg-neutral-700 text-white"
          )}
          onClick={() => onViewModeChange("list")}
        >
          <LayoutList className="h-5 w-5" />
          <span className="sr-only">リスト表示</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-neutral-400 hover:bg-neutral-700 hover:text-white",
            viewMode === "grid" && "bg-neutral-700 text-white"
          )}
          onClick={() => onViewModeChange("grid")}
        >
          <LayoutGrid className="h-5 w-5" />
          <span className="sr-only">グリッド表示</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative">
            <Input
              className="h-8 w-[200px] bg-neutral-700 pl-8 text-sm text-white placeholder:text-neutral-400 focus-visible:ring-neutral-600"
              placeholder="検索..."
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-neutral-400 hover:bg-neutral-700 hover:text-white"
          onClick={() => setShowSearch(true)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">検索</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-neutral-400 hover:bg-neutral-700 hover:text-white"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">設定</span>
        </Button>
      </div>
    </div>
  );
}
