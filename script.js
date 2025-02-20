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

const form = document.getElementById('form')
const search = document.getElementById('search')


getMovies(moviesApi)

async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json()

    console.log(data.results)
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