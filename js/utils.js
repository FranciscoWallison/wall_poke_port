function rectangularCollision({typeCollision, rectangle1, rectangle2 }) {

  
  let validCollisionWidth = rectangle2.width;
  let validCollisionHeight = rectangle2.height;
  validCollisionWidth = (rectangle2.width / 2) + 30
  validCollisionHeight = (rectangle2.height / 2) + 16


  let validCharactersWidth = rectangle2.width;
  let validCharactersHeight = rectangle2.height;
  validCharactersWidth = rectangle1.width 
  validCharactersHeight = rectangle1.height- 14

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
  let resut = false;
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
      console.log('go');
      resut = true;
    }
  }
  return resut
}