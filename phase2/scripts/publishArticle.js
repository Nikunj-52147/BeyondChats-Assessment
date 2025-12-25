import axios from "axios";

export default async function publishArticle(title, content, references) {
  const payload = {
    title,
    content,
    references: references.map(r => r.url), 
  };

  console.log("📦 Publishing payload preview:");
  console.log({
    titleLength: title.length,
    contentLength: content.length,
    contentSample: content.slice(0, 300),
  });

  const res = await axios.post(
    "http://127.0.0.1:8000/api/articles",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
