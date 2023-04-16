import Reel from './Reel.js';

class Board extends Phaser.GameObjects.Container {

    constructor(scene, x, y, symbols, rows, columns) {
        super(scene, x, y);
        this.symbols = symbols;
        this.rows = rows;
        this.columns = columns;
        this.reels = [];
        this.createBoard();
    }

    createBoard() {
        var x = 0;
        var y = 0;
        for (var i = 0; i < this.columns; i++) {
            var reel = new Reel(this.scene, x, y, this.symbols, this.rows);
            this.add(reel);
            this.reels.push(reel);
            x += 50;
        }
    }

    spin() {
        this.reels.forEach(function (reel) {
            reel.spin();
        });
        this.scene.time.delayedCall(100, this.findMatches, [], this);
    }

    stop() {
        this.reels.forEach(function (reel) {
            reel.stop();
        });
    }

    reset() {
        this.reels.forEach(function (reel) {
            reel.reset();
        });
    }

    findMatches() {
        var matches = [];

        const checkNextColumn = (
            currentSymbol,
            currentMatch,
            currentColumn,
            currentRow,
        ) => {
            if (currentColumn < this.columns - 1) {
                const nextColumn = currentColumn + 1;
                const nextSymbols = [
                    this.reels[nextColumn].list[currentRow - 1],
                    this.reels[nextColumn].list[currentRow],
                    this.reels[nextColumn].list[currentRow + 1]
                ];
                const nextMatches = nextSymbols.filter(
                    (symbol) => symbol?.name === currentSymbol.name
                );
                if (nextMatches.length > 0) {
                    nextMatches.forEach((match) => {
                        const nextRow = this.reels[nextColumn].list.indexOf(match);
                        checkNextColumn(
                            match,
                            [match, ...currentMatch],
                            nextColumn,
                            nextRow
                        );
                    });
                } else {
                    if (currentMatch.length > 2) {
                        matches.push(currentMatch);
                    }
                }             
            }  else {
                if (currentMatch.length > 2) {
                    matches.push(currentMatch);
                }
            }
        };

        this.reels[0].list.forEach((symbol, index) => {
            const currentSymbol = symbol;
            const currentMatch = [currentSymbol];
            const currentColumn = 0;
            const currentRow = index;
            checkNextColumn(currentSymbol, currentMatch, currentColumn, currentRow);
        });
        
        matches.forEach(function (match) {
            match.forEach(function (sym) {
                sym.match();
            });
        });
    }
}

export default Board;