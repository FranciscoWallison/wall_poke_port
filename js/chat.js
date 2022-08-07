let textChat = document.getElementById('text-chat');
let text_dialog_chat;
let interval_chat;
let index_chat = 0;

function typewriter() {
  // PRIMEIRO CADASTRO
  if (index_chat == 0) {
    textChat.innerHTML = "";
  }
  // CRIAR UM SEEP
  if (index_chat >= text_dialog_chat.length) {
    // para o evento do setInterval
    clearInterval(interval_chat);
    // start do movimentos de certas
    moving = true;
    lastKeyPortal = false;
    lastKeyChat = true;
  } else {
    textChat.append(text_dialog_chat[index_chat]);
    index_chat++;
  }
}