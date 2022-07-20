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

// 192
// 68
// 72,000
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
    renderable.draw()
  })

  let moving = true
  window['player'].animate = false

  if (battle.initiated) return

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed
    // Arrows
    || keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowRight.pressed || keys.ArrowDown.pressed
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

  if (
    (keys.w.pressed && lastKey === 'w' ||
    keys.ArrowUp.pressed && lastKey === 'ArrowUp')
    && !lastKeyPortal
  ) {
    up(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  } else if (
    (keys.a.pressed && lastKey === 'a' ||
    keys.ArrowLeft.pressed && lastKey === 'ArrowLeft')
    && !lastKeyPortal
    ) {
    left(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  } else if (
   ( keys.s.pressed && lastKey === 's' ||
    keys.ArrowDown.pressed && lastKey === 'ArrowDown')
    && !lastKeyPortal
    ) {
    down(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  } else if (
   ( keys.d.pressed && lastKey === 'd' ||
    keys.ArrowRight.pressed && lastKey === 'ArrowRight')
    && !lastKeyPortal
    ) {
    right(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  }

}

function up(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.up

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: 6 },
    validBtn: "up"
  })

  if (checkNpc.result) {
    moving = false
    let index = portalsMapData[window["MAP_SELECT"]].map(object => object.typeId.id).indexOf(characters[checkNpc.index].typeId.id);
    let valid_type = portalsMapData[window["MAP_SELECT"]][index];
    if (valid_type.typeId.type === 'portal') {
      lastKeyPortal = true
      delay(400, movables, 'up')
       .then((e) => {
         window['MAP_SELECT'] = valid_type.teleport
       })
       .catch((e) => console.log('catch', e))
       .finally((e) => {
         lastKeyPortal = false
       })
    }
  }else
  {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          typeCollision: typeCollision,
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 6
            }
          }
        })
      ) {
        //  console.log('boundary', player, boundary.position.x, boundary.position.y + 3);
        moving = false
        break
      }
    }
  }

  if (moving){    
    movables.forEach((movable) => {
      movable.position.y += 6
    })
  }
    
}

function left(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.left

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 6, y: 0 },
    validBtn: "left"
  })

  if (checkNpc.result) {
    moving = false
    let index = portalsMapData[window["MAP_SELECT"]].map(object => object.typeId.id).indexOf(characters[checkNpc.index].typeId.id);
    let valid_type = portalsMapData[window["MAP_SELECT"]][index];
    if (valid_type.typeId.type === 'portal') {
      lastKeyPortal = true
      delay(400, movables, 'left')
       .then((e) => {
         window['MAP_SELECT'] = valid_type.teleport
       })
       .catch((e) => console.log('catch', e))
       .finally((e) => {
         lastKeyPortal = false
       })
    }
  }else
  {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          typeCollision: typeCollision,
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 6,
              y: boundary.position.y
            }
          }
        })
      ) {
        //  console.log('boundary boundary.position.x + 3', player, boundary.position.x + 3, boundary.position.y);
        moving = false
        break
      }
    }
  }
  if (moving)
    movables.forEach((movable) => {
      movable.position.x += 6
    })
}


function right(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.right

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: -6, y: 0 },
    validBtn: "right"
  })

  if (checkNpc.result) {
    moving = false
    let index = portalsMapData[window["MAP_SELECT"]].map(object => object.typeId.id).indexOf(characters[checkNpc.index].typeId.id);
    let valid_type = portalsMapData[window["MAP_SELECT"]][index];
    if (valid_type.typeId.type === 'portal') {
      lastKeyPortal = true
      delay(400, movables, 'right')
       .then((e) => {
         window['MAP_SELECT'] = valid_type.teleport
       })
       .catch((e) => console.log('catch', e))
       .finally((e) => {
         lastKeyPortal = false
       })
    }  
  }else
  {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          typeCollision: typeCollision,
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 6,
              y: boundary.position.y
            }
          }
        })
      ) {
        //  console.log('boundary boundary.position.x', player, boundary.position.x - 3, boundary.position.y);
        moving = false
        break
      }
    }
  }
  if (moving)
    movables.forEach((movable) => {
      movable.position.x -= 6
    })
}


function down(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.down

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: -6 },
    validBtn: "down"
  })

  if (checkNpc.result) {
    moving = false
    let index = portalsMapData[window["MAP_SELECT"]].map(object => object.typeId.id).indexOf(characters[checkNpc.index].typeId.id);
    let valid_type = portalsMapData[window["MAP_SELECT"]][index];
    if (valid_type.typeId.type === 'portal') {
      lastKeyPortal = true
      delay(400, movables, 'down')
       .then((e) => {
         window['MAP_SELECT'] = valid_type.teleport
       })
       .catch((e) => console.log('catch', e))
       .finally((e) => {
         lastKeyPortal = false
       })
    }  
  }else
  {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          typeCollision: typeCollision,
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 6
            }
          }
        })
      ) {
        //  console.log('boundary boundary.position.y -3', player, boundary.position.x, boundary.position.y -3);
        moving = false
        break
      }
    }
  }
  if (moving)
    movables.forEach((movable) => {
      movable.position.y -= 6
    })
}

let lastKey = ''
let lastKeyPortal = false
function mouseDown(keypress) {
  plusDivs(keypress,true);
}

function mouseUp(keypress) {
  plusDivs(keypress,false);
}

function plusDivs(keypress, boolean) {
  switch (keypress) {
    case 8:
      keys.w.pressed = boolean      
      lastKey = 'w'
      break
    case 4:
      keys.a.pressed = boolean      
      lastKey = 'a'
      break
    case 2:
      keys.s.pressed = boolean      
      lastKey = 's'
      break
    case 6:
      keys.d.pressed = boolean      
      lastKey = 'd'
      break
  }
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break

    // Arrows
    case 'ArrowUp':
      keys.ArrowUp.pressed = true
      lastKey = 'ArrowUp'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      lastKey = 'ArrowLeft'
      break
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      lastKey = 'ArrowRight'
      break
    case 'ArrowDown':
      keys.ArrowDown.pressed = true
      lastKey = 'ArrowDown'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break

    // Arrows
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
      break
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowDown':
      keys.ArrowDown.pressed = false
      break
  }
})

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})
