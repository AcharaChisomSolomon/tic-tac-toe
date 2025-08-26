// Game class for managing a single round
class Game {
	constructor(player1, player2, board) {
		this.player1 = player1;
		this.player2 = player2;
		this.board = board;
		this.currentPlayer = player1;
		this.winner = null;
		this.isOver = false;
	}

	start() {
		this.board.reset();
		this.currentPlayer = this.player1;
		this.winner = null;
		this.isOver = false;
	}

	switchTurn() {
		this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
	}

	makeMove(position) {
		if (this.isOver) return false;
		let moveMade = false;
		if (this.currentPlayer.isAI) {
			moveMade = this.currentPlayer.makeMove(this.board);
		} else {
			moveMade = this.currentPlayer.makeMove(this.board, position);
		}
		if (moveMade) {
			this.checkGameOver();
			if (!this.isOver) this.switchTurn();
			return true;
		}
		return false;
	}

	checkGameOver() {
		if (this.board.checkWin(this.currentPlayer.symbol)) {
			this.winner = this.currentPlayer;
			this.isOver = true;
		} else if (this.board.checkTie()) {
			this.winner = null;
			this.isOver = true;
		}
	}

	getWinner() {
		return this.winner;
	}
}

export default Game;
