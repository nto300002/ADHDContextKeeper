"use client";

import { useState } from "react";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { Textarea } from "@/src/ui/textarea";
import { Badge } from "@/src/ui/badge";
import { Separator } from "@/src/ui/separator";
import { X } from "lucide-react";

export function Settings() {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([
    "Python",
    "pytest",
    "Error",
    "コードレビュー",
    "設計",
    "ドキュメント",
  ]);

  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [templates, setTemplates] = useState([
    {
      name: "@_py",
      content:
        "Pythonエラー解決のためのテンプレート\n{エラーメッセージ}\n{コード}\n{解決策}",
    },
    {
      name: "@_test",
      content:
        "テスト失敗時の分析テンプレート\n{テスト名}\n{期待値}\n{実際の値}\n{原因分析}",
    },
  ]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSaveTemplate = () => {
    if (templateName.trim() && templateContent.trim()) {
      setTemplates([
        ...templates,
        { name: templateName.trim(), content: templateContent.trim() },
      ]);
      setTemplateName("");
      setTemplateContent("");
    }
  };

  return (
    <div className="h-full overflow-auto bg-neutral-900 p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-2xl font-bold">設定</h1>

        {/* タグセクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">タグ</h2>
          <div className="flex items-center gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="新しいタグを追加"
              className="max-w-xs bg-neutral-800"
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button
              onClick={handleAddTag}
              className="bg-blue-600 hover:bg-blue-700"
            >
              保存
            </Button>
          </div>

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
          </div>
        </div>

        <Separator className="bg-neutral-700" />

        {/* テンプレートセクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">テンプレート</h2>

          <div className="space-y-3">
            <div className="space-y-2">
              <label
                htmlFor="template-name"
                className="text-sm font-medium text-neutral-300"
              >
                テンプレート名
              </label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="@_name"
                className="max-w-xs bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="template-content"
                className="text-sm font-medium text-neutral-300"
              >
                テンプレート内容
              </label>
              <Textarea
                id="template-content"
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
                placeholder="{............}"
                className="min-h-[150px] bg-neutral-800"
              />
            </div>

            <Button
              onClick={handleSaveTemplate}
              className="bg-blue-600 hover:bg-blue-700"
            >
              保存
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">既存のテンプレート</h3>
            {templates.map((template, index) => (
              <div
                key={index}
                className="rounded-md border border-neutral-700 bg-neutral-800 p-4"
              >
                <div className="mb-2 text-lg font-medium text-blue-400">
                  {template.name}
                </div>
                <div className="whitespace-pre-wrap text-sm text-neutral-300">
                  {template.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
