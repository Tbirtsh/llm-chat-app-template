const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function appendMessage(text, isUser) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.classList.add(isUser ? 'user-message' : 'assistant-message');
  const p = document.createElement('p');
  msgDiv.appendChild(p);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });

  if (isUser) {
    p.textContent = text;
    msgDiv.classList.add('drift');
  } else {
    typeText(p, text, msgDiv);
  }
}

async function typeText(element, text, container) {
  element.textContent = '';
  container.classList.add('shaking');
  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await new Promise((r) => setTimeout(r, 18));
  }
  container.classList.remove('shaking');
  container.classList.add('drift');
}

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;
  appendMessage(input, true);
  userInput.value = '';
  typingIndicator.style.display = 'block';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: input }] })
    });
    const data = await response.json();
    typingIndicator.style.display = 'none';
    appendMessage(data.response || 'Error: No response', false);
  } catch (err) {
    typingIndicator.style.display = 'none';
    appendMessage('Error: Load failed', false);
  }
}
