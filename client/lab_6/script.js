const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    // filtering by city and zipcode
    return place.city.match(regex) || place.zip.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  console.log(matchArray);
  const html = matchArray.map((place) => `
        <ul>
            <li>${place.name}</li>
            <div>${place.category}</div>
            <div>${place.address_line_1}</div>
            <div>${place.city}</div>
            <div>${place.zip}</div>
        </ul>
        </br>
        `).join('');

  suggestions.innerHTML = html;
}

const inputSearch = document.querySelector('.input');
const suggestions = document.querySelector('.suggestions');

inputSearch.addEventListener('change', displayMatches);
inputSearch.addEventListener('keyup', displayMatches);
