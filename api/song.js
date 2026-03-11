import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { person, occasion, mood, genre, details } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `Write original song lyrics.

Who the song is for: ${person || "Someone special"}
Occasion: ${occasion || "A special occasion"}
Mood: ${mood || "Heartfelt"}
Genre: ${genre || "Pop"}
Details to include: ${details || "None"}

Write the result with:
- a title
- Verse 1
- Chorus
- Verse 2
- Chorus

Return only the lyrics.`
    });

    return res.status(200).json({
      song: response.output_text
    });
  } catch (error) {
    console.error("Song generation error:", error);

    return res.status(500).json({
      error: error.message || "Song generation failed"
    });
  }
}
