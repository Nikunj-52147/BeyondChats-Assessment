import axios from "axios";
import * as cheerio from "cheerio";

export default async function scrapeArticle(url) {
  if (!url) throw new Error("Invalid URL for scraping");

  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
    },
  });

  const $ = cheerio.load(html);

  const title =
    $("h1").first().text().trim() ||
    $("title").text().trim() ||
    "Untitled";

  let content = "";

  $("p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 50) {
      content += text + "\n\n";
    }
  });

  return {
    title,
    content: content.trim(),
    url,
  };
}
