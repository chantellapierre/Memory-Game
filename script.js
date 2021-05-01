const gameContainer = document.getElementById('game');

//Clicking start button starts the game
let startBtn = document.getElementById('startBtn');

const COLORS = [
	'darkmagenta',
	'mediumslateblue',
	'mediumspringgreen',
	'darkblue',
	'rebeccapurple',
	'darkmagenta',
	'mediumslateblue',
	'mediumspringgreen',
	'darkblue',
	'rebeccapurple'
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
let hasFlipped = false;
let firstCard;
let secondCard;
let numFlipped = 0;
let freezeFlips = false;

function handleCardClick(event) {
	if (freezeFlips) return;
	let counter = document.getElementById('flips');
	let cardColor = event.target.className;
	this.classList.toggle('flip');
	event.target.style.backgroundColor = cardColor;
	numFlipped++;
	document.getElementById('flips').innerHTML = numFlipped;
	//change class if card has been flipped
	if (!hasFlipped) {
		hasFlipped = true;
		firstCard = this;

		return;
	} else {
		hasFlipped = false;
		secondCard = this;

		checkForMatch();
	}
}

function checkForMatch() {
	//check if both cards have been flipped
	if (firstCard.className === secondCard.className) {
		console.log(firstCard.className, secondCard.className);
		disableCards();
	} else {
		unflipCards();
	}
}

function disableCards() {
	firstCard.removeEventListener('click', handleCardClick);
	secondCard.removeEventListener('click', handleCardClick);
}

function unflipCards() {
	freezeFlips = true;
	setTimeout(function() {
		firstCard.classList.remove('flip');
		firstCard.style.backgroundColor = 'darkcyan';
		secondCard.classList.remove('flip');
		secondCard.style.backgroundColor = 'darkcyan';
		freezeFlips = false;
	}, 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);
