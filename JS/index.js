const cards = document.querySelector('#card-poke')
const templateCard = document.querySelector('#template-card').content

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

document.addEventListener('click', (e) => {
    if (e.target.matches('#nextBtn')) {
        if (next) {
            fetchData(next)
            window.scrollTo({ top: 0, behavior: 'instant' })
        }
    }

    if (e.target.matches('#prevBtn')) {
        if (prev) {
            fetchData(prev)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
})

const fetchData = async (url) => {
    try {
        loadingData(true)
        const link = url ? url : 'https://rickandmortyapi.com/api/character/'
        const res = await fetch(link)
        const personajes = await res.json()
        next = personajes.info.next
        prev = personajes.info.prev
        pintarCards(personajes.results)
        console.log('@@ personajes => ', personajes, next, prev)
    } catch (error) {
        console.error('@@ error => ', error,)
    } finally {
        loadingData(false)
    }
}

const pintarCards = (characters) => {
    const fragment = document.createDocumentFragment()
    cards.textContent = ''
    characters.forEach((item) => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h5').textContent = item.name
        clone.querySelector('p').textContent = item.species
        clone.querySelector('img').setAttribute('src', item.image)

        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
    /* setTimeout(() => [
        fetchData(next)
    ], 5000) */
}

const loadingData = (estado) => {
    const loading = document.querySelector('#loading')
    if (estado) {
        loading.classList.remove('d-none')
    } else {
        loading.classList.add('d-none')
    }
}