function about() {
    document.getElementById("news").classList.add("blur");
    document.getElementById("box").style.display = "block";
}

function main() {
    document.getElementById("news").classList.remove("blur");
    document.getElementById("box").style.display = "none";
}

const apiKey = "24bad8c17f004725b335b1589a6460a6";

function loadNews(source, elementId) {
  const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById(elementId);
      list.innerHTML = "";

      for (let i = 0; i < 4; i++) {
        const article = data.articles[i];

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = article.url;
        a.target = "_blank";
        a.innerText = article.title;

        li.appendChild(a);
        list.appendChild(li);
      }
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function loadSports(elementId) {
  const url = `https://newsapi.org/v2/top-headlines?category=sports&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById(elementId);
      list.innerHTML = "";

      for (let i = 0; i < 4; i++) {
        const article = data.articles[i];

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = article.url;
        a.target = "_blank";
        a.innerText = article.title;

        li.appendChild(a);
        list.appendChild(li);
      }
    });
}

loadNews("bbc-news", "bbc-news");
loadNews("cnn", "cnn-news");
loadSports("sports-news");
loadNews("techcrunch", "tc-news");