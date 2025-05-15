"use client";

import { useState } from "react";
import { Sidebar } from "@/src/components/layout/sidebar";
import { Header } from "@/src/components/layout/header";
import { DetailView } from "@/src/components/detail-view";
import { ListView } from "@/src/components/list-view";
import { Settings } from "@/src/components/settings";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedItem, setSelectedItem] = useState<string | null>("1");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSettingsClick={() => setShowSettings(!showSettings)}
        />
        <div className="flex flex-1 overflow-hidden">
          <ListView
            viewMode={viewMode}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />
          <div className="flex-1 overflow-auto">
            {showSettings ? <Settings /> : <DetailView itemId={selectedItem} />}
          </div>
        </div>
      </div>
    </div>
  );
}
