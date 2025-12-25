import { useState } from "react";
import ArticleContent from "./ArticleContent";

function getPreviewText(markdown, maxLength = 200) {
  if (!markdown) return "";

  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*`~\-_=]/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export default function ArticleCard({ article }) {
  const [open, setOpen] = useState(false);

  const isUpdated = article.title.includes("(Updated)");
  const preview = getPreviewText(article.content);

  return (
        <div
      className={`
        border-2 border-black rounded-lg p-5 bg-white shadow-sm transition-all
        ${open ? "col-span-full" : ""}
      `}
    >

      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <h2 className="text-lg font-semibold leading-snug">
          {article.title}
        </h2>

        {isUpdated && (
          <span className="text-xs bg-green-800 text-green-50 px-2 py-1 rounded shrink-0">
            Updated
          </span>
        )}
      </div>

      {/* Preview */}
      <p className="text-neutral-800 mt-3 text-sm leading-relaxed line-clamp-4">
        {preview}...
      </p>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-4 text-blue-600 text-sm font-medium hover:underline"
      >
        {open ? "Hide Article ↑" : "Read Full Article →"}
      </button>

      {/* Inline expanded article */}
      {open && <ArticleContent article={article} />}
    </div>
  );
}
