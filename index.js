const MAP_SELECT = 0;

const image_map = [
  './img/mapas/inicial/mapa_1.png'
  ,
  './img/new-tuxemon-town.png'
]

const foregroundImage_map = [
  './img/mapas/inicial/mapa_1_foreground_objects.png'
  ,
  './img/foregroundObjects-tuxemon.png'
]

valid_mobile_on();

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Referente a dimensão da imagem Tiled
let largura_mapa = [32,44];

const collisionsMap = []
for (let i = 0; i < collisions[MAP_SELECT].length; i += largura_mapa[MAP_SELECT]) {
  collisionsMap.push(collisions[MAP_SELECT].slice(i, largura_mapa[MAP_SELECT] + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData[MAP_SELECT].length; i += largura_mapa[MAP_SELECT]) {
  battleZonesMap.push(battleZonesData[MAP_SELECT].slice(i, largura_mapa[MAP_SELECT] + i))
}

const charactersMap = []
for (let i = 0; i < charactersMapData[MAP_SELECT].length; i += largura_mapa[MAP_SELECT]) {
  charactersMap.push(charactersMapData[MAP_SELECT].slice(i, largura_mapa[MAP_SELECT] + i))
}
console.log(charactersMap)

const boundaries = []
// Posição do personagem no Mapa Tiled
let offset = [
  {
    x: -200,
    y: -550
  }
  ,
  {
    x: -135,
    y: -1550
  }
]

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset[MAP_SELECT].x,
            y: i * Boundary.height + offset[MAP_SELECT].y
          }
        })
      )
  })
})



const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset[MAP_SELECT].x,
            y: i * Boundary.height + offset[MAP_SELECT].y
          }
        })
      )
  })
})

const characters = []
const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // 1026 === villager
    // if (symbol === 1026) {
    //   characters.push(
    //     new Sprite({
    //       position: {
    //         x: j * Boundary.width + offset[MAP_SELECT].x,
    //         y: i * Boundary.height + offset[MAP_SELECT].y
    //       },
    //       image: villagerImg,
    //       frames: {
    //         max: 4,
    //         hold: 60
    //       },
    //       scale: 3,
    //       animate: true
    //     })
    //   )
    // }
    // // 1031 === oldMan
    // else if (symbol === 1031) {
    //   characters.push(
    //     new Sprite({
    //       position: {
    //         x: j * Boundary.width + offset[MAP_SELECT].x,
    //         y: i * Boundary.height + offset[MAP_SELECT].y
    //       },
    //       image: oldManImg,
    //       frames: {
    //         max: 4,
    //         hold: 60
    //       },
    //       scale: 3
    //     })
    //   )
    // }

    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset[MAP_SELECT].x,
            y: i * Boundary.height + offset[MAP_SELECT].y
          }
        })
      )
    }
  })
})

const image = new Image()
// Usando a ferramenta do Tiled "Usar o nível de zoom atual" para exportar a imagem 
image.src = image_map[MAP_SELECT]
console.log('image',image);
const foregroundImage = new Image()
// Usando a ferramenta do Tiled "Usar o nível de zoom atual" para exportar a imagem 
foregroundImage.src = foregroundImage_map[MAP_SELECT]

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: {
    x: offset[MAP_SELECT].x,
    y: offset[MAP_SELECT].y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset[MAP_SELECT].x,
    y: offset[MAP_SELECT].y 
  },
  image: foregroundImage
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

const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters,
]
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground
]

const battle = {
  initiated: false
}

function animate() {
  const animationId = window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false

  if (battle.initiated) return

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed
    // Arrows
    || keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowRight.pressed || keys.ArrowDown.pressed
    ) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({
          typeCollision: '',
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        // deactivate current animation loop
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

  if (keys.w.pressed && lastKey === 'w') {
    up(player, characters, boundaries, movables, moving);
  } else if (keys.a.pressed && lastKey === 'a') {
    left(player, characters, boundaries, movables, moving);
  } else if (keys.s.pressed && lastKey === 's') {
    down(player, characters, boundaries, movables, moving);
  } else if (keys.d.pressed && lastKey === 'd') {
    right(player, characters, boundaries, movables, moving);
  }

  // Arrows
  else if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
    up(player, characters, boundaries, movables, moving);
  } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
    left(player, characters, boundaries, movables, moving);
  } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
    right(player, characters, boundaries, movables, moving);
  } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
    down(player, characters, boundaries, movables, moving);
  }
}

function up(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.up

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: 3 }
  })

  if (checkNpc) {
    typeCollision = 'npc';
  }

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
            y: boundary.position.y + 3
          }
        }
      })
    ) {
      moving = false
      break
    }
  }

  if (moving)
    movables.forEach((movable) => {
      movable.position.y += 3
    })
}

function left(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.left

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 3, y: 0 }
  })

  if (checkNpc) {
    typeCollision = 'npc';
  }

  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      rectangularCollision({
        typeCollision: typeCollision,
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y
          }
        }
      })
    ) {
      moving = false
      break
    }
  }

  if (moving)
    movables.forEach((movable) => {
      movable.position.x += 3
    })
}


function right(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.right

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: -3, y: 0 }
  })

  if (checkNpc) {
    typeCollision = 'npc';
  }

  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      rectangularCollision({
        typeCollision: typeCollision,
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }
        }
      })
    ) {
      moving = false
      break
    }
  }

  if (moving)
    movables.forEach((movable) => {
      movable.position.x -= 3
    })
}


function down(player, characters, boundaries, movables, moving) {
  player.animate = true
  player.image = player.sprites.down

  let typeCollision = '';
  let checkNpc = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: -3 }
  })

  if (checkNpc) {
    typeCollision = 'npc';
  }

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
            y: boundary.position.y
          }
        }
      })
    ) {
      moving = false
      break
    }
  }

  if (moving)
    movables.forEach((movable) => {
      movable.position.y -= 3
    })
}

let lastKey = ''
let tell_keypress = 0;
function plusDivs(keypress) {
  console.log(keypress, 'plusDivs', lastKey, lastKey == 'd')
  switch (keypress) {
    case 8:
      if(tell_keypress == 0 && lastKey == 'w'){
        keys.w.pressed = false
        tell_keypress++; 
      }else{
        keys.w.pressed = true
        tell_keypress = 0
      }
      lastKey = 'w'
      break
    case 4:
      if(tell_keypress == 0 && lastKey == 'a'){
        keys.a.pressed = false
        tell_keypress++; 
      }else{
        keys.a.pressed = true
        tell_keypress = 0
      }
      lastKey = 'a'
      break

    case 2:
      if(tell_keypress == 0 && lastKey == 's'){
        keys.s.pressed = false
        tell_keypress++; 
      }else{
        keys.s.pressed = true
        tell_keypress = 0
      }
      lastKey = 's'
      break

    case 6:
      if(tell_keypress == 0 && lastKey == 'd'){
        keys.d.pressed = false
        tell_keypress++; 
      }else{
        keys.d.pressed = true
        tell_keypress = 0
      }
      lastKey = 'd'
      break
  }

// setTimeout(function(){
//   keys.w.pressed = false
// }, 1000); 

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
