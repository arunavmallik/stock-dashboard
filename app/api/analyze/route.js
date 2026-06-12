export async function POST(req) {
  const { ticker, dataContext } = await req.json();

  if (!ticker || !dataContext) {
    return Response.json({ error: "Missing ticker or dataContext" }, { status: 400 });
  }

  const prompt = `You are a senior equity analyst. Analyze this stock for a retail investor making personal investment decisions.

${dataContext}

Respond ONLY with a valid JSON object — no markdown, no backticks, no extra text. Use this exact schema:

{
  "companyName": "Full company name",
  "sector": "sector name",
  "framework": "Which valuation framework you chose and why in 1 sentence",
  "fairValue": 123.45,
  "verdict": "undervalued",
  "verdictLabel": "Undervalued",
  "upsideDownside": "+12.4%",
  "rationale": "3-4 sentences explaining the current market price and what is driving it — valuation dynamics, macro context, competitive position, risks. Write for a smart non-professional investor.",
  "optionsSentiment": "2-3 sentences interpreting the options data — what the put/call ratio suggests about market sentiment, whether open interest is skewed bullish or bearish, and what the volume concentration at certain strikes implies about where traders expect the stock to go.",
  "newsSentiment": "bullish",
  "newsSentimentLabel": "Bullish",
  "newsSummary": "2-3 sentences summarizing the overall news sentiment and the key themes or events driving recent coverage of this stock.",
  "bullCase": { "price": 123.45, "label": "Bull", "desc": "10-12 word scenario description" },
  "baseCase": { "price": 123.45, "label": "Base", "desc": "10-12 word scenario description" },
  "bearCase": { "price": 123.45, "label": "Bear", "desc": "10-12 word scenario description" },
  "keyMetrics": [
    { "label": "P/E (TTM)", "value": "24.5x", "note": "vs sector avg ~20x" },
    { "label": "Revenue growth", "value": "+18%", "note": "YoY" },
    { "label": "Free cash flow", "value": "$8.2B", "note": "strong FCF yield" },
    { "label": "Beta", "value": "1.2", "note": "moderate volatility" }
  ],
  "rangeMin": 90.00,
  "rangeMax": 180.00
}

verdict must be exactly one of: "undervalued", "overvalued", "fairvalue".
newsSentiment must be exactly one of: "bullish", "bearish", "neutral".
verdictLabel must be one of: "Undervalued", "Overvalued", "Fairly valued".
newsSentimentLabel must be one of: "Bullish", "Bearish", "Neutral".
All prices in USD as numbers. Be realistic and grounded in the actual data provided.`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://stock-dashboard.vercel.app",
          "X-Title": "Stock Analysis Dashboard",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return Response.json({ error: "OpenRouter error: " + data.error.message }, { status: 500 });
    }

    const raw = data?.choices?.[0]?.message?.content || "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(clean);
    return Response.json({ analysis });
  } catch (e) {
    return Response.json({ error: "Analysis failed: " + e.message }, { status: 500 });
  }
}
