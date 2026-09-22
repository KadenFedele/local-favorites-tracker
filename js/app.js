let today = new Date().toLocaleDateString();
console.log(today);

let myFavorite = {
    name: 'Starbucks on University Drive',
    category: 'coffee',
    rating: 5,
    notes: 'Great study spot with fast wifi',
    dateAdded: today
};

let displayText = myFavorite.name + ' - Rating: ' + myFavorite.rating + '/5';
console.log(displayText);

console.log(myFavorite);

console.log(typeof myFavorite.name);
console.log(typeof myFavorite.category);
console.log(typeof myFavorite.rating);
console.log(typeof myFavorite.notes);
console.log(typeof myFavorite.dateAdded);

function greetFavorite(placeName, rating) {
    console.log(placeName + ' has ' + rating + ' stars!');
}
greetFavorite('Starbucks', 5);   // "Starbucks has 5 stars!"

const nameInput = document.getElementById('name');
console.log(nameInput.value);   // what the user typed

const practiceForm = document.getElementById('add-favorite-form');

function handleSubmit(event) {
    event.preventDefault();   // stop the page reload
    console.log('You typed: ' + nameInput.value);
}

practiceForm.addEventListener('submit', handleSubmit);
