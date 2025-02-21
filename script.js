/* BURGER MENU */
function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}


/* FEATURES */
const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach((panel) => {
        panel.classList.remove ('active')
    })
}

/* SEARCH PAGE */

/* API KEY = 43fe075d3f8a2ba2a1387770a190430c */

const moviesApi = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=43fe075d3f8a2ba2a1387770a190430c&page=1'
const moviesImg = 'https://image.tmdb.org/t/p/w1280'
const moviesSearch = 'https://api.themoviedb.org/3/search/movie?api_key=43fe075d3f8a2ba2a1387770a190430c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


getMovies(moviesApi)

async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview  } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
         <img src="${moviesImg + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3 class="movie__title">${title}</h3>
                    <span class=${getClassByRate(vote_average)}>${vote_average}</span>
                </div>
                    <div class="overview">
                        <h3 class="overview__title">Overview</h3>
                        <p class="overview__description">
                        ${overview}
                        </p>
                    </div>
        
        `

        main.appendChild(movieElement);
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'gold'
    }else if(vote >= 5) {
        return 'silver'
    }else {
        return 'bronze'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(moviesSearch + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})