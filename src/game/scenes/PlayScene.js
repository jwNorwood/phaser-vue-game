import {
  Scene
} from 'phaser'
import Board from '../components/Board'
import symbols from '../constants/symbols'

export default class PlayScene extends Scene {
  constructor() {
    super({
      key: 'PlayScene'
    })
  }

  create() {
    this.add.image(400, 300, 'sky')

    const board = new Board(this, 50, 50, symbols, 10, 14)
    this.add.existing(board)

    this.add.text(400, 550, 'Spin', {
      font: '24px Arial',
      fill: '#fff'
    }).setOrigin(0.5).setInteractive().on('pointerdown', function () {
      board.spin()
    })
  }

  update() {}
}