const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let isTyping = false;

function createMessage(text, isUser = false) {
  const msg = document.createElement('div');
  msg.classList.add('message', isUser ? 'user-message' : 'assistant-message');
  msg.textContent = text;
  msg.style.animation = 'slam 0.3s ease forwards';

  chatMessages.appendChild(msg);
  scrollToBottom();

  // After slam anim, start drifting
  msg.addEventListener('animationend', () => {
    msg.style.animation = '';
    msg.style.animation = 'drift 15s ease-in-out infinite alternate';
  });

  return msg;
}

function scrollToBottom() {
  chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
}

async function simulateTyping(text, speed = 15) {
  typingIndicator.classList.add('visible');

  // Create the typing bubble
  const typingBubble = document.createElement('div');
  typingBubble.classList.add('message', 'assistant-message');
  chatMessages.appendChild(typingBubble);
  scrollToBottom();

  let currentText = '';
  for (let i = 0; i < text.length; i++) {
    currentText += text[i];
    typingBubble.textContent = currentText;
    scrollToBottom();
    await new Promise(r => setTimeout(r, speed));
  }

  typingIndicator.classList.remove('visible');

  // Slam + drift animation after done typing
  typingBubble.style.animation = 'slam 0.3s ease forwards';
  typingBubble.addEventListener('animationend', () => {
    typingBubble.style.animation = 'drift 15s ease-in-out infinite alternate';
  });
}

async function sendMessage(message) {
  if (!message.trim() || isTyping) return;

  isTyping = true;

  // Add user message once
  createMessage(message, true);

  userInput.value = '';
  userInput.style.height = 'auto';
  sendButton.disabled = true;

  try {
    // Simulate delay / replace with your API call
    await new Promise(r => setTimeout(r, 500));

    const botReply = `Axel, got your message: "${message}" — let's build some chaos.`;

    await simulateTyping(botReply);

  } catch {
    createMessage('Error: Could not fetch response', false);
  } finally {
    sendButton.disabled = false;
    isTyping = false;
  }
}

sendButton.addEventListener('click', () => sendMessage(userInput.value));
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(userInput.value);
  }
});

userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = userInput.scrollHeight + 'px';
});

// Initial greeting
window.addEventListener('load', () => {
  createMessage('Hello Axel. Ready to fuck shit up?');
});