class Searcher {
    constructor() {
        this.baseUrl = 'https://openlibrary.org/';
    }

    async fetchBooks(query, genre) {
        let url = `${this.baseUrl}?q=${query}`;
        if (genre) {
            url += `+subject/${genre}.json`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.docs;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const genreSelect = document.getElementById('genreSelect');
    const resultsContainer = document.getElementById('results');
    const searcher = new Searcher();

    const updateResults = async () => {
        const query = searchInput.value;
        const genre = genreSelect.value;
        if (query.length > 2) {
            const books = await searcher.fetchBooks(query, genre);
            resultsContainer.innerHTML = '';
            books.forEach(book => {
                const card = `
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">Autore: ${book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                                <p class="card-text">Anno: ${book.first_publish_year || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.insertAdjacentHTML('beforeend', card);
            });
        } else {
            resultsContainer.innerHTML = '';
        }
    };

    searchInput.addEventListener('input', updateResults);
    genreSelect.addEventListener('change', updateResults);
});
