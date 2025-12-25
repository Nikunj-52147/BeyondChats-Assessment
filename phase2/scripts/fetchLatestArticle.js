import axios from "axios";

export default async function fetchLatestArticle() {
  const res = await axios.get("http://127.0.0.1:8000/api/articles");

  if (!Array.isArray(res.data) || res.data.length === 0) {
    throw new Error("No articles found in API response");
  }
  // assuming latest article is last
  return res.data[res.data.length - 1];
}
