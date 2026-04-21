const GROQ_API_KEY = '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'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

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
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 5000
      })
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('Groq error:', err)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const raw = data.choices?.[0]?.message?.content || ''
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch (err) {
    console.error('Search error:', err)
    throw err
  }
}
