const { GoogleGenAI } = require('@google/genai');
const cheerio = require('cheerio');

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY});

async function Summarize(articleText){
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-lite',
    contents: `Summarize this article in exactly 4 bullet points: ${articleText}`
  });

  return response.text;
}

async function scrapeArticle(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  $('script, style, nav, footer, header').remove();

  const text = $('article, main, .article-body, .story-body, p')
    .text()
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 3000);

  return text;
};

async function AISummary(req, res){
  try{
    const { url } = req.body;

    if(!url){
      return res.status(400).json({
        message: "URL is required"
      });
    };

    const articleText = await scrapeArticle(url);

    const summary = await Summarize(articleText);

    res.status(200).json({
      message: 'summary fetched successfully',
      summary: summary
    });
  } catch(err){
    if(err.status === 429 || err.message?.includes('429')){
      return res.status(429).json({
        message: "Gemini API rate limit exceeded. Please wait a moment before trying again."
      });
    };

    console.error("Error:", err);

    res.status(500).json({
      message: "AI Failed to Generate response"
    });
  }
};

module.exports = { AISummary };