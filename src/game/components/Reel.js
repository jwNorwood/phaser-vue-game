import Symbol from './Symbol.js';

class Reel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, symbols, rows) {
        super(scene, x, y);
        this.symbols = symbols;
        this.symbolsPerReel = rows;
        this.symbols = symbols;
        this.createReel();
    }

    createReel() {
        var y = 0;
        for (var i = 0; i < this.symbolsPerReel; i++) {
            this.createRandomSymbol(y);
            y += 50;
        }
    }

    createRandomSymbol(y) {
        const weightedRandom = (weights) => {
            var sum = 0;
            var r = Math.random();
            for (var i = 0; i < weights.length; i++) {
                sum += weights[i];
                if (r <= sum) return i;
            }
        }
        var index = weightedRandom(this.symbols.map(s => s.weight));
        var symbol = this.symbols[index];
        this.add(new Symbol(this.scene, 0, y, symbol.asset, 0, symbol.value, symbol.name));
    }

    spin() {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i].destroy();
        }
        var y = 0;
        for (var i = 0; i < this.symbolsPerReel; i++) {
            this.createRandomSymbol(y);
            y += 50;
        }
    }

    stop() {}

    reset() {}
}

export default Reel;