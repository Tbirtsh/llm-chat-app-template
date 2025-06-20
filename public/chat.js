const messagesContainer = document.getElementById('chat-messages');
const inputField = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');

// Load memory
window.addEventListener('load', () => {
  const saved = localStorage.getItem('chat-history');
  if (saved) {
    messagesContainer.innerHTML = saved;
  }
  scrollToBottom();
});

function addMessage(content, className) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${className}`;
  messageEl.innerHTML = '';
  messagesContainer.appendChild(messageEl);
  scrollToBottom();

  // Slam effect
  requestAnimationFrame(() => {
    messageEl.classList.add('slam');
  });

  // Type animation
  let i = 0;
  const interval = setInterval(() => {
    messageEl.innerHTML += content[i++];
    if (i >= content.length) {
      clearInterval(interval);
      saveChat();
    }
    scrollToBottom();
  }, 15); // Faster typing
}

function saveChat() {
  localStorage.setItem('chat-history', messagesContainer.innerHTML);
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
  const userInput = inputField.value.trim();
  if (!userInput) return;

  addMessage(userInput, 'user-message');
  inputField.value = '';
  typingIndicator.classList.add('visible');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: userInput }] }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    typingIndicator.classList.remove('visible');

    if (data?.response) {
      addMessage(data.response, 'assistant-message');
    } else {
      addMessage('Error: No response from model.', 'assistant-message');
    }
  } catch (e) {
    typingIndicator.classList.remove('visible');
    addMessage('Error: Load failed', 'assistant-message');
  }
}

sendButton.addEventListener('click', sendMessage);
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});