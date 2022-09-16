const cells = document.querySelectorAll('.board-cell');
const statusText = document.querySelector('.status');

let counter = 0;
let turn = 'red';
let selectedCell;
let column;
let row;
let diagonal;

cells.forEach((cell) => {
	cell.style.order = counter;
	counter += 1;
});

for (let i = 0; i < 3; i++) {
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
			statusText.innerHTML = `${turn} won!`;
		}
		if (
			cells[0].classList.contains(`${turn}`) &&
			cells[4].classList.contains(`${turn}`) &&
			cells[8].classList.contains(`${turn}`)
		) {
			cells.forEach((cell) => cell.removeEventListener('click', play));
			statusText.innerHTML = `${turn} won!`;
		} else {
			if (turn == 'red') turn = 'yellow';
			else turn = 'red';
			row = 0;
			column = 0;
			diagonal = 0;
		}
	}
}
