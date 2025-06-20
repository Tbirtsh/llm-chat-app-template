const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let isTyping = false;

function createMessage(text, isUser = false) {
  const message = document.createElement('div');
  message.classList.add('message');
  message.classList.add(isUser ? 'user-message' : 'assistant-message');
  message.style.animation = 'slam 0.3s ease forwards';
  message.textContent = text;
  chatMessages.appendChild(message);

  // Start drifting after slam animation
  message.addEventListener('animationend', () => {
    message.style.animation = '';
    message.style.animation = 'drift 15s ease-in-out infinite alternate';
  });

  scrollToBottom();
}

function scrollToBottom() {
  chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
}

function showTyping() {
  typingIndicator.classList.add('visible');
}

function hideTyping() {
  typingIndicator.classList.remove('visible');
}

async function simulateTyping(text, speed = 30) {
  showTyping();
  let current = '';
  for (let i = 0; i < text.length; i++) {
    current += text[i];
    updateLastMessage(current);
    await new Promise(r => setTimeout(r, speed));
  }
  hideTyping();
}

function updateLastMessage(text) {
  const messages = chatMessages.getElementsByClassName('assistant-message');
  if (messages.length === 0) {
    createMessage(text, false);
  } else {
    messages[messages.length - 1].textContent = text;
  }
  scrollToBottom();
}

async function sendMessage(message) {
  if (!message.trim()) return;

  createMessage(message, true);
  userInput.value = '';
  sendButton.disabled = true;

  // Simulate API call to Cloudflare AI Worker here
  showTyping();

  try {
    // Fake delay for demo (replace this with real fetch to your worker)
    await new Promise(r => setTimeout(r, 800));

    // Demo bot response:
    const botResponse = `Axel, got your message: "${message}" — let's build some chaos.`;

    await simulateTyping(botResponse, 20);
  } catch (e) {
    updateLastMessage('Error: Could not get response.');
  } finally {
    sendButton.disabled = false;
    hideTyping();
  }
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!isTyping) {
    sendMessage(userInput.value);
  }
});

userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = userInput.scrollHeight + 'px';
});

// On page load, greet user
window.addEventListener('DOMContentLoaded', () => {
  createMessage("Hello Axel. Ready to fuck shit up?");
});