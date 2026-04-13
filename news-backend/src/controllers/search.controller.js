async function search(req, res){
  try{
    const { query } = req.params;
    const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=4&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.status !== "ok"){
      return res.status(500).json({
        message: "NewsAPI error",
        data: []
      });
    };

    res.status(200).json({
      message: "data fetched succesfully",
      data: data.articles
    });
  } catch(err){
    console.error("Error:", err.message);
    res.status(500).json({
      message: "server error"
    });
  }
};

module.exports = { search };