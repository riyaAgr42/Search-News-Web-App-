const form = document.getElementById("searchForm");
const queryInput = document.getElementById("query");
const newsContainer = document.getElementById("newsContainer");

const apiKey = "2f17c279467e4544801691ce7b5da4eb";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = queryInput.value.trim();
  if (!query) return;

  newsContainer.innerHTML = `<p style="text-align:center;">🔄 Loading news...</p>`;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=12&apiKey=${apiKey}`
    );

    const data = await response.json();

    if (data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No articles found. Try a different keyword.</p>";
      return;
    }

    newsContainer.innerHTML = "";
    data.articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "article";
      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">🔗 Read More</a>
      `;
      newsContainer.appendChild(card);
    });
  } catch (error) {
    newsContainer.innerHTML = "<p>❌ Something went wrong. Please try again later.</p>";
    console.error(error);
  }
});
