function onPressEvent(moving) {
  // Init buttons 


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
    
    switch (checkNpc.type) {
      case "portal":
        checkInteraction(characters, checkNpc, movables, "up");
        break;
      case "placa":
        let index = portalsMapData[window["MAP_SELECT"]].map(object => object.type.id).indexOf(characters[checkNpc.index].type.id);
        let valid_type = portalsMapData[window["MAP_SELECT"]][index];

        console.log(valid_type.type.text);
        moving = false;
        break;
    
      default:
        break;
    }
    if (!checkNpc.result) 
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

    switch (checkNpc.type) {
      case "portal":
        checkInteraction(characters, checkNpc, movables, "left");
        break;
      case "placa":
        let index = portalsMapData[window["MAP_SELECT"]].map(object => object.type.id).indexOf(characters[checkNpc.index].type.id);
        let valid_type = portalsMapData[window["MAP_SELECT"]][index];
        // abrir o dialogo e validar se tem um dialogo aberto
        console.log(valid_type.type.text);
        // alert(valid_type.type.text);
        moving = false;
        break;
    
      default:
        break;
    }
    if (!checkNpc.result)
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
  
    switch (checkNpc.type) {
      case "portal":
        checkInteraction(characters, checkNpc, movables, "right");
        break;
      case "placa":
        let index = portalsMapData[window["MAP_SELECT"]].map(object => object.type.id).indexOf(characters[checkNpc.index].type.id);
        let valid_type = portalsMapData[window["MAP_SELECT"]][index];

        console.log(valid_type.type.text);
        moving = false;
        break;
    
      default:
        break;
    }
    if (!checkNpc.result)
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
  
    switch (checkNpc.type) {
      case "portal":
        checkInteraction(characters, checkNpc, movables, "down");
        break;
      case "placa":
        let index = portalsMapData[window["MAP_SELECT"]].map(object => object.type.id).indexOf(characters[checkNpc.index].type.id);
        let valid_type = portalsMapData[window["MAP_SELECT"]][index];

        console.log(valid_type.type.text);
        moving = false;
        break;
    
      default:
        break;
    }
    if (!checkNpc.result)
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
  