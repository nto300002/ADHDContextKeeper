"use client";

import { useState } from "react";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { Badge } from "@/src/ui/badge";
import { Textarea } from "@/src/ui/textarea";
import { Card } from "@/src/ui/card";
import { Plus, X, Edit } from "lucide-react";

interface DetailViewProps {
  itemId: string | null;
}

export function DetailView({ itemId }: DetailViewProps) {
  const [title, setTitle] = useState("画像の日付");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(["Python", "pytest", "Error", "OO.py"]);
  const [notes, setNotes] = useState("OO Error の解決 @OO.py");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  if (!itemId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-neutral-400">アイテムが選択されていません</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-neutral-900 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* タイトル */}
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold"
              autoFocus
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
            />
          ) : (
            <h1 className="text-xl font-semibold">{title}</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsEditingTitle(true)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">タイトル編集</span>
          </Button>
        </div>

        {/* 画像プレースホルダー */}
        <Card className="flex h-[300px] items-center justify-center border border-dashed border-neutral-700 bg-neutral-800">
          <p className="text-neutral-400">画像</p>
        </Card>

        {/* タグ */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-300">タグ</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 rounded-full hover:bg-neutral-600"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">{tag}を削除</span>
                </button>
              </Badge>
            ))}
            <div className="flex items-center gap-1">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="新しいタグ"
                className="h-8 w-32 bg-neutral-800"
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleAddTag}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">タグを追加</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 読み取ったコンテキスト */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-300">
            読み取ったコンテキスト
          </h2>
          <div className="max-h-[200px] overflow-auto rounded-md border border-neutral-700 bg-neutral-800 p-3 text-sm">
            <p>
              File <span className="bg-yellow-500/20">OO.py</span>, line 42, in
              test_function
              <br />
              &nbsp;&nbsp;result = calculate_value(input_data)
              <br />
              &nbsp;&nbsp;assert result == expected_value
              <br />
              <span className="bg-yellow-500/20">
                AssertionError: assert 24 == 42
              </span>
              <br />
              <br />
              Expected: 42
              <br />
              Actual: 24
              <br />
              <br />
              def calculate_value(data):
              <br />
              &nbsp;&nbsp;# 計算ロジックに問題がある
              <br />
              &nbsp;&nbsp;return data * 2 # 正しくは data * 3.5 であるべき
            </p>
          </div>
        </div>

        {/* 次の行動：出力 */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-300">
            次の行動：出力
          </h2>
          <div className="rounded-md border border-neutral-700 bg-neutral-800 p-3 text-sm">
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">バグの原因:</span>{" "}
                <code>calculate_value</code>{" "}
                関数内の乗数が間違っています。2ではなく3.5を使用する必要があります。
              </li>
              <li>
                <span className="font-medium">修正方法:</span> OO.py の42行目を{" "}
                <code>return data * 3.5</code> に変更してください。
              </li>
              <li>
                <span className="font-medium">テスト:</span>{" "}
                修正後、pytestを再実行して変更が正しいことを確認してください。
              </li>
            </ul>
          </div>
        </div>

        {/* 解決策メモ */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-300">解決策メモ</h2>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] bg-neutral-800"
            placeholder="メモを入力..."
          />
        </div>

        {/* アイテム詳細ボタン */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
          >
            アイテム詳細
          </Button>
        </div>
      </div>
    </div>
  );
}
