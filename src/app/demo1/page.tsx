"use client"

import Tiptap from "@/components/tiptap";
import { useState, useCallback } from "react";

export default function Page() {
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, [content]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Tiptap Rich Text Editor
          </h1>
          <p className="text-slate-500">
            A modern WYSIWYG editor built with Tiptap and Ant Design
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-600">Editor</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  showPreview
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {showPreview ? "Hide" : "Show"} Preview
              </button>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Copy HTML
              </button>
            </div>
          </div>

          <div className="p-6 bg-white">
            <Tiptap value={content} onChange={setContent} />
          </div>
        </div>

        {showPreview && (
          <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Preview</span>
              <span className="text-xs text-slate-400">Rendered Output</span>
            </div>
            <div
              className="p-4 overflow-auto"
              style={{ maxHeight: "400px" }}
              dangerouslySetInnerHTML={{ __html: content || "<p className='text-slate-400'>No content yet</p>" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}