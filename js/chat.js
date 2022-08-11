let textChat = document.getElementById('text-chat');
let text_dialog_chat;
let interval_chat;
let index_chat = 0;
window.TIME_CHAT = 1000;

// function typewriter() {
//   // PRIMEIRO CADASTRO
//   if (index_chat == 0) {
//     textChat.innerHTML = "";
//   }
//   // CRIAR UM SEEP
//   if (index_chat >= text_dialog_chat.length) {
//     // para o evento do setInterval
//     clearInterval(interval_chat);
//     // start do movimentos de certas
//     moving = true;
//     lastKeyPortal = false;
//     lastKeyChat = true;
//   } else {
//     textChat.append(text_dialog_chat[index_chat]);
//     index_chat++;
//   }
// }

async function typewriter() {
      
  for (let index = 0; index < text_dialog_chat.length; index++) {
    await task(index);
  }
}

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

async function task(index_chat) { // 3
  console.log('keys.z.pressed', keys.z.pressed);
  if (keys.z.pressed) {
    window['TIME_CHAT'] = 100;
  }else{
    window['TIME_CHAT'] = 1000;
  }

  await timer(window['TIME_CHAT']);
  textChat.append(text_dialog_chat[index_chat]); 
}