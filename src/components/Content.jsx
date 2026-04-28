import { useState, useEffect } from "react";

function Content() {
  const [news, setNews] = useState({
    bbc: [],
    cnn: [],
    businessinsider: [],
    tech: [],
  });

  const [loading, setLoading] = useState(true);

  const [articlePopup, setArticlePopup] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);

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

  const summarizeArticle = async (url) => {
    try {
      setSummaryLoading(true);
      setOpenSummary(true);
      setArticlePopup(null);

      const res = await fetch('http://localhost:5000/api/aiSum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url })
      });

      const result = await res.json();

      if(res.status === 429){
        setSummary(`${result.message || "Gemini API rate limit exceeded. Please wait a moment before trying again."}`);
        setSummaryLoading(false);
        return;
      };

      if(!res.ok){
        const errorMsg = res.status = 401 ? "Login to use AI Summary" : (result.message || "Something went wrong")
        setSummary(errorMsg);
        setSummaryLoading(false);
        return;
      };

      setSummary(result.summary);
      setSummaryLoading(false);
    } catch(err) {
      console.error("Error:", err);
      setSummaryLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2 border bg-[var(--bg2)] w-74 md:w-136 mx-auto rounded-2xl shadow-2xl p-2">
        <h1 className="text-sm md:text-lg">✨AI Summary | To Summarize click on any article and summarize</h1>
      </div>

      <div className="lg:grid grid-cols-2 gap-10 mt-4 max-w-[1720px] mx-auto px-5">

        <div className="news">
          <h1 className="text-3xl font-bold mb-4 text-center border-b-1">BBC News</h1>
          {news.bbc.map((article, index) => (
            <div key={index} className="mb-4">
              <h3
                className="text-xl hover:text-blue-600 cursor-pointer"
                onClick={() => setArticlePopup({ title: article.title, url: article.url })}
              >
                • {article.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="news">
          <h1 className="text-3xl font-bold mb-4 text-center border-b-1">CNN News</h1>
          {news.cnn.map((article, index) => (
            <div key={index} className="mb-4">
              <h3
                className="text-xl hover:text-blue-600 cursor-pointer"
                onClick={() => setArticlePopup({ title: article.title, url: article.url })}
              >
                • {article.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="news">
          <h1 className="text-3xl font-bold mb-4 text-center border-b-1">Business News</h1>
          {news.businessinsider.map((article, index) => (
            <div key={index} className="mb-4">
              <h3
                className="text-xl hover:text-blue-600 cursor-pointer"
                onClick={() => setArticlePopup({ title: article.title, url: article.url })}
              >
                • {article.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="news">
          <h1 className="text-3xl font-bold mb-4 text-center border-b-1">Tech News</h1>
          {news.tech.map((article, index) => (
            <div key={index} className="mb-4">
              <h3
                className="text-xl hover:text-blue-600 cursor-pointer"
                onClick={() => setArticlePopup({ title: article.title, url: article.url })}
              >
                • {article.title}
              </h3>
            </div>
          ))}
        </div>

        {articlePopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[var(--bg)] border rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
              <p className="text-sm mb-6 line-clamp-2">{articlePopup.title}</p>
              <div className="flex gap-3">
                <a
                  href={articlePopup.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center border rounded-lg py-2 hover:bg-[var(--bg3)] transition duration-200"
                  onClick={() => setArticlePopup(null)}
                >
                  🌐 Visit Site
                </a>
                <button
                  className="flex-1 border rounded-lg py-2 hover:bg-[var(--bg3)] transition duration-200"
                  onClick={() => summarizeArticle(articlePopup.url)}
                >
                  ✨ Summarize
                </button>
              </div>
              <button
                className="mt-4 text-sm w-full text-center opacity-50 hover:opacity-100"
                onClick={() => setArticlePopup(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {openSummary && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[var(--bg)] border rounded-xl shadow-2xl p-6 md:max-w-200 mx-4">
              <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">AI Summary</h1>
                <button onClick={() => { setOpenSummary(false); setSummary(""); }}>&times;</button>
              </div>
              {summaryLoading ? (
                <p>Summarizing...</p>
              ) : (
                <ul className="list-disc list-inside space-y-2 p-2">
                  {summary
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => (
                      <li key={index} className="md:text-xl">
                        {line.replace(/^[\*\-\•]\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Content;