import { useState , useEffect } from 'react'

function Navbar({ darkMode, setDarkMode}) {

  const [openCat, setOpenCat] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchBar, setSearchBar] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [openSer, setOpenSer] = useState(false);
  const [openSign, setOpenSign] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [signInData, setSignInData] = useState({username:'', email:'', password:''});
  const [loginData, setLoginData] = useState({identifier:'', password:''});
  const [isLogin, setIsLogin] = useState(false);

  const fetchCategory = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      setOpenCat(true);

      const res = await fetch(
        `http://localhost:5000/api/news/${category}`
      );

      const result = await res.json();
      setArticles(result.articles || []);
      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
      setArticles([]);
    }
  };

  const searchQuery = async (query) => {
    if(!isLogin) {
      setOpenSer(true);
      setSearchData([{title: "Please Login to Use Search Feature", url: "#"}]);

      setTimeout(() => {
        setOpenSer(false);
        setOpenLogin(true);        
      }, 1500);

      return;
    };

    try{
      setSearchData([]);
      setOpenSer(true);
      const res = await fetch(`http://localhost:5000/api/search/${encodeURIComponent(query)}` , { credentials: 'include'});
      const result = await res.json();
      console.log(result);
      setSearchData(result.data || []);
      setSearchBar(false);
      setQuery("");
    } catch(err){
      console.error("Error:", err.message);
      setSearchData([]);
      setSearchBar(false);
    }
  };

  const handleChangeS = (e) => {
    const { name , value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitS = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch("http://localhost:5000/api/auth/sign", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(signInData)
      });

      if(res.ok) {
        const result = await res.json();

        setSignInData({username:'', email:'', password:''});
        setOpenSign(false);
      } else{
        alert("Invalid Credentials");
      };
    } catch(err){
      console.error("Erro:", err.message);
    };
  } 

  const handleChangeL = (e) => {
    const { name , value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitL = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      if(res.ok){
        const result = await res.json();
        setIsLogin(true);

        setLoginData({identifier:'', password:''});
        setOpenLogin(false);
      }
      else{
        alert("Invalid Credentials");
      };
    } catch(err){
      console.error("Error:", err.message);
    }
  };

  const logOut = async () => {
    try{
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: 'POST',
        credentials: 'include'
      });

      if(res.ok){
        setIsLogin(false);
      };
    } catch(err){
      console.error("Error:", err.message);
    };
  };

  useEffect(() => {
    const checkLogin = async () => {
      try{
        const res = await fetch('http://localhost:5000/api/auth/isLogin', {credentials: 'include'});
        const result = res.json();

        if(res.ok){
          setIsLogin(true);
        };
      } catch(err){
        console.error("Error:", err);
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      <div className="flex items-center justify-around text-[30px] py-3">
        <div className="nav-l">
          <a href="#">
            News<span className="mania">Mania</span>
          </a>
          <p className="mania-text">NewsMania is News aggregator website</p>
        </div>

        <div className='relative flex'>
          <button className='md:hidden' onClick={() => {setSearchBar(!searchBar)}}>
            🔍
          </button>

          <input
          type="text" 
          placeholder={isLogin ? "Search news..." : "Login to search news"}
          className="hidden md:block border rounded-md placeholder-[var(--text)]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
          <button
          className='border ml-1 hidden md:block rounded-md cursor-pointer hover:-translate-y-1 transition ease-in-out duration-200 active:scale-96'
          onClick={() => {searchQuery(query);}}
          >🔍
          </button>

          {searchBar && 
          (
          <div className='md:hidden fixed top-30 left-15 bg-[var(--bg)] flex flex-col p-4 rounded-md border-2 border-red-300 shadow-lg'>
            <input 
            type="text" 
            placeholder={isLogin ? "Search news..." : "Login to search" } 
            className="border rounded-md h-12 border-red-300 shadow-xl text-2xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button 
            className='mt-2 bg[var(--bg1)] border active:scale-96 transition ease-in-out duration-200 rounded-md'
            onClick={() => {searchQuery(query);}}
            >Enter</button>
          </div>)}
        </div>

        <div className={`nav-r ${
          menuOpen ? "flex absolute top-20 right-5 bg-[var(--bg4)] border p-4 rounded-lg shadow-lg flex-col gap-3" : ""
        }`}
        >

          {["business", "general", "entertainment", "sports", "technology"].map((cat) => (
            <a
              className='border'
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

        <div>
          <button 
          className={`flex items-center gap-1 border px-2 py-1 rounded-lg ${isLogin ? "bg-blue-300" : "bg-red-400"} cursor-pointer hover:scale-102 active:scale-97 transition duration-200`}
          onClick={isLogin ? logOut : () => setOpenSign(true)}>
            <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="w-9 h-9"
            >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
          <span className='hidden md:block text-xs md:text-3xl'>{isLogin ? "Log out" : "Sign in"}</span>
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

      {openCat && (
        <div className="modal">
          <div className="modal-top">
            <h1>{selectedCategory}</h1>
            <button onClick={() => setOpenCat(false)}>&times;</button>
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

      {openSer && (
        <div className='modal'>
          
          <div className='modal-top'>
            <h1>Searched Data</h1>
            <button onClick={()=> setOpenSer(false)}>&times;</button>
          </div>

          <div className='modal-bot'>
            {searchData.length === 0 ? (
              <p>Data Unavailable</p>
            ) : (
              <ul>
                {searchData.map((item, index) => (
                  <li className='my-4 md:m-0' key={index}>
                    <a
                    href={item.url}
                    target='_blank'
                    rel='noreferrer'
                    >
                      • {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {openSign && (
        <div className='auth shadow-lg backdrop-blur'>
          <div className='modal-top mb-6 md:mb-10'>
            <h1>Sign In</h1>
            <button onClick={() => {setOpenSign(false)}}>&times;</button>
          </div>
          <form onSubmit={handleSubmitS} className='flex flex-col gap-8 md:gap-12'>
            
            <input type='text' placeholder='username' name='username' required onChange={handleChangeS} className='placeholder-[var(--text)] border rounded-md'/>

            <input type='email' placeholder='email' required name='email' onChange={handleChangeS} className='placeholder-[var(--text)] border rounded-md'/>

            <input type='password' placeholder='password' required name='password' onChange={handleChangeS} className='placeholder-[var(--text)] border rounded-md'/>

            <button className='border px-2 rounded-lg bg-[var(--bg3)] cursor-pointer active:scale-97 transition duration-200'>Submit</button>
            <h1>Want to Login?<button type='button' onClick={() => {setOpenSign(false); setOpenLogin(true); }} className='underline cursor-pointer'>Login</button></h1>
          </form>
        </div>
      )}

      {openLogin && (
        <div className='auth shadow-lg backdrop-blur'>
          <div className='modal-top mb-6 md:mb-10'>
            <h1>Log In</h1>
            <button onClick={() => {setOpenLogin(false)}}>&times;</button>
          </div>
          <form onSubmit={handleSubmitL} className='flex flex-col gap-8 md:gap-12'>

            <input type='text' placeholder='username or email' name='identifier' required onChange={handleChangeL} className='placeholder-[var(--text)] border rounded-md'/>

            <input type='password' placeholder='password' required name='password' onChange={handleChangeL} className='placeholder-[var(--text)] border rounded-md'/>

            <button className='border px-2 rounded-lg bg-[var(--bg3)] cursor-pointer active:scale-97 transition duration-200'>Submit</button>
            <h1>Want to Sign In?<button type='button' onClick={() => {setOpenLogin(false); setOpenSign(true); }} className='underline cursor-pointer'>Sign In</button></h1>
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;