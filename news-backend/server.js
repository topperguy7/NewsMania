require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

async function fetchNews(source) {
  const url = `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=7&apiKey=${process.env.NEWS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    console.error("Error fetching:", data);
    return [];
  }

  return data.articles;
}

async function getCat(category){
  const url = `https://newsapi.org/v2/everything?q=${category}&pageSize=10&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if(data.status !== "ok"){
    console.error("error fetching:", data);
    return [];
  }

  return data.articles;
}

app.get("/api/top-news", async (req, res) => {
  try {
    const [bbc, cnn, businessinsider, tech] = await Promise.all([
      fetchNews("bbc-news"),
      fetchNews("cnn"),
      fetchNews("business-insider"),
      fetchNews("techcrunch"),
    ]);

    res.json({
      bbc,
      cnn,
      businessinsider,
      tech,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

app.get("/api/news/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const articles = await getCat(category);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});