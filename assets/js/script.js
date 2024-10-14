class Searchbar {
    constructor(searchSubjectElement, searchBarElement, resultsContainerElement) {
        this.searchSubjectElement = searchSubjectElement;
        this.searchBarElement = searchBarElement;
        this.resultsContainerElement = resultsContainerElement;

        this.searchBarElement.addEventListener('input', () => this.onSearchInput());
    }

    async fetchResults(subject) {
        const response = await fetch(`https://openlibrary.org/subjects/${subject}.json`);
        const data = await response.json();
        console.log(data)
        this.displayResults(data.works);
    }

    // async fetchDescription(key) {
    //     const response = await fetch(`https://openlibrary.org/works/${key}.json`);
    //     const data = await response.json();
    //     console.log(data.description)
    //     return data.description;
    // }

    //Fetch descrizione singolo risultato
    //https://openlibrary.org/works/OL138052W.json

    //Fetch per singolo risultato
    //https://openlibrary.org/search?q=treasure&subject_facet=Fantasy

    displayResults(results) {
        this.resultsContainerElement.innerHTML = '';
        results.forEach(result => {
            const card = document.createElement('div');
            card.className = "col-md-4";
            card.innerHTML = `
                    <div class="card">
                        <img src="https://via.placeholder.com/150" class="card-img-top" alt="Card Image">
                        <div class="card-body">
                            <h5 class="card-title">${result.title}</h5>
                            <p class="card-text">Author: ${result.authors[0].name ? result.authors[0].name : 'N/A'}</p>
                            <p class="card-text">First Published: ${result.first_publish_year || 'N/A'}</p>
                            <p class="card-text">Description: ${result.author_name ? result.author_name.join(', ') : 'N/A'}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
            `;
            this.resultsContainerElement.appendChild(card);
        });
    }

    onSearchInput() {
        const query = this.searchBarElement.value;
        const searchSubject = this.searchSubjectElement.value;
        if (query.length > 2) {
            this.fetchResults(searchSubject, query);
        } else {
            this.resultsContainerElement.innerHTML = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchSubjectElement = document.getElementById('subjectSelect');
    const searchBarElement = document.getElementById('searchInput');
    const resultsContainerElement = document.getElementById('results');

    new Searchbar(searchSubjectElement, searchBarElement, resultsContainerElement);
});
