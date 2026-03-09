import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { person, occasion, tone, details } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Write a greeting card.

Person: ${person}
Occasion: ${occasion}
Tone: ${tone}
Details: ${details}

Return only the card text.`,
    });

    res.status(200).json({
      card: response.output_text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to generate card"
    });

  }
}
