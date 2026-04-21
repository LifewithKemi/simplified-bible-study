const GEMINI_API_KEY = 'AIzaSyBTKDXJDIYs3LsIObJJD8cpc5c8BtSgA9Y'

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

export async function searchScriptures(topic) {
  const prompt = `You are a biblical scholar, pastor, and Bible study teacher. A person is searching for scriptures on the topic: "${topic}".

Return a JSON object (ONLY raw JSON, no markdown, no backticks, no preamble) with this exact structure:
{
  "topic": "the topic as a clean warm phrase",
  "scriptures": [
    {
      "reference": "Book Chapter:Verse",
      "nkjv": "exact NKJV text",
      "amp": "exact AMP text",
      "tpt": "exact TPT text",
      "msg": "exact MSG text",
      "nlt": "exact NLT text",
      "breakdown": "3-4 sentences in plain everyday language. Be warm and pastoral.",
      "context": "2-3 sentences of historical and scriptural context.",
      "teaching_truth": "3-5 sentences of pastoral teaching truth.",
      "reflection_questions": ["Q1","Q2","Q3","Q4","Q5"],
      "practical_exercise": "A specific actionable exercise for this week. 3-4 sentences.",
      "prayer": "A personal prayer in first person. Must end with: In Jesus Name, Amen."
    }
  ]
}

Return exactly 4 scriptures. Mix Old and New Testament.`

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 5000 }
      })
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('Gemini error:', err)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch (err) {
    console.error('Search error:', err)
    throw err
  }
}
