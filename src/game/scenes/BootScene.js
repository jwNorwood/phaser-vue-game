import { Scene } from 'phaser'
import sky from '@/game/assets/sky.png'
import coin from '@/game/assets/coin.png'
import coins from '@/game/assets/coins.png'
import gem from '@/game/assets/gem.png'
import orange from '@/game/assets/orange.png'
import green from '@/game/assets/green.png'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', sky)
    this.load.image('coin', coin)
    this.load.image('coins', coins)
    this.load.image('gem', gem)
    this.load.image('orange', orange)
    this.load.image('green', green)
  }

  create () {
    this.scene.start('PlayScene')
  }
}
