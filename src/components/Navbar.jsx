import { useState } from 'react'

function Navbar({ darkMode, setDarkMode}) {

  const [open, setOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchIcon, setSearchIcon] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchCategory = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      setOpen(true);
      setNoData("");

      const res = await fetch(
        `http://localhost:5000/api/news/${category}`
      );

      const data = await res.json();
      setArticles(data);
      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
      setArticles([]);
    }
  };

  return (
    <>
      <div className="flex justify-around text-[30px] py-3">
        <div className="nav-l">
          <a href="#">
            News<span className="mania">Mania</span>
          </a>
          <p className="mania-text">NewsMania is News aggregator website</p>
        </div>

        <div className='relative'>
          <button className='md:hidden' onClick={() => {setSearchIcon(!searchIcon)}}>
            🔍
          </button>

          <input type="text" placeholder="Search news..." className="hidden md:block" />

          {searchIcon && (<input type="text" placeholder="Search news..." className="md:hidden fixed top-20 left-20 border-2 rounded-md border-red-500 mt-4 shadow-xl text-2xl" />)}
        </div>

        <div className={`nav-r ${
          menuOpen ? "flex absolute top-20 right-5 bg-sky-400 p-4 rounded-lg shadow-lg flex-col gap-3" : ""
        }`}
        >

          {["business", "general", "entertainment", "sports", "technology"].map((cat) => (
            <a
              key={cat}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                fetchCategory(cat);
              }}
            >
              {cat}
            </a>
          ))}

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className='nav-r-2'>
          <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          <div className="marquee-content">
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
          </div>

          <div className="marquee-content">
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
            ⚡ Get News & Tech Updates As Fast As Possible
          </div>
        </div>
      </div>

      {open && (
        <div className="modal">
          <div className="modal-top">
            <h1>{selectedCategory}</h1>
            <button onClick={() => setOpen(false)}>&times;</button>
          </div>

          <div className="modal-bot">
            {loading ? (
              <p>Loading...</p>
            ) : articles.length === 0 ? (
              <p>Data unavailable</p>
            ) : (
              <ul>
                {articles.map((article) => (
                  <li key={article.url}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      • {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;