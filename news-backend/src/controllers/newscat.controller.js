async function newscat(req, res){

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

  try {
    const { category } = req.params;
    const articles = await getCat(category);
    res.status(200).json({
      message: "data fetched",
      articles
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { newscat };