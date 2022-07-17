function rectangularCollision({typeCollision, rectangle1, rectangle2 }) {

  let validCollisionWidth = rectangle2.width;
  let validCollisionHeight = rectangle2.height;
  validCollisionWidth = (rectangle2.width / 2) + 30
  validCollisionHeight = (rectangle2.height / 2) + 16


  let validCharactersWidth = rectangle2.width;
  let validCharactersHeight = rectangle2.height;
  validCharactersWidth = rectangle1.width 
  validCharactersHeight = rectangle1.height - 20

  let valid = false;

  if (
      rectangle1.position.x + validCharactersWidth >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + validCollisionWidth &&
      rectangle1.position.y <= rectangle2.position.y + validCollisionHeight &&
      rectangle1.position.y + validCharactersHeight >= rectangle2.position.y
    ) {
      valid = true;
        console.log
      (
        'conta'
        ,
        `${rectangle1.position.x} +  ${validCharactersWidth} >= ${rectangle2.position.x} &&
        ${rectangle1.position.x} <= ${rectangle2.position.x} + ${validCollisionWidth} &&
        ${rectangle1.position.y} <= ${rectangle2.position.y} + ${validCollisionHeight} &&
        ${rectangle1.position.y} +  ${validCharactersHeight} >= ${rectangle2.position.y}`
      )
  }
  
  return valid;
}

function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 }
}) {
  let result = {
    index: 0,
    result: false
  };
  // monitor para colisão de NPC
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]
    console.log('character', character.position.x + characterOffset.x,
    character.position.y + characterOffset.y)
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
      const index = characters.map(object => object.typeId.id).indexOf(character.typeId.id);
      if(character.typeId.id === 11224){        
        const new_characters = window['characters'][index];
        new_characters.animate = true;
        window['characters'][index] = new_characters;
      }
      console.log('go', window['characters']);
      result.result = true;
      result.index = index;
    }
  }
  return result
}


const delay = (t, movables, type) => new Promise(resolve => setTimeout(() =>
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