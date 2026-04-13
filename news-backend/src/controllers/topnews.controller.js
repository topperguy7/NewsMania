async function Topnews(req, res){

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

  try {
    const [bbc, cnn, businessinsider, tech] = await Promise.all([
      fetchNews("bbc-news"),
      fetchNews("cnn"),
      fetchNews("business-insider"),
      fetchNews("techcrunch"),
    ]);

    res.status(200).json({
      message: "data fetched successfully",
      bbc,
      cnn,
      businessinsider,
      tech,
    });
  }
  catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message: "Error fetching data"
    })
  };
};

module.exports = { Topnews };