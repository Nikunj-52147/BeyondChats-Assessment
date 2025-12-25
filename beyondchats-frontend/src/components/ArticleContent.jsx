import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticleContent({ article }) {
  if (!article) return null;

  return (
    <div className="mt-6 border-t pt-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {article.content}
      </ReactMarkdown>

      {article.references?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">References</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-600">
            {article.references.map((ref, i) => (
              <li key={i}>
                <a href={ref} target="_blank" rel="noreferrer">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
