import dotenv from "dotenv";
import fetchLatestArticle from "./scripts/fetchLatestArticle.js";
import searchGoogle from "./scripts/googleSearch.js";
import scrapeArticle from "./scripts/scrapeArticle.js";
import rewriteWithLLM from "./scripts/rewriteWithLLM.js";
import publishArticle from "./scripts/publishArticle.js";

dotenv.config();

const run = async () => {
  console.log("📥 Fetching latest article...");
  const article = await fetchLatestArticle();

  console.log("🟡 Latest article:", article.title);

  console.log("🔍 Searching Google...");
  const results = await searchGoogle(article.title);

  // take first 2 NON-BeyondChats links
  const filtered = results
    .filter(r => !r.link.includes("beyondchats.com"))
    .slice(0, 2);

  console.log("🌐 Selected reference URLs:", filtered.map(r => r.link));

  const references = [];

  for (const r of filtered) {
    console.log(`📄 Scraping: ${r.link}`);
    const scraped = await scrapeArticle(r.link);

    if (scraped.content.length > 200) {
      references.push(scraped);
    }
  }

  if (references.length < 2) {
    throw new Error("Not enough reference articles scraped");
  }

  console.log("✍️ Rewriting article with LLM...");
  const rewrittenContent = await rewriteWithLLM(
    article.title,
    article.content,
    references
  );

  console.log("📤 Publishing rewritten article...");
  await publishArticle(
  `${article.title} (Updated)`,
  rewrittenContent,
  references
  );

  console.log("🚀 Phase 2 completed successfully");

};

run().catch(err => {
  console.error("❌ Error in Phase 2:", err.message);
});
