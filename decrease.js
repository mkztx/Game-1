let rottenFoodY = 0;
let rottenFoodX = 0;
function createRottenFood() {
	rottenFoodX = Math.floor(Math.random() * monitorWidth) - 100;
	rottenFoodY = Math.floor(Math.random() * monitorHeight) - 100;
	if (rottenFoodX < 100) {
		rottenFoodX += 100;
	}
	if (rottenFoodY < 100) {
		rottenFoodY += 100;
	}
	const createFood2 = document.createElement('img');
	createFood2.setAttribute('src', 'photos/burger-10932.png');
	createFood2.classList.add('rotten');
	createFood2.style.height = `100px`;
	createFood2.style.width = `100px`;
	createFood2.style.top = `${rottenFoodY}px`;
	createFood2.style.left = `${rottenFoodX}px`;
	main.appendChild(createFood2);
}

function decreaseFlorcia() {
	const createFlorcia = document.querySelector('.florcia');
	florciaHeight = florciaHeight - Math.floor(florciaHeight * 0.5);
	florciaWidth = florciaWidth - Math.floor(florciaWidth * 0.5);
	createFlorcia.style.height = `${florciaHeight}px`;
	createFlorcia.style.width = `${florciaWidth}px`;
}

function checkForEatingRotten() {
	const florcia = document.querySelector('.florcia');
	const burger = document.querySelector('.rotten');

	let florciaPosition = florcia.getBoundingClientRect();
	let burgerPosition = burger.getBoundingClientRect();
	return (
		burgerPosition.right > florciaPosition.left &&
		burgerPosition.left < florciaPosition.right &&
		burgerPosition.bottom > florciaPosition.top &&
		burgerPosition.top < florciaPosition.bottom
	);
}
