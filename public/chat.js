const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');

function appendMessage(text, isUser) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.classList.add(isUser ? 'user-message' : 'assistant-message');
  msgDiv.style.opacity = '0';

  const p = document.createElement('p');
  p.textContent = text;
  msgDiv.appendChild(p);

  chatMessages.appendChild(msgDiv);

  // Trigger fade-in animation
  requestAnimationFrame(() => {
    msgDiv.style.opacity = '1';
  });

  // Scroll smoothly to bottom
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: 'smooth',
  });
}

function setLoading(isLoading) {
  if (isLoading) {
    typingIndicator.style.display = 'flex';
    sendButton.disabled = true;
    userInput.disabled = true;
  } else {
    typingIndicator.style.display = 'none';
    sendButton.disabled = false;
    userInput.disabled = false;
    userInput.focus();
  }
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, true);
  userInput.value = '';
  setLoading(true);

  try {
    // Replace with your actual API call
    const response = await fakeChatAPI(text);

    if (response && response.response) {
      appendMessage(response.response, false);
    } else {
      appendMessage('🤖 AI gave no answer, what the hell?', false);
    }
  } catch (e) {
    appendMessage('⚠️ Error: ' + e.message, false);
  } finally {
    setLoading(false);
  }
}

// Example fake API to demo, replace with real fetch call:
function fakeChatAPI(prompt) {
  return new Promise((res) => {
    setTimeout(() => {
      res({ response: "Sup! What's up? Need help with something or just wanna chat?" });
    }, 1500);
  });
}

// Handle send button click
sendButton.addEventListener('click', sendMessage);

// Handle Enter key in textarea
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Autofocus on load
userInput.focus();