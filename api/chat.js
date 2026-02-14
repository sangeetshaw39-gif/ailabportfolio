export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message, count } = req.body;

    if (count >= 5) {
        return res.json({
            reply: "I've reached my response limit 😊 For deeper consulting and problem-solving, please contact Sangeet Shaw directly."
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
                        content: "You are Sangeet Shaw's AI assistant. Answer only about his skills, projects, MBA preparation, and experience. Keep answers concise."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        res.json({
            reply: data.choices[0].message.content
        });

    } catch (error) {
        res.status(500).json({ error: "AI error" });
    }
}
