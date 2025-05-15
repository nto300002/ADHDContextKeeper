"use client";

import type React from "react";

import { cn } from "@/src/lib/utils";
import { Cloud, File, Folder, Plus } from "lucide-react";
import { Button } from "@/src/ui/button";
import { Badge } from "@/src/ui/badge";
import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
};

export function Sidebar() {
  const [selectedItem, setSelectedItem] = useState<string>("memo");

  const navItems: NavItem[] = [
    {
      id: "memo",
      label: "メモ",
      icon: File,
      badge: 4,
    },
    {
      id: "category",
      label: "カテゴリ",
      icon: Folder,
    },
  ];

  return (
    <div className="flex h-full w-[160px] flex-col bg-neutral-800 text-white">
      <div className="flex items-center gap-2 border-b border-neutral-700 p-4">
        <Cloud className="h-5 w-5 text-blue-400" />
        <span className="font-medium">Cloud</span>
        <Badge
          variant="outline"
          className="ml-auto bg-green-300 text-green-400 hover:bg-green-500/20"
        ></Badge>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "flex w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white",
              selectedItem === item.id && "bg-neutral-700 text-white"
            )}
            onClick={() => setSelectedItem(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.badge && (
              <Badge className="ml-auto bg-neutral-200 hover:bg-neutral-100">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      <div className="border-t border-neutral-700 p-4">
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 text-sm text-neutral-400 hover:bg-neutral-700 hover:text-white"
        >
          <Plus className="h-4 w-4" />
          <span>新規フォルダ</span>
        </Button>
      </div>
    </div>
  );
}
