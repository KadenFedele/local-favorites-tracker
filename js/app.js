let favorites = [];

const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const nameError = document.getElementById('name-error');
const categoryError = document.getElementById('category-error');
const ratingFilter = document.getElementById('rating-filter');
const favoritesCount = document.getElementById('favorites-count');
const clearAllBtn = document.getElementById('clear-all-btn');

searchInput.addEventListener('input', searchFavorites);
categoryFilter.addEventListener('change', searchFavorites);
ratingFilter.addEventListener('change', searchFavorites);
clearAllBtn.addEventListener('click', clearAllFavorites);

function saveFavorites() {
    try {
        localStorage.setItem('localFavorites', JSON.stringify(favorites));
    } catch (error) {
        alert('Unable to save favorites. Storage may be disabled.');
    }
}
function loadFavorites() {
    try {
        const saved = localStorage.getItem('localFavorites');
        if (saved) {
            favorites = JSON.parse(saved);
        } else {
            favorites = [];
        }
    } catch (error) {
        favorites = [];
    }
}

function addFavorite(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value;

    nameError.textContent = '';       // clear the old messages first
    categoryError.textContent = '';

    if (!name) {
        nameError.textContent = 'Please enter a place name.';
    }

    if (!category) {
        categoryError.textContent = 'Please choose a category.';
    }

    if (!name || !category) {
        return;                       // stop here: nothing is added
    }

    const newFavorite = {
        name: name,
        category: category,
        rating: parseInt(document.getElementById('rating').value),
        notes: document.getElementById('notes').value.trim(),
        dateAdded: new Date().toLocaleDateString()
    };

    favorites.push(newFavorite);
    saveFavorites();
    form.reset();
    displayFavorites();
}

form.addEventListener('submit', addFavorite);

function deleteFavorite(index) {
    const favorite = favorites[index];
    if (confirm(`Delete "${favorite.name}"?`)) {
        favorites.splice(index, 1);   // remove 1 item at index
        saveFavorites();
        searchFavorites();            // re-render, keeping current filter
    }
}

function clearAllFavorites() {
    if (confirm(`Delete all ${favorites.length} favorites?`)) {
        favorites = [];               // works because favorites is let
        saveFavorites();
        displayFavorites();
    }
}

function searchFavorites() {
    favoritesList.innerHTML = '';

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedRating = ratingFilter.value;

    const filtered = favorites.filter(function(favorite) {
        const matchesSearch = searchText === '' ||
            favorite.name.toLowerCase().includes(searchText) ||
            favorite.notes.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === 'all' ||
            favorite.category === selectedCategory;
        const matchesRating = selectedRating === 'all' ||
            favorite.rating === parseInt(selectedRating);   // the select gives text, so convert it
        return matchesSearch && matchesCategory && matchesRating;
    });

    favoritesCount.textContent = `Showing ${filtered.length} of ${favorites.length} favorites`;

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
        return;
    }

    if (filtered.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites match your search.</p>';
        return;
    }

    filtered.forEach(function(favorite) {
        const index = favorites.indexOf(favorite);
        const stars = '⭐'.repeat(favorite.rating);
        favoritesList.innerHTML += `
            <div class="favorite-card">
                <h3>${favorite.name}</h3>
                <span class="favorite-category category-${favorite.category}">${favorite.category}</span>
                <div class="favorite-rating">${stars} (${favorite.rating}/5)</div>
                <p class="favorite-notes">${favorite.notes}</p>
                <p class="favorite-date">Added: ${favorite.dateAdded}</p>
                <button class="btn-danger" onclick="deleteFavorite(${index})">Delete</button>
            </div>`;
    });
}

function displayFavorites() {
    searchInput.value = '';          // clear the search box
    categoryFilter.value = 'all';    // back to All categories
    ratingFilter.value = 'all';      // back to All ratings
    searchFavorites();
}

loadFavorites();
displayFavorites();

