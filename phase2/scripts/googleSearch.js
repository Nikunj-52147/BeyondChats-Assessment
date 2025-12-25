import axios from "axios";

export default async function searchGoogle(query) {
  if (!process.env.SERP_API_KEY) {
    throw new Error("SERPAPI_KEY not found in environment");
  }

  const response = await axios.get("https://serpapi.com/search", {
    params: {
      engine: "google",
      q: query,
      api_key: process.env.SERP_API_KEY,
      num: 5,
    },
  });

  return response.data.organic_results || [];
}
