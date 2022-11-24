const main = document.querySelector('main');
const createFlorcia = document.createElement('img');

let win = false;

let florciaHeight = 10;
let florciaWidth = 20;

let florciaTop = 0;
let florciaLeft = 0;

let monitorWidth = window.innerWidth;
let monitorHeight = window.innerHeight;

let speedMultiplier = () => {
	if (1400 < monitorWidth) {
		return 2;
	}
	if (1200 < monitorWidth) {
		return 1.8;
	}
	if (1000 < monitorWidth) {
		return 1.6;
	}
	if (800 < monitorWidth) {
		return 1.4;
	}
	if (500 < monitorWidth) {
		return 1.2;
	}
	if (monitorWidth < 500) {
		return 1;
	}
};

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
			florciaTop = florciaTop - florciaHeight * speedMultiplier();
			if (florciaTop <= 0) {
				florciaTop = 0;
			}
			break;
		case 'down':
			florciaTop = florciaTop + florciaHeight * speedMultiplier();
			if (florciaTop >= monitorHeight) {
				florciaTop = monitorHeight - florciaHeight;
			}
			break;
		case 'left':
			florciaLeft = florciaLeft - florciaWidth * 0.7 * speedMultiplier();
			if (florciaLeft <= 0) {
				florciaLeft = 0;
			}
			break;
		case 'right':
			florciaLeft = florciaLeft + florciaWidth * 0.7 * speedMultiplier();
			if (florciaLeft >= monitorWidth) {
				florciaLeft = monitorWidth - florciaWidth;
			}
			break;
	}
	createFlorcia.style.top = `${florciaTop}px`;
	createFlorcia.style.left = `${florciaLeft}px`;
}

document.addEventListener('keydown', (e) => {
	const florcia = document.querySelector('.florcia');

	if (!win) {
		switch (e.key) {
			case 'w':
				moveFlorcia('up');
				florcia.style.transform = 'rotate(-90deg)';

				break;
			case 's':
				moveFlorcia('down');
				florcia.style.transform = 'rotate(90deg)';

				break;
			case 'a':
				moveFlorcia('left');
				florcia.style.transform = 'rotate(180deg)';
				florcia.style.transform = 'scale(-1,1)';

				break;
			case 'd':
				moveFlorcia('right');
				florcia.style.transform = 'rotate(0deg)';

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
let points = 0;
function eatAndSpawnNew() {
	const pointsbox = document.querySelector('.points');

	if (checkForEating()) {
		points++;
		feedFlorcia();
		const prevBurger = document.querySelector('.burger');
		main.removeChild(prevBurger);
		createFood();
		pointsbox.innerText = `score: ${points}`;
	}
	if (checkForEatingRotten()) {
		points--;
		decreaseFlorcia();
		const prevRottenBurger = document.querySelector('.rotten');
		main.removeChild(prevRottenBurger);
		createRottenFood();
		pointsbox.innerText = `score: ${points}`;
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
	const florcia = document?.querySelector('.florcia');
	let florciaPosition = florcia?.getBoundingClientRect();

	//let distance = 35;
	let distance = florciaWidth + florciaWidth * speedMultiplier();
	if (!win) {
		const opponent = document.querySelector('.opponent');

		if (opponentX < florciaPosition.left) {
			opponentX = opponentX + distance;
			if (opponentX > monitorWidth) {
				opponentX = monitorWidth - 100;
			}
		}
		if (opponentX > florciaPosition.right) {
			opponentX = opponentX - distance;
			if (opponentX <= 0) {
				opponentX = 0;
			}
		}
		if (opponentY < florciaPosition.top) {
			opponentY = opponentY + distance;
			if (opponentY >= monitorHeight) {
				opponentY = monitorHeight - 100;
			}
		}
		if (opponentY > florciaPosition.bottom) {
			opponentY = opponentY - distance;
			if (opponentY <= 0) {
				opponentY = 100;
			}
		}

		opponent.style.top = `${opponentY}px`;
		opponent.style.left = `${opponentX}px`;
		checkForLose();
	}
}

setInterval(() => {
	moveOpponent();
}, 500);

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
