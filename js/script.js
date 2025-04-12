let allLanguages = [];

async function fetchLanguages() {
    try {
        const response = await fetch('http://localhost:3000/api/languages');
        allLanguages = await response.json();
        displayLanguages(allLanguages);
    } catch (error) {
        console.error('Erro ao buscar linguagens:', error);
    }
}

function displayLanguages(languages) {
    const tableBody = document.querySelector('#languagesTable tbody');
    tableBody.innerHTML = '';

    languages.forEach(language => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${language.name}</td>
            <td>${language.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterLanguages() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allLanguages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm) ||
        lang.description.toLowerCase().includes(searchTerm)
    );
    displayLanguages(filtered);
}

document.getElementById('searchInput').addEventListener('input', filterLanguages);
document.getElementById('searchBtn').addEventListener('click', filterLanguages);

window.onload = fetchLanguages;
