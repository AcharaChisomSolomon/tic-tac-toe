// Board class for Tic-Tac-Toe
class Board {
	constructor() {
		// 3x3 grid initialized to null
		this.grid = Array(9).fill(null);
	}

	reset() {
		this.grid = Array(9).fill(null);
	}

	isFull() {
		return this.grid.every(cell => cell !== null);
	}

	isEmpty(position) {
		return this.grid[position] === null;
	}

	placeMark(position, symbol) {
		if (this.isEmpty(position)) {
			this.grid[position] = symbol;
			return true;
		}
		return false;
	}

	checkWin(symbol) {
		// Returns true if the given symbol has a winning combination
		const winPatterns = [
			[0,1,2], [3,4,5], [6,7,8], // rows
			[0,3,6], [1,4,7], [2,5,8], // columns
			[0,4,8], [2,4,6]           // diagonals
		];
		return winPatterns.some(pattern =>
			pattern.every(idx => this.grid[idx] === symbol)
		);
	}

	checkTie() {
		return this.isFull() && !this.checkWin('X') && !this.checkWin('O');
	}
}

export default Board;
