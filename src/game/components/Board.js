import Reel from "./Reel.js";

class Board extends Phaser.GameObjects
  .Container {
  constructor(
    scene,
    x,
    y,
    symbols,
    rows,
    columns
  ) {
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
    for (
      var i = 0;
      i < this.columns;
      i++
    ) {
      var reel = new Reel(
        this.scene,
        x,
        y,
        this.symbols,
        this.rows
      );
      this.add(reel);
      this.reels.push(reel);
      x += 50;
    }
  }

  spin() {
    this.reels.forEach(function (reel) {
      reel.spin();
    });

    const actions = () => {
      const matches = this.findMatches();
      
      matches.forEach(function (match) {
        match.forEach(function (sym) {
          sym.match();
        });
      });

      const jackpotCount =
        this.countJackpot();
      if (jackpotCount >= 3) {
        // this.scene.events.emit('jackpot', jackpotCount);
        console.log(
          "Jackpot! " + jackpotCount
        );
      }
    };
    this.scene.time.delayedCall(
      100,
      actions,
      [],
      this
    );
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
      currentRow
    ) => {
      if (
        currentColumn <
        this.columns - 1
      ) {
        const nextColumn =
          currentColumn + 1;
        const nextSymbols = [
          this.reels[nextColumn].list[
            currentRow - 1
          ],
          this.reels[nextColumn].list[
            currentRow
          ],
          this.reels[nextColumn].list[
            currentRow + 1
          ],
        ];

        let nextMatches = [];
        if (
          currentSymbol.name === "wild"
        ) {
          const matchAgainst =
            currentMatch.filter(
              (symbol) =>
                symbol.name !==
                  "wild" &&
                symbol.name !==
                  "jackpot"
            );

          if (matchAgainst.length > 0) {
            nextMatches =
              nextSymbols.filter(
                (symbol) =>
                  symbol?.name ===
                    matchAgainst[0]
                      .name ||
                  symbol?.name ===
                    "wild"
              );
          } else {
            nextMatches =
              nextSymbols.filter(
                (symbol) =>
                  !!symbol?.name &&
                  symbol?.name !==
                    "jackpot"
              );
          }
        } else {
          nextMatches =
            nextSymbols.filter(
              (symbol) =>
                symbol?.name ===
                  (currentSymbol.name ||
                    symbol?.name ===
                      "wild") &&
                symbol?.name !==
                  "jackpot"
            );
        }

        if (nextMatches.length > 0) {
          nextMatches.forEach(
            (match) => {
              const nextRow =
                this.reels[
                  nextColumn
                ].list.indexOf(match);
              checkNextColumn(
                match,
                [
                  match,
                  ...currentMatch,
                ],
                nextColumn,
                nextRow
              );
            }
          );
        } else {
          if (currentMatch.length > 2) {
            matches.push(currentMatch);
          }
        }
      } else {
        if (currentMatch.length > 2) {
          matches.push(currentMatch);
        }
      }
    };

    this.reels[0].list.forEach(
      (symbol, index) => {
        const currentSymbol = symbol;
        const currentMatch = [
          currentSymbol,
        ];
        const currentColumn = 0;
        const currentRow = index;
        checkNextColumn(
          currentSymbol,
          currentMatch,
          currentColumn,
          currentRow
        );
      }
    );
    
    return matches;
  }

  countJackpot() {
    var jackpot = 0;
    this.reels.forEach(function (reel) {
      reel.list.forEach(function (
        symbol
      ) {
        if (symbol.name === "jackpot") {
          jackpot++;
        }
      });
    });
    return jackpot;
  }
}

export default Board;
