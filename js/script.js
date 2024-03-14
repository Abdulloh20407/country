// script.js
const searchInput = document.getElementById('searchInput');
const countryList = document.getElementById('countryList');

searchInput.addEventListener('input', searchCountries);

async function searchCountries() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    if (searchQuery === '') {
        countryList.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        displayCountries(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCountries(countries) {
    countryList.innerHTML = '';

    if (countries.length === 0) {
        countryList.innerHTML = '<p>No matching countries found.</p>';
        return;
    }

    countries.forEach(country => {
        const { name, capital, flags } = country;
        const flagUrl = flags?.png;

        const countryElement = document.createElement('div');
        countryElement.classList.add('country');
        countryElement.innerHTML = `
            <h2>${name.common}</h2>
            <p>Capital: ${capital}</p>
            <img src="${flagUrl}" alt="Flag">
        `;
        countryList.appendChild(countryElement);
    });
}
