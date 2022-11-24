const main = document.querySelector('main');
const createFlorcia = document.createElement('img');

let win = false;

let florciaHeight = 10;
let florciaWidth = 20;

let florciaTop = 0;
let florciaLeft = 0;

let monitorWidth = window.innerWidth;
let monitorHeight = window.innerHeight;

createFlorcia.setAttribute('src', 'photos/florcia.png');
createFlorcia.classList.add('florcia');
createFlorcia.style.height = `${florciaHeight}px`;
createFlorcia.style.width = `${florciaWidth}px`;
createFlorcia.style.top = `${florciaTop}px`;
createFlorcia.style.left = `${florciaLeft}px`;
main.appendChild(createFlorcia);

function moveFlorcia(direction) {
	switch (direction) {
		case 'up':
			florciaTop = florciaTop - florciaHeight;
			if (florciaTop <= 0) {
				florciaTop = 0;
			}
			break;
		case 'down':
			florciaTop = florciaTop + florciaHeight;
			if (florciaTop >= monitorHeight) {
				florciaTop = monitorHeight - florciaHeight;
			}
			break;
		case 'left':
			florciaLeft = florciaLeft - florciaWidth * 0.7;
			if (florciaLeft <= 0) {
				florciaLeft = 0;
			}
			break;
		case 'right':
			florciaLeft = florciaLeft + florciaWidth * 0.7;
			if (florciaLeft >= monitorWidth) {
				florciaLeft = monitorWidth - florciaWidth;
			}
			break;
	}
	createFlorcia.style.top = `${florciaTop}px`;
	createFlorcia.style.left = `${florciaLeft}px`;
}

document.addEventListener('keydown', (e) => {
	if (!win) {
		switch (e.key) {
			case 'w':
				moveFlorcia('up');
				break;
			case 's':
				moveFlorcia('down');
				break;
			case 'a':
				moveFlorcia('left');
				break;
			case 'd':
				moveFlorcia('right');
				break;
			case 'f':
				feedFlorcia();
				break;
			case 'g':
				decreaseFlorcia();
				break;
		}
		eatAndSpawnNew();
		checkForWin();
	}
});

function feedFlorcia() {
	florciaHeight = florciaHeight + florciaHeight * 0.3;
	florciaWidth = florciaWidth + florciaWidth * 0.3;

	createFlorcia.style.height = `${florciaHeight}px`;
	createFlorcia.style.width = `${florciaWidth}px`;
}
function decreaseFlorcia() {
	florciaHeight = florciaHeight - florciaHeight * 0.5;
	florciaWidth = florciaWidth - florciaWidth * 0.5;
	createFlorcia.style.height = `${florciaHeight}px`;
	createFlorcia.style.width = `${florciaWidth}px`;
}
let foodY = 0;
let foodX = 0;
function createFood() {
	foodX = Math.floor(Math.random() * monitorWidth) - 100;
	foodY = Math.floor(Math.random() * monitorHeight) - 100;
	if (foodX < 100) {
		foodX += 100;
	}
	if (foodY < 100) {
		foodY += 100;
	}
	const createFood = document.createElement('img');
	createFood.setAttribute('src', 'photos/burger-10932.png');
	createFood.classList.add('burger');
	createFood.style.height = `100px`;
	createFood.style.width = `100px`;
	createFood.style.top = `${foodY}px`;
	createFood.style.left = `${foodX}px`;
	main.appendChild(createFood);
}

function checkForEating() {
	const florcia = document.querySelector('.florcia');
	const burger = document.querySelector('.burger');

	let florciaPosition = florcia.getBoundingClientRect();
	let burgerPosition = burger.getBoundingClientRect();
	return (
		burgerPosition.right > florciaPosition.left &&
		burgerPosition.left < florciaPosition.right &&
		burgerPosition.bottom > florciaPosition.top &&
		burgerPosition.top < florciaPosition.bottom
	);
}

function eatAndSpawnNew() {
	if (checkForEating()) {
		feedFlorcia();
		const prevBurger = document.querySelector('.burger');
		main.removeChild(prevBurger);
		createFood();
	}
}

function checkForWin() {
	if (florciaWidth >= monitorWidth * 0.7) {
		win = true;
		const florcia = document.querySelector('.florcia');
		const burger = document.querySelector('.burger');
		main.removeChild(burger);
		main.removeChild(florcia);

		const winBox = document.createElement('div');
		winBox.classList.add('win');
		winBox.innerText = 'YOU WON';
		main.appendChild(winBox);
	}
}

let opponentX;
let opponentY;

function spawnOpponent() {
	opponentX = Math.floor(Math.random() * monitorWidth) - 100;
	opponentY = Math.floor(Math.random() * monitorHeight) - 100;
	if (opponentX < 100) {
		opponentX += 100;
	}
	if (opponentY < 100) {
		opponentY += 100;
	}
	const createOpponent = document.createElement('img');
	createOpponent.setAttribute(
		'src',
		'photos/kisspng-slide-nike-shoe-sandal-swoosh-nike-swoosh-5b23dcf5ca1264.3453938515290769818277.png'
	);
	createOpponent.classList.add('opponent');
	createOpponent.style.height = `50px`;
	createOpponent.style.width = `50px`;
	createOpponent.style.top = `${opponentY}px`;
	createOpponent.style.left = `${opponentX}px`;
	main.appendChild(createOpponent);
}
function moveOpponent() {
	if (!win) {
		const opponent = document.querySelector('.opponent');
		if (opponentX < florciaLeft) {
			opponentX = opponentX + 50;
		}
		if (opponentX > florciaLeft) {
			opponentX = opponentX - 50;
		}
		if (opponentY < florciaTop) {
			opponentY = opponentY + 50;
		}
		if (opponentY > florciaTop) {
			opponentY = opponentY - 50;
		}

		opponent.style.top = `${opponentY}px`;
		opponent.style.left = `${opponentX}px`;
		checkForLose();
	}
}

setInterval(() => {
	moveOpponent();
}, 1000);

function checkForLose() {
	const florcia = document.querySelector('.florcia');
	const opponent = document.querySelector('.opponent');

	let florciaPosition = florcia.getBoundingClientRect();
	let opponentPosition = opponent.getBoundingClientRect();
	if (
		opponentPosition.right > florciaPosition.left &&
		opponentPosition.left < florciaPosition.right &&
		opponentPosition.bottom > florciaPosition.top &&
		opponentPosition.top < florciaPosition.bottom
	) {
		win = true;
		const burger = document.querySelector('.burger');

		main.removeChild(burger);
		main.removeChild(florcia);
		main.removeChild(opponent);

		const winBox = document.createElement('div');
		winBox.classList.add('win');
		winBox.innerText = 'YOU LOST';
		main.appendChild(winBox);
	}
}
