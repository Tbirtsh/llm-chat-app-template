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
  msgDiv.appendChild(p);

  chatMessages.appendChild(msgDiv);

  // Animate fade-in for container
  requestAnimationFrame(() => {
    msgDiv.style.opacity = '1';
  });

  // Scroll smoothly to bottom
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: 'smooth',
  });

  if (isUser) {
    p.textContent = text; // Just show user message immediately
  } else {
    // Animate typing for AI response
    typeText(p, text);
  }
}

// Typing effect function
async function typeText(element, text) {
  element.textContent = '';
  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await new Promise((r) => setTimeout(r, 30)); // 30ms per char, adjust speed here
  }
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
    // Replace this with your actual API call
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

// Example fake API for demo, replace with your real fetch call:
function fakeChatAPI(prompt) {
  return new Promise((res) => {
    setTimeout(() => {
      res({ response: "Sup! What's up? Need help with something or just wanna chat?" });
    }, 1500);
  });
}

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

userInput.focus();