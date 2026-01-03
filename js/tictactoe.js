// Tic Tac Toe Game
(function() {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = false;
    let scores = { X: 0, O: 0, draws: 0 };

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function initGame() {
        const gameContainer = document.getElementById('tictactoe-game');
        if (!gameContainer) return;

        gameContainer.innerHTML = `
            <div class="game-header">
                <h2>Play Tic Tac Toe While You Wait! 🎮</h2>
                <div class="game-info">
                    <div class="current-player">
                        Current Player: <span id="current-player-display">X</span>
                    </div>
                    <button id="reset-btn" class="game-btn">New Game</button>
                </div>
            </div>
            <div class="game-board" id="game-board">
                ${Array(9).fill(0).map((_, i) => `<div class="cell" data-index="${i}"></div>`).join('')}
            </div>
            <div class="game-status" id="game-status">Click any cell to start!</div>
            <div class="scoreboard">
                <div class="score-item">
                    <span class="score-label">X Wins:</span>
                    <span class="score-value" id="score-x">0</span>
                </div>
                <div class="score-item">
                    <span class="score-label">Draws:</span>
                    <span class="score-value" id="score-draws">0</span>
                </div>
                <div class="score-item">
                    <span class="score-label">O Wins:</span>
                    <span class="score-value" id="score-o">0</span>
                </div>
            </div>
        `;

        attachEventListeners();
        gameActive = true;
    }

    function attachEventListeners() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetGame);
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(clickedCell, clickedCellIndex);
        checkResult();
    }

    function updateCell(cell, index) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken', `player-${currentPlayer.toLowerCase()}`);
    }

    function checkResult() {
        let roundWon = false;
        let winningCombination = null;

        for (let i = 0; i < winningConditions.length; i++) {
            const condition = winningConditions[i];
            const a = board[condition[0]];
            const b = board[condition[1]];
            const c = board[condition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                winningCombination = condition;
                break;
            }
        }

        if (roundWon) {
            announceWinner(currentPlayer, winningCombination);
            scores[currentPlayer]++;
            updateScoreboard();
            gameActive = false;
            return;
        }

        const roundDraw = !board.includes('');
        if (roundDraw) {
            announceDraw();
            scores.draws++;
            updateScoreboard();
            gameActive = false;
            return;
        }

        changePlayer();
    }

    function announceWinner(winner, combination) {
        const status = document.getElementById('game-status');
        status.textContent = `🎉 Player ${winner} wins! 🎉`;
        status.className = 'game-status winner';
        
        // Highlight winning cells
        combination.forEach(index => {
            const cell = document.querySelector(`.cell[data-index="${index}"]`);
            cell.classList.add('winning-cell');
        });
    }

    function announceDraw() {
        const status = document.getElementById('game-status');
        status.textContent = `🤝 It's a draw! 🤝`;
        status.className = 'game-status draw';
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const playerDisplay = document.getElementById('current-player-display');
        if (playerDisplay) {
            playerDisplay.textContent = currentPlayer;
            playerDisplay.className = `player-${currentPlayer.toLowerCase()}`;
        }
        
        const status = document.getElementById('game-status');
        status.textContent = `Player ${currentPlayer}'s turn`;
        status.className = 'game-status';
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });

        const playerDisplay = document.getElementById('current-player-display');
        if (playerDisplay) {
            playerDisplay.textContent = 'X';
            playerDisplay.className = 'player-x';
        }

        const status = document.getElementById('game-status');
        status.textContent = `Player X's turn`;
        status.className = 'game-status';
    }

    function updateScoreboard() {
        document.getElementById('score-x').textContent = scores.X;
        document.getElementById('score-o').textContent = scores.O;
        document.getElementById('score-draws').textContent = scores.draws;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGame);
    } else {
        initGame();
    }

    // Expose reset function globally if needed
    window.resetTicTacToe = resetGame;
})();

