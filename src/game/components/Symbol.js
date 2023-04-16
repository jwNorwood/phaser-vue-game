class Symbol extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, value, name) {
        super(scene, x, y, texture, frame);
        this.value = value;
        this.name = name;
        this.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.onSymbolClicked, this);
        this.displayWidth = 50;
        this.displayHeight = 50;
    }
    onSymbolClicked() {
        console.log(this.name);
    }

    destroy() {
        const cleanUp = () => {
            super.destroy();
        }
        cleanUp();
        // this.scene.tweens.add({
        //     targets: this,
        //     x: Phaser.Math.Between(0, 0),
        //     y: this.y + 200,
        //     angle: this.angle,
        //     alpha: 0,
        //     duration: 1000,
        //     ease: 'Power2',
        //     onComplete: function () {
        //         cleanUp();  
        //     },
        //     callbackScope: this,            
        // });
    }

    match() {
        // todo: add animation
        this.setTint(0xff0000);
    }
}

export default Symbol;