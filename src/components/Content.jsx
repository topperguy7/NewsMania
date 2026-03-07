import { useState, useEffect } from "react";

function Content() {
  const [news, setNews] = useState({
    bbc: [],
    cnn: [],
    businessinsider: [],
    tech: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/top-news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center mt-10">Loading news...</h2>;

  return (
    <div className="lg:grid grid-cols-2 gap-10 my-10 max-w-[1620px] mx-auto px-5">

      <div className="news">
        <h1 className="text-3xl font-bold mb-4 text-center border-b-1">BBC News</h1>
        {news.bbc.map((article, index) => (
          <div key={index} className="mb-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl hover:text-blue-600 cursor-pointer">
                • {article.title}
              </h3>
            </a>
          </div>
        ))}
      </div>

      <div className="news">
        <h1 className="text-3xl font-bold mb-4 text-center border-b-1">CNN News</h1>
        {news.cnn.map((article, index) => (
          <div key={index} className="mb-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl hover:text-blue-600 cursor-pointer">
                • {article.title}
              </h3>
            </a>
          </div>
        ))}
      </div>

      <div className="news">
        <h1 className="text-3xl font-bold mb-4 text-center border-b-1">Business News</h1>
        {news.businessinsider.map((article, index) => (
          <div key={index} className="mb-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl hover:text-blue-600 cursor-pointer">
                • {article.title}
              </h3>
            </a>
          </div>
        ))}
      </div>

      <div className="news">
        <h1 className="text-3xl font-bold mb-4 text-center border-b-1">Tech News</h1>
        {news.tech.map((article, index) => (
          <div key={index} className="mb-4">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl hover:text-blue-600 cursor-pointer">
                • {article.title}
              </h3>
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Content;