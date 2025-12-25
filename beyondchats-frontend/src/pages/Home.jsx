import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-white">Loading articles...</p>;

  return (
    <section className="max-w-6xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-white">
        BeyondChats Articles
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
