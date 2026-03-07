import { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import Content from './components/Content'

function App(){
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return(
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Content/>
    </>
  )
}

export default App;