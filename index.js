window.MAP_SELECT = 0;

window.SELECT_STATUS = 0;

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// mapas
const image_map = [
  './img/mapas/inicial/mapa_1.png',
  './img/new-tuxemon-town.png',
  './img/mapas/inicial/mapa_casa_1.png'
]

const foregroundImage_map = [
  './img/mapas/inicial/mapa_1_foreground_objects.png',
  './img/foregroundObjects-tuxemon.png',
  './img/mapas/inicial/mapa_casa_1_foreground_objects.png'
]
// Referente a dimensão da imagem Tiled
const largura_mapa = [32,44,50];
// Posição do personagem no Mapa Tiled
const offset = [
  {
    x: -350,
    y: -575
  }
  ,
  {
    x: -135,
    y: -1550
  },
  {
    x: -1350,
    y: -1575
  }
]

valid_mobile_on();

const playerDownImage = new Image()
playerDownImage.src = './img/Player/playerDownFemale_1.png'

const playerUpImage = new Image()
playerUpImage.src = './img/Player/playerUpFemale_1.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/Player/playerLeftFemale_1.png'

const playerRightImage = new Image()
playerRightImage.src = './img/Player/playerRightFemale_1.png'

window.player = new Sprite({
  position: {
    x: canvas.width / 2 - 200 / 4 / 2,
    y: canvas.height / 2 - 80 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 8
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  },
  scale: 1.0
})

const keys = {

  z: {
    pressed: false
  },


  // Moving
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  },

  // Arrows
  ArrowUp: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  }

}

update_map();

function animate() {

  if (window['SELECT_STATUS'] != window["MAP_SELECT"] ) {
    update_map();
    window['SELECT_STATUS'] =  window["MAP_SELECT"]
  }

  const animationId = window.requestAnimationFrame(animate)
  window['renderables'].forEach((renderable) => {
    
    typeof renderable.draw() === undefined ? console.log( "teste") : renderable.draw()
  })

  let moving = true
  window['player'].animate = false

  if (battle.initiated) return

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed
    // Arrows
    // || keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowRight.pressed || keys.ArrowDown.pressed
    ) {
    for (let i = 0; i < window['battleZones'].length; i++) {
      const battleZone = window['battleZones'][i]
      const overlappingArea =
        (Math.min(
          window['player'].position.x + window['player'].width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(window['player'].position.x, battleZone.position.x)) *
        (Math.min(
          window['player'].position.y + window['player'].height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(window['player'].position.y, battleZone.position.y))
      if (
        rectangularCollision({
          typeCollision: '',
          rectangle1: window['player'],
          rectangle2: battleZone
        }) &&
        overlappingArea > (window['player'].width * window['player'].height) / 2 &&
        Math.random() < 0.01
      ) {
        // desativar o loop de animação atual
        window.cancelAnimationFrame(animationId)

        audio.Map.stop()
        audio.initBattle.play()
        audio.battle.play()

        battle.initiated = true
        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })
          }
        })
        break
      }
    }
  }

  // Init onPress 
  onPressEvent(moving);
}

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})
