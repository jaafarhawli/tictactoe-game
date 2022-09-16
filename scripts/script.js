const cells = document.querySelectorAll('.board-cell');
const statusText = document.querySelector('.status');
const playAgain = document.getElementById('playAgain');
const reset = document.getElementById('reset');

let i;
// Player who's going to start
let startTurn = 'red';
let turn = startTurn;
// Cell selected by the player
let selectedCell;
// Column matches
let column;
// Row matches
let row;
// Diagonal matches
let diagonal;
// Cells counter
let counter = 0;
// Scores
let redScore = 0;
let yellowScore = 0;

// Assign an order number for each cell
cells.forEach((cell) => {
	cell.style.order = i;
	i += 1;
});

// Relate the cells with same column, row and diagonal to eachother
for (i = 0; i < 3; i++) {
	cells[i].gridRow = 1;
}
for (i = 3; i < 6; i++) {
	cells[i].gridRow = 2;
}
for (i = 6; i < 9; i++) {
	cells[i].gridRow = 3;
}
for (i = 0; i < 7; i += 3) {
	cells[i].gridColumn = 1;
}
for (i = 1; i < 8; i += 3) {
	cells[i].gridColumn = 2;
}
for (i = 2; i < 9; i += 3) {
	cells[i].gridColumn = 3;
}
for (i = 0; i < 9; i += 4) {
	cells[i].gridDiagonal = 1;
}
for (i = 2; i < 7; i += 2) {
	cells[i].gridDiagonal = 2;
}

// Add a click event listener to each cell
cells.forEach((cell) => cell.addEventListener('click', play));

// On cell click
function play() {
	selectedCell = this;
	// If the player pressed on a taken cell, return
	if (selectedCell.classList.contains('red', 'yellow')) {
		return;
	} else {
		// Increment cells used counter
		counter += 1;
		// Add the player's badge to the cell
		selectedCell.classList.add(`${turn}`);
		i = 0;
		// Iterate over all cells
		while (i < 9) {
			// Check the number of cells you own on the same column as the current selected cell
			if (cells[i].gridColumn == selectedCell.gridColumn) {
				if (cells[i].classList.contains(`${turn}`)) column++;
			}
			// Check the number of cells you own on the same row as the current selected cell
			if (cells[i].gridRow == selectedCell.gridRow) {
				if (cells[i].classList.contains(`${turn}`)) row++;
			}
			// Check the number of cells you own on the same diagonal as the current selected cell
			// Cell number 4 is the center cell and it causes some issues because it belongs to two diagonals at the same time, so it's treated differently
			if (
				cells[4].classList.contains(`${turn}`) &&
				selectedCell.style.order != 4 &&
				selectedCell.gridDiagonal != undefined
			) {
				if (cells[i].gridDiagonal == selectedCell.gridDiagonal) {
					if (cells[i].classList.contains(`${turn}`)) diagonal++;
				}
			}
			i += 1;
		}
		// If there are more than two cells on the same row, column or diagonal of the selected cell, the player who selected that cell wins
		if (row > 2 || column > 2 || diagonal > 2) {
			// Deactivate the event listener to prevent players from selecting the empty cells left
			cells.forEach((cell) => cell.removeEventListener('click', play));
			if (`${turn}` == 'red') redScore += 1;
			else yellowScore += 1;
			statusText.innerHTML = `Red: ${redScore}, Yellow: ${yellowScore}`;
			return;
		}
		// On the diagonal that cell 4 does'nt belong to, if all cells are selected by one player, they win
		if (
			cells[0].classList.contains(`${turn}`) &&
			cells[4].classList.contains(`${turn}`) &&
			cells[8].classList.contains(`${turn}`)
		) {
			cells.forEach((cell) => cell.removeEventListener('click', play));
			if (`${turn}` == 'red') redScore += 1;
			else yellowScore += 1;
			statusText.innerHTML = `Red: ${redScore}, Yellow: ${yellowScore}`;
			return;
		} else {
			// If no player has won after selecting the previous cell, switch the turn to the other player
			if (turn == 'red') turn = 'yellow';
			else turn = 'red';
			row = 0;
			column = 0;
			diagonal = 0;
		}
		// If all cells are taken and no player has won yet, draw
		if (counter == 9) {
			statusText.innerHTML = 'Draw';
		}
	}
}
// When play again button is pressed, clear everything and retain the scores
playAgain.addEventListener('click', () => {
	cells.forEach((cell) => cell.classList.remove('red'));
	cells.forEach((cell) => cell.classList.remove('yellow'));
	row = 0;
	column = 0;
	diagonal = 0;
	counter = 0;
	if (startTurn == 'red') turn = 'yellow';
	else turn = 'red';
	cells.forEach((cell) => cell.addEventListener('click', play));
	statusText.innerHTML = `Red: ${redScore}, Yellow: ${yellowScore}`;
});

// Reset button to reset the game and the scores
reset.addEventListener('click', () => {
	cells.forEach((cell) => cell.classList.remove('red'));
	cells.forEach((cell) => cell.classList.remove('yellow'));
	row = 0;
	column = 0;
	diagonal = 0;
	counter = 0;
	if (startTurn == 'red') turn = 'yellow';
	else turn = 'red';
	cells.forEach((cell) => cell.addEventListener('click', play));
	redScore = yellowScore = 0;
	statusText.innerHTML = `Red: ${redScore}, Yellow: ${yellowScore}`;
});
