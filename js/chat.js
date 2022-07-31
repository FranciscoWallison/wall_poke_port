let textChat = document.getElementById('text-chat');
let text_dialog_chat;
let interval_chat;
let index_chat = 0;

function typewriter() {
  if (index_chat >= text_dialog_chat.length) {

    clearInterval(interval_chat);
  } else {
    textChat.append(text_dialog_chat[index_chat]);
    index_chat++;
  }
}