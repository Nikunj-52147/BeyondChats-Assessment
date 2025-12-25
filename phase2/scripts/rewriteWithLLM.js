import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function rewriteWithLLM(
  originalTitle,
  originalContent,
  references = []
) {
  if (!Array.isArray(references) || references.length === 0) {
    throw new Error("No reference articles provided to LLM");
  }

  const referenceText = references
    .map(
      (content, index) =>
        `Reference ${index + 1}:\n${content}`
    )
    .join("\n\n");

  const prompt = `
You are a professional content writer and SEO expert.

TASK:
- Rewrite the ORIGINAL ARTICLE using style, formatting, and structure inspired by the reference articles
- Do NOT copy content directly
- Improve clarity, headings, flow, and readability
- Keep the topic the same
- Add a "References" section at the end

ORIGINAL TITLE:
${originalTitle}

ORIGINAL CONTENT:
${originalContent}

REFERENCE ARTICLES:
${referenceText}

OUTPUT:
- Return ONLY the rewritten article
- Use Markdown
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You rewrite blog articles professionally." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}
