const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let isTyping = false;

// Append a message bubble
function createMessage(text, isUser = false) {
  const message = document.createElement('div');
  message.classList.add('message');
  message.classList.add(isUser ? 'user-message' : 'assistant-message');
  message.style.animation = 'slam 0.3s ease forwards';
  message.textContent = text;
  chatMessages.appendChild(message);

  // After slam animation, start drift
  message.addEventListener('animationend', () => {
    message.style.animation = '';
    message.style.animation = 'drift 15s ease-in-out infinite alternate';
  });

  scrollToBottom();
  return message;
}

// Scroll chat to bottom
function scrollToBottom() {
  chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
}

// Show typing indicator
function showTyping() {
  typingIndicator.classList.add('visible');
}

// Hide typing indicator
function hideTyping() {
  typingIndicator.classList.remove('visible');
}

// Simulate typing with letter-by-letter update
async function simulateTyping(text, speed = 20) {
  showTyping();
  const typingMessage = createMessage('', false);
  let current = '';
  for (let i = 0; i < text.length; i++) {
    current += text[i];
    typingMessage.textContent = current;
    scrollToBottom();
    await new Promise(r => setTimeout(r, speed));
  }
  hideTyping();
}

// Handle sending user message and getting bot response
async function sendMessage(message) {
  if (!message.trim() || isTyping) return;
  isTyping = true;

  createMessage(message, true); // Show user message
  userInput.value = '';
  userInput.style.height = 'auto';
  sendButton.disabled = true;

  try {
    // Replace this fake delay with actual API call if you want
    await new Promise(r => setTimeout(r, 800));

    const botResponse = `Axel, got your message: "${message}" — let's build some chaos.`;

    await simulateTyping(botResponse, 20);
  } catch (e) {
    createMessage('Error: Could not get response.', false);
  } finally {
    sendButton.disabled = false;
    isTyping = false;
  }
}

// Event listeners
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  sendMessage(userInput.value);
});

userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = userInput.scrollHeight + 'px';
});

// Initial greeting
window.addEventListener('DOMContentLoaded', () => {
  createMessage("Hello Axel. Ready to fuck shit up?");
});