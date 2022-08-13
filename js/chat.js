let textChat = document.getElementById('text-chat');
let text_dialog_chat;
let interval_chat;
let index_chat = 0;
window.CHAT_TIME = 1000;

async function typewriter() {
  for (index_chat; index_chat < text_dialog_chat.length; index_chat++) {
    await load_information(index_chat);
  }
}

function timer_chat(ms) { return new Promise(res => setTimeout(res, ms)); }

async function load_information(i) {
  if (keys.z.pressed) {
    window['CHAT_TIME'] = 10;
  }else{
    window['CHAT_TIME'] = 100;
  }

  await timer_chat(window['CHAT_TIME']);
  textChat.append(text_dialog_chat[i]); 
}