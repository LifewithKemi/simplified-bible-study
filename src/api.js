// Paste your Google Gemini API key here (get one free at https://aistudio.google.com)
const GEMINI_API_KEY = 'AIzaSyAYY_71lfma9NOFZMyvPUWhC1WGEr6P4N0'

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

export async function searchScriptures(topic) {
  const prompt = `You are a biblical scholar, pastor, and Bible study teacher. A person is searching for scriptures on the topic: "${topic}".

Return a JSON object (ONLY raw JSON — no markdown, no backticks, no preamble) with this exact structure:
{
  "topic": "the topic as a clean, warm phrase",
  "scriptures": [
    {
      "reference": "Book Chapter:Verse",
      "nkjv": "exact NKJV text of this verse",
      "amp": "exact AMP (Amplified Bible) text of this verse",
      "tpt": "exact TPT (The Passion Translation) text of this verse",
      "msg": "exact MSG (The Message) text of this verse",
      "nlt": "exact NLT (New Living Translation) text of this verse",
      "breakdown": "3-4 sentences explaining what this verse means in plain, everyday language that anyone can understand. Be warm and pastoral.",
      "context": "2-3 sentences explaining the historical, cultural, and scriptural context of this passage. Who wrote it? To whom? What was happening?",
      "teaching_truth": "One clear, powerful biblical truth this verse teaches — written like a loving pastor teaching it to their congregation. 3-5 sentences. Make it personal and applicable.",
      "reflection_questions": [
        "Question 1 — personal and introspective",
        "Question 2 — about applying this truth",
        "Question 3 — about God's character shown here",
        "Question 4 — about challenges or struggles this relates to",
        "Question 5 — about what this means for the reader's life right now"
      ],
      "practical_exercise": "A specific, actionable spiritual exercise the person can do THIS WEEK based on this scripture. Be concrete and encouraging. 3-4 sentences.",
      "prayer": "A heartfelt, personal prayer (written in first person) based on this scripture. 5-8 sentences. It must end exactly with: In Jesus Name, Amen."
    }
  ]
}

Return exactly 4 scriptures that most directly and powerfully apply to this topic. Mix Old Testament and New Testament. Include at least one Psalm or Proverbs if relevant. Make sure the translation texts accurately reflect each versions true wording.`

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 5000 }
    })
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  const clean = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
