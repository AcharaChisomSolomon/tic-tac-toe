class GameSession {
	constructor(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
		this.rounds = [];
		this.scores = {
			[player1.symbol]: 0,
			[player2.symbol]: 0,
			ties: 0
		};
	}

	startNewRound(boardClass, gameClass) {
		const board = new boardClass();
		const game = new gameClass(this.player1, this.player2, board);
		game.start();
		this.rounds.push(game);
		return game;
	}

	updateScores(winner) {
		if (winner === null) {
			this.scores.ties += 1;
		} else {
			this.scores[winner.symbol] += 1;
		}
	}

	getScores() {
		return this.scores;
	}

	resetSession() {
		this.rounds = [];
		this.scores = {
			[this.player1.symbol]: 0,
			[this.player2.symbol]: 0,
			ties: 0
		};
	}
}

export default GameSession;
