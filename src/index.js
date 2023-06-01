import "./styles.css";

const baseUrl = "https://api.tvmaze.com/search/shows?q=";

const input = document.getElementById("input-show");
const btn = document.getElementById("submit-data");
const containerForShows = document.querySelector("main");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  containerForShows.textContent = "Loading...";
  const response = await fetch(`${baseUrl}${input.value}`);
  const data = await response.json();
  containerForShows.innerHTML = "";
  showShows(data);
});

function showShows(shows) {
  shows.forEach((show) => {
    const container = document.createElement("div");
    container.classList.add("show-data");

    if (show?.show?.image?.medium) {
      const imgDOM = document.createElement("img");
      imgDOM.setAttribute("src", show.show.image.medium);
      container.appendChild(imgDOM);
    }

    const showInfoDOM = document.createElement("div");
    showInfoDOM.classList.add("show-info");
    const h1 = document.createElement("h1");
    h1.textContent = show.show.name;
    showInfoDOM.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = show.show.summary.replace(/<[^>]*>?/gm, "");
    showInfoDOM.appendChild(p);
    container.appendChild(showInfoDOM);

    containerForShows.appendChild(container);
  });
}
