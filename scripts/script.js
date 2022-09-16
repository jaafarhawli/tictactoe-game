const cells = document.querySelectorAll('.board-cell');

let counter = 0;
let turn = 'red';
let selectedCell;

cells.forEach((cell) => {
	cell.style.order = counter;
	counter += 1;
});

cells.forEach((cell) => cell.addEventListener('click', play));

function play() {
	selectedCell = this;
	if (selectedCell.classList.contains('red', 'yellow')) {
		return;
	} else {
		selectedCell.classList.add(`${turn}`);
	}
}
