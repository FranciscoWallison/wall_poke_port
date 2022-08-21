function rectangularCollision({typeCollision, rectangle1, rectangle2 }) {

  let validCollisionWidth = rectangle2.width;
  let validCollisionHeight = rectangle2.height;
  validCollisionWidth = (rectangle2.width / 2) + 30
  validCollisionHeight = (rectangle2.height / 2) + 16


  let validCharactersWidth = rectangle1.width;
  let validCharactersHeight = rectangle1.height;
  validCharactersWidth = rectangle1.width 
  validCharactersHeight = rectangle1.height - 30

  let valid = false;

  if (
      rectangle1.position.x + validCharactersWidth >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + validCollisionWidth &&
      rectangle1.position.y <= rectangle2.position.y + validCollisionHeight &&
      rectangle1.position.y + validCharactersHeight >= rectangle2.position.y
    ) {
      valid = true;
  }
  
  return valid;
}

function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 },
  validBtn
}) {
  let result = {
    index: 0,
    result: false,
    type: "",
  };
  // monitor para colisão de NPC
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]    

    if (
      rectangularCollision({
        typeCollision: 'npc',
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y
          }
        }
      })
    ) {
      const index = characters.map(object => object.type.id).indexOf(character.type.id);
      if (character.type.validBtn === validBtn) {
        if(character.type.type === 'portal'){
          const new_characters = window['characters'][index];
          new_characters.animate = true;
          window['characters'][index] = new_characters;
        }
        result.result = true;        
      }

      result.type = character.type.type;
      result.index = index;
    }
  }
  return result
}


const delayInteraction = (t, movables, type) => new Promise(resolve => setTimeout(() =>
{
  
  for (var i = 0; i <= 3; i++) {
    (function(index,movables_new) {
        setTimeout(function() { 
          window['player'].animate = true
          window['player'].frames.val = index
          if (type == 'up') {
            movables_new.forEach((movable) => {
              movable.position.y += (index +3)
            })
          }else if (type === 'left') {
            movables_new.forEach((movable) => {
              movable.position.x += (index +3)
            })
          }else if (type === 'right') {
            movables_new.forEach((movable) => {
              movable.position.x -= (index +3)
            })
          }else if (type === 'down') {
            movables_new.forEach((movable) => {
              movable.position.y -= (index +3)
            })
          }
          
          if (index == 3) {
            resolve('teste');
          }
        }, i * t);
    })(i,movables);   
  } 
}, t));

const checkInteraction = async (characters, checkNpc, movables, validBtn) => {
  let index = portalsMapData[window["MAP_SELECT"]].map(object => object.type.id).indexOf(characters[checkNpc.index].type.id);
  let valid_type = portalsMapData[window["MAP_SELECT"]][index];
  if (valid_type.type.type === 'portal') {
    moving = false;
    window['VALID_PORTAL'] = true;
    document.querySelector('#showcase_chat').style = "";
    console.log("portal",moving,  window['VALID_PORTAL']);
    await delayInteraction(400, movables, validBtn)
     .then((e) => {
       window['MAP_SELECT'] = valid_type.teleport
     })
     .catch((e) => console.log('catch', e))
     .finally((e) => {
        window['VALID_PORTAL'] = false
     })
  }
}