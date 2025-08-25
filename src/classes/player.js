class Player {
	constructor(name, symbol, isAI = false) {
		this.name = name;
		this.symbol = symbol; // 'X' or 'O'
		this.isAI = isAI;
	}

	makeMove() {
		throw new Error('makeMove() must be implemented by subclasses');
	}
}

class HumanPlayer extends Player {
	constructor(name, symbol) {
		super(name, symbol, false);
	}

	makeMove(board, position) {
		return board.placeMark(position, this.symbol);
	}
}

class AIPlayer extends Player {
	constructor(name, symbol) {
		super(name, symbol, true);
	}

	makeMove(board) {
		const position = this.chooseBestMove(board);
		return board.placeMark(position, this.symbol);
	}

	chooseBestMove(board) {
		const aiSymbol = this.symbol;
		const humanSymbol = aiSymbol === 'X' ? 'O' : 'X';
		let bestScore = -Infinity;
		let move = -1;
		for (let i = 0; i < board.grid.length; i++) {
			if (board.isEmpty(i)) {
				board.grid[i] = aiSymbol;
				let score = this.minimax(board, 0, false, aiSymbol, humanSymbol);
				board.grid[i] = null;
				if (score > bestScore) {
					bestScore = score;
					move = i;
				}
			}
		}
		return move;
	}

	minimax(board, depth, isMaximizing, aiSymbol, humanSymbol) {
		if (board.checkWin(aiSymbol)) return 10 - depth;
		if (board.checkWin(humanSymbol)) return depth - 10;
		if (board.isFull()) return 0;

		if (isMaximizing) {
			let bestScore = -Infinity;
			for (let i = 0; i < board.grid.length; i++) {
				if (board.isEmpty(i)) {
					board.grid[i] = aiSymbol;
					let score = this.minimax(board, depth + 1, false, aiSymbol, humanSymbol);
					board.grid[i] = null;
					bestScore = Math.max(score, bestScore);
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < board.grid.length; i++) {
				if (board.isEmpty(i)) {
					board.grid[i] = humanSymbol;
					let score = this.minimax(board, depth + 1, true, aiSymbol, humanSymbol);
					board.grid[i] = null;
					bestScore = Math.min(score, bestScore);
				}
			}
			return bestScore;
		}
	}
}

export { Player, HumanPlayer, AIPlayer };