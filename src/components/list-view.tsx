"use client";

import { cn } from "@/src/lib/utils";
import { Card } from "@/src/ui/card";
import { Badge } from "@/src/ui/badge";

interface ListViewProps {
  viewMode: "list" | "grid";
  selectedItem: string | null;
  onSelectItem: (id: string) => void;
}

type SnapshotItem = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  preview: string;
};

export function ListView({
  viewMode,
  selectedItem,
  onSelectItem,
}: ListViewProps) {
  // サンプルデータ
  const items: SnapshotItem[] = [
    {
      id: "1",
      title: "Pythonエラー解決",
      date: "2024年5月14日",
      tags: ["Python", "Error"],
      preview: "OO.pyでのエラー発生時のスクリーンショット",
    },
    {
      id: "2",
      title: "テスト実行結果",
      date: "2024年5月13日",
      tags: ["pytest", "テスト"],
      preview: "pytestの実行結果と失敗したテストケース",
    },
    {
      id: "3",
      title: "コードレビューメモ",
      date: "2024年5月12日",
      tags: ["コードレビュー", "Python"],
      preview: "PRのレビューコメントとフィードバック",
    },
    {
      id: "4",
      title: "設計ドキュメント",
      date: "2024年5月10日",
      tags: ["設計", "ドキュメント"],
      preview: "新機能の設計ドキュメントとフローチャート",
    },
  ];

  return (
    <div className="w-[320px] overflow-auto border-r border-neutral-700 bg-neutral-700">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">スナップショット</h2>
        <div
          className={cn(
            "grid gap-3",
            viewMode === "list" ? "grid-cols-1" : "grid-cols-2"
          )}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "cursor-pointer border-neutral-600 bg-neutral-800 p-3 transition-colors hover:bg-neutral-750",
                selectedItem === item.id && "border-blue-500 bg-neutral-750"
              )}
              onClick={() => onSelectItem(item.id)}
            >
              <div className="mb-2 text-sm font-medium">{item.title}</div>
              <div className="mb-2 text-xs text-neutral-400">{item.date}</div>
              <div className="mb-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-neutral-700 text-xs hover:bg-neutral-700"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-neutral-400">{item.preview}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
