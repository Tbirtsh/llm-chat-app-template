:root {
  --bg-color: #0d0d0d;
  --accent: #00ffff;
  --accent-glow: #00ffff99;
  --user-msg: #111;
  --ai-msg: #1a1a1a;
  --text: #f0f0f0;
}

body {
  font-family: 'Courier New', monospace;
  background-color: var(--bg-color);
  color: var(--text);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

header {
  text-align: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--accent-glow);
}

h1 {
  color: var(--accent);
  text-shadow: 0 0 10px var(--accent-glow);
}

.subtitle {
  font-size: 0.9rem;
  color: var(--accent-glow);
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  padding: 1rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 1rem;
  position: relative;
}

.message {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 12px;
  max-width: 75%;
  animation: float 8s ease-in-out infinite alternate;
  position: relative;
  transition: transform 0.2s ease;
}

.user-message {
  background: var(--user-msg);
  align-self: flex-end;
  border: 1px solid var(--accent);
}

.assistant-message {
  background: var(--ai-msg);
  align-self: flex-start;
  border: 1px solid var(--accent-glow);
}

.message.slam {
  animation: slam 0.4s ease;
}

.typing-indicator {
  display: none;
  margin-left: 1rem;
  color: var(--accent);
  font-size: 1.5rem;
  align-self: flex-start;
  animation: shake 0.6s infinite;
}

.typing-indicator.visible {
  display: flex;
}

.typing-indicator span {
  animation: blink 1s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

.message-input {
  display: flex;
  padding: 1rem;
  background: #111;
  border-top: 1px solid var(--accent-glow);
}

#user-input {
  flex: 1;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--accent);
  padding: 0.75rem;
  border-radius: 8px;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
}

#send-button {
  margin-left: 1rem;
  background: var(--accent);
  color: black;
  border: none;
  padding: 0 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 10px var(--accent-glow);
}

footer {
  text-align: center;
  font-size: 0.8rem;
  color: var(--accent-glow);
  padding: 0.5rem 0;
  border-top: 1px solid var(--accent-glow);
}

@keyframes blink {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(1px, -2px); }
  50% { transform: translate(-1px, 2px); }
  75% { transform: translate(2px, 1px); }
  100% { transform: translate(0, 0); }
}

@keyframes float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-5px); }
}

@keyframes slam {
  0% { transform: scale(1.2); }
  100% { transform: scale(1); }
}