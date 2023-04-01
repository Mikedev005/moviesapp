const API_URl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=410f0b8041e78ac583b40717ebef69d5&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URl =
  'https://api.themoviedb.org/3/search/movie?api_key=410f0b8041e78ac583b40717ebef69d5&query="';
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  } catch (err) {
    const errMessage = document.createElement("div");
    errMessage.classList.add("errMessage");
    errMessage.innerHTML = `<p>
    There Is some thing Wrong with The connection. please try later
    </p>`;
    main.appendChild(errMessages);
    console.log(err);
  }
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>overview</h3>
          <p>
            ${overview}
          </p>
        </div>
    `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URl + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
