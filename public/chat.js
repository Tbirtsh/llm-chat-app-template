const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');

sendButton.addEventListener('click', () => {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, 'user-message');
  userInput.value = '';
  userInput.disabled = true;
  sendButton.disabled = true;
  typingIndicator.classList.add('visible');
  sendToAPI(text);
});

userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendButton.click();
  }
});

function addMessage(text, type) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', type);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendToAPI(message) {
  try {
    // Assume your API expects a POST with { messages } including the history,
    // but here we'll keep it simple: just the latest user message
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: message }
        ]
      }),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    // If streaming supported, handle text stream:
    if (response.body && response.body.getReader) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('message', 'assistant-message');
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      while(true) {
        const { value, done } = await reader.read();
        if (done) break;
        assistantMsg += decoder.decode(value, {stream: true});
        msgDiv.textContent = assistantMsg;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    } else {
      // fallback to full text response:
      const data = await response.json();
      addMessage(data.result || 'No response', 'assistant-message');
    }
  } catch (err) {
    addMessage('Error: ' + err.message, 'assistant-message');
  } finally {
    typingIndicator.classList.remove('visible');
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
  }
}