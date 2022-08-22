async function onPressEvent(moving) {
  // Init buttons 
  if (
    (keys.z.pressed && lastKey === 'z')
  ) {
    b_button(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  } else
  if (
    // voltar os movimentos 
    moving &&
    window['VALID_PORTAL'] &&
    lastKeyChat &&
    document.querySelector('#showcase_chat').style.display == "none") {
      window['VALID_PORTAL'] = false;
      lastKeyChat = true;
      // moving = true;
      document.querySelector('#showcase_chat').style = "";     
  }

  if (!window['VALID_PORTAL'])
  {
    await eventSetas(moving);
  }
}

async function b_button(player, characters, boundaries, movables, moving) {

  let checkNpcUp = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: 6 },
    validBtn: "b"
  })
  let checkNpcLeft = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 6, y: 0 },
    validBtn: "b"
  })
  let checkNpcDown = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: -6 },
    validBtn: "b"
  })
  let checkNpcRight = checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: -6, y: 0 },
    validBtn: "b"
  })

  if (
    checkNpcUp.type === "placa" ||
    checkNpcLeft.type === "placa" ||
    checkNpcDown.type === "placa" ||
    checkNpcRight.type === "placa"
  ) {
    if(moving && !window['VALID_PORTAL'] && lastKeyChat)
    {
      // para os movimentos de certas
      moving = false;
       window['VALID_PORTAL'] = true;
      lastKeyChat = false;
      index_chat = 0;
      textChat.textContent = '';
      // Iniciando os eventos de chat
      let index = portalsMapData[window["MAP_SELECT"]].map(object => object.type.id).indexOf(characters[checkNpcUp.index].type.id);
      let valid_type = portalsMapData[window["MAP_SELECT"]][index];
      document.querySelector('#showcase_chat').style.display = 'block';
      const textChatTitle = document.getElementById('text-chat-title');
      text_dialog_chat = valid_type.type.text;
      textChatTitle.append(valid_type.type.title);
      textChatTitle.innerHTML = valid_type.type.title;
      await typewriter();

    }else if (index_chat == text_dialog_chat.length) {
      // Validando se o chat está aberto e se terminou de preencher 
      if(
        document.querySelector('#showcase_chat').style.display == "block"
        && 
        moving &&  window['VALID_PORTAL'] && !lastKeyChat & (index_chat == text_dialog_chat.length)
        ){
          lastKeyChat = true;
          document.querySelector('#showcase_chat').style.display = "none";
      }
    }
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

        console.log(valid_type.type.text, "placa");
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

        console.log(valid_type.type.text, "placa");
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

        console.log(valid_type.type.text, "placa");
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

        console.log(valid_type.type.text, "placa");
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
  let lastKeyChat = true;
  window.VALID_PORTAL = false;
  
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
      case 'z':
        keys.z.pressed = true
        lastKey = 'z'
        break

      // moving
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

      case 'z':
        keys.z.pressed = false
        break
      // moving
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
  

async function eventSetas(moving) {
  // Setas
  if (
    (keys.w.pressed && lastKey === 'w' ||
    keys.ArrowUp.pressed && lastKey === 'ArrowUp')
    && !window['VALID_PORTAL']
  ) {
    up(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  } else if (
    (keys.a.pressed && lastKey === 'a' ||
    keys.ArrowLeft.pressed && lastKey === 'ArrowLeft')
    && !window['VALID_PORTAL']
    ) {
    left(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  } else if (
  ( keys.s.pressed && lastKey === 's' ||
    keys.ArrowDown.pressed && lastKey === 'ArrowDown')
    && !window['VALID_PORTAL']
    ) {
    down(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  } else if (
  ( keys.d.pressed && lastKey === 'd' ||
    keys.ArrowRight.pressed && lastKey === 'ArrowRight')
    && !window['VALID_PORTAL']
    ) {
    right(window['player'], window['characters'], window['boundaries'], window['movables'], moving);
  }
}