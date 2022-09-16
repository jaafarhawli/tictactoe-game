const cells = document.querySelectorAll('.board-cell');
const statusText = document.querySelector('.status');
const playAgain = document.getElementById('playAgain');

let i;
let startTurn = 'red';
let turn = startTurn;
let selectedCell;
let column;
let row;
let diagonal;
let counter = 0;
let redScore = 0;
let yellowScore = 0;

cells.forEach((cell) => {
	cell.style.order = i;
	i += 1;
});

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

cells.forEach((cell) => cell.addEventListener('click', play));

function play() {
	selectedCell = this;
	console.log(selectedCell.gridDiagonal);
	if (selectedCell.classList.contains('red', 'yellow')) {
		return;
	} else {
		counter += 1;
		selectedCell.classList.add(`${turn}`);
		i = 0;
		while (i < 9) {
			if (cells[i].gridColumn == selectedCell.gridColumn) {
				if (cells[i].classList.contains(`${turn}`)) column++;
			}
			if (cells[i].gridRow == selectedCell.gridRow) {
				if (cells[i].classList.contains(`${turn}`)) row++;
			}
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
		if (row > 2 || column > 2 || diagonal > 2) {
			cells.forEach((cell) => cell.removeEventListener('click', play));
			if (`${turn}` == 'red') redScore += 1;
			else yellowScore += 1;
			statusText.innerHTML = `Red: ${redScore}, Yellow: ${yellowScore}`;
			return;
		}
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
			if (turn == 'red') turn = 'yellow';
			else turn = 'red';
			row = 0;
			column = 0;
			diagonal = 0;
		}
		if (counter == 9) {
			statusText.innerHTML = 'Draw';
		}
	}
}

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
