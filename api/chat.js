export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, count } = req.body;

  if (count >= 5) {
    return res.json({
      reply: "I've reached my response limit 😊 For deeper consulting, contact Sangeet Shaw directly."
    });
  }

  try {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Sangeet Shaw's AI assistant. Only answer about his skills, projects, MBA prep, and experience. Keep responses concise and professional."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({
        reply: "AI service error. Please contact Sangeet directly."
      });
    }

    return res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      reply: "AI temporarily unavailable. Please contact Sangeet directly."
    });
  }
}

