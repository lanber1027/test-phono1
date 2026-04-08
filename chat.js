function appendMessage(role, text) {
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  const message = document.createElement('div');
  message.className = `chat-message ${role}`;
  message.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  messages.appendChild(message);

  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 30);
}

function appendTyping() {
  const messages = document.getElementById('chat-messages');
  const typing = document.createElement('div');
  typing.className = 'chat-message ai';
  typing.id = 'typing-message';
  typing.innerHTML = `<div class="bubble">正在输入...</div>`;
  messages.appendChild(typing);

  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 30);
}

function removeTyping() {
  const typing = document.getElementById('typing-message');
  if (typing) typing.remove();
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

async function sendMessage() {
  const inputEl = document.getElementById('chat-input');
  const text = inputEl.value.trim();

  if (!text) return;

  appendMessage('user', text);
  inputEl.value = '';

  appendTyping();

  try {
    const reply = await callAI(text);
    removeTyping();
    appendMessage('ai', reply);
  } catch (err) {
    removeTyping();
    appendMessage('ai', `出错了：${err.message}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-btn');
  const inputEl = document.getElementById('chat-input');

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});