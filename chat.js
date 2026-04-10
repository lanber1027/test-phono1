const CHAT_STORAGE_PREFIX = 'dreamtopia_chat_history_v2_';

let chatHistory = [];
let currentController = null;
let pendingUserMessageId = null;
let pendingAiMessageId = null;
let pendingImageAttachment = null;
let chatMenuOpen = false;

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function getChatKey() {
  const id = window.currentConversationId || 'default';
  return `${CHAT_STORAGE_PREFIX}${id}`;
}

function saveHistory() {
  localStorage.setItem(getChatKey(), JSON.stringify(chatHistory));
}

function normalizeChatAttachment(attachment) {
  if (!attachment || typeof attachment !== 'object') return null;
  if (attachment.type !== 'image') return null;

  const dataUrl = String(attachment.dataUrl || attachment.url || '').trim();
  if (!dataUrl) return null;

  return {
    type: 'image',
    dataUrl,
    name: String(attachment.name || '图片').trim() || '图片'
  };
}

function normalizeChatHistory(list) {
  if (!Array.isArray(list)) return [];

  return list.map(item => ({
    id: item.id || `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    role: item.role === 'user' || item.role === 'ai' || item.role === 'system' ? item.role : 'system',
    content: String(item.content || '').trim(),
    apiText: String(item.apiText || '').trim(),
    memoryContent: String(item.memoryContent || item.content || '').trim(),
    attachment: normalizeChatAttachment(item.attachment)
  }));
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(getChatKey());
    chatHistory = normalizeChatHistory(raw ? JSON.parse(raw) : []);
  } catch {
    chatHistory = [];
  }
}

function updateChatHeaderTitle() {
  const titleEl = document.querySelector('#chat-screen .header-title');
  if (!titleEl) return;

  const conv = typeof getConversationById === 'function'
    ? getConversationById(window.currentConversationId)
    : null;

  if (typeof getConversationDisplayName === 'function') {
    titleEl.textContent = getConversationDisplayName(conv);
    return;
  }

  titleEl.textContent = conv?.remark || conv?.title || conv?.nameIdentity || 'AI 聊天';
}

function loadCurrentConversationIntoChat() {
  loadHistory();
  updateChatHeaderTitle();
  clearPendingImageAttachment();
  setChatMenuOpen(false);
  renderMessages();
  autoResizeChatInput();
}

function getCurrentConversation() {
  return typeof getConversationById === 'function'
    ? getConversationById(window.currentConversationId)
    : null;
}

function buildChatAvatarNode({ imageUrl = '', text = 'AI', accent = '#6d5755', className = 'chat-avatar' } = {}) {
  const avatar = document.createElement('div');
  avatar.className = className;
  avatar.style.setProperty('--accent', accent);

  if (imageUrl) {
    avatar.classList.add('is-image');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = text || '头像';
    avatar.appendChild(img);
  } else {
    avatar.textContent = text || 'AI';
  }

  return avatar;
}

function buildChatImageCard(dataUrl, alt = '已发送图片') {
  const card = document.createElement('div');
  card.className = 'chat-media-card';

  const image = document.createElement('img');
  image.className = 'chat-media-preview';
  image.src = dataUrl;
  image.alt = alt;

  card.appendChild(image);
  return card;
}

function clearPendingImageAttachment() {
  pendingImageAttachment = null;
  const fileInput = document.getElementById('chat-image-input');
  if (fileInput) fileInput.value = '';
  renderPendingAttachmentPreview();
}

function renderPendingAttachmentPreview() {
  const preview = document.getElementById('chat-attachment-preview');
  if (!preview) return;

  if (!pendingImageAttachment?.dataUrl) {
    preview.classList.add('hidden');
    preview.innerHTML = '';
    return;
  }

  preview.classList.remove('hidden');
  preview.innerHTML = `
    <img class="chat-attachment-thumb" src="${escapeHtml(pendingImageAttachment.dataUrl)}" alt="${escapeHtml(pendingImageAttachment.name || '待发送图片')}" />
    <div class="chat-attachment-copy">
      <p class="chat-attachment-title">已选择图片</p>
      <p class="chat-attachment-hint">按 Enter 会把这张图片和当前文字一起发给 AI。</p>
    </div>
    <button type="button" class="chat-attachment-remove" id="chat-attachment-remove-btn" aria-label="移除图片">&times;</button>
  `;
}

function setChatMenuOpen(nextState) {
  chatMenuOpen = Boolean(nextState);
  const menu = document.getElementById('chat-mini-menu');
  const button = document.getElementById('chat-menu-btn');
  if (menu) {
    menu.classList.toggle('active', chatMenuOpen);
    menu.setAttribute('aria-hidden', chatMenuOpen ? 'false' : 'true');
  }
  if (button) {
    button.setAttribute('aria-expanded', chatMenuOpen ? 'true' : 'false');
  }
}

function buildImagePromptText(text = '') {
  const trimmed = String(text || '').trim();
  if (trimmed) {
    return `用户发送了一张图片，并附带了这句话：${trimmed}\n请结合图片内容与当前角色设定来回应。`;
  }

  return '用户发送了一张图片。请结合图片内容与当前角色设定来回应。';
}

function buildHistoryMessageContent(item) {
  if (!item?.attachment || item.attachment.type !== 'image') {
    return item.memoryContent || item.content;
  }

  if (item.id === pendingUserMessageId && item.role === 'user') {
    return [
      {
        type: 'text',
        text: item.apiText || buildImagePromptText(item.content)
      },
      {
        type: 'image_url',
        image_url: {
          url: item.attachment.dataUrl
        }
      }
    ];
  }

  return item.memoryContent || item.content || '用户发来了一张图片。';
}

function handleChatImageSelection(file) {
  if (!file) return;
  if (!String(file.type || '').startsWith('image/')) {
    alert('请上传图片文件。');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    pendingImageAttachment = {
      type: 'image',
      dataUrl: typeof reader.result === 'string' ? reader.result : '',
      name: String(file.name || '图片').trim() || '图片'
    };
    renderPendingAttachmentPreview();
    document.getElementById('chat-input')?.focus();
  };
  reader.onerror = () => {
    alert('读取图片失败，请重试。');
  };
  reader.readAsDataURL(file);
}

function renderMessages() {
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  messages.innerHTML = '';
  const conversation = getCurrentConversation();
  const incomingAvatar = typeof getConversationAvatarInfo === 'function'
    ? getConversationAvatarInfo(conversation)
    : { imageUrl: '', text: 'AI', accent: '#6d5755' };

  if (!chatHistory.length) {
    const emptyRow = document.createElement('div');
    emptyRow.className = 'chat-message ai';

    const stack = document.createElement('div');
    stack.className = 'chat-stack';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = '你好，输入内容后我会通过 API 真正回复你。';

    stack.appendChild(bubble);
    emptyRow.appendChild(buildChatAvatarNode(incomingAvatar));
    emptyRow.appendChild(stack);
    messages.appendChild(emptyRow);
    return;
  }

  chatHistory.forEach(item => {
    const message = document.createElement('div');
    message.className = `chat-message ${item.role}`;
    message.dataset.id = item.id;

    if (item.role === 'system') {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.innerText = item.content;
      message.appendChild(bubble);
      messages.appendChild(message);
      return;
    }

    const stack = document.createElement('div');
    stack.className = 'chat-stack';

    if (item.attachment?.type === 'image' && item.attachment?.dataUrl) {
      stack.appendChild(buildChatImageCard(item.attachment.dataUrl, item.attachment.name || '图片'));
    }

    if (item.content) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.innerText = item.content;
      stack.appendChild(bubble);
    }

    if (item.role === 'ai') {
      message.appendChild(buildChatAvatarNode(incomingAvatar));
      message.appendChild(stack);
    } else {
      message.appendChild(stack);
      message.appendChild(buildChatAvatarNode({
        text: 'ME',
        accent: '#70686e',
        className: 'chat-avatar user-avatar'
      }));
    }

    messages.appendChild(message);
  });

  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 30);
}

function appendTyping() {
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  removeTyping();

  const conversation = getCurrentConversation();
  const incomingAvatar = typeof getConversationAvatarInfo === 'function'
    ? getConversationAvatarInfo(conversation)
    : { imageUrl: '', text: 'AI', accent: '#6d5755' };

  const typing = document.createElement('div');
  typing.className = 'chat-message ai';
  typing.id = 'typing-message';
  const stack = document.createElement('div');
  stack.className = 'chat-stack';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerText = '正在输入...';

  stack.appendChild(bubble);
  typing.appendChild(buildChatAvatarNode(incomingAvatar));
  typing.appendChild(stack);
  messages.appendChild(typing);

  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 30);
}

function removeTyping() {
  const typing = document.getElementById('typing-message');
  if (typing) typing.remove();
}

function showSystemMessage(text) {
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  const message = document.createElement('div');
  message.className = 'chat-message system';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerText = text;

  message.appendChild(bubble);
  messages.appendChild(message);

  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 30);
}

function autoResizeChatInput() {
  const inputEl = document.getElementById('chat-input');
  if (!inputEl) return;

  inputEl.style.height = 'auto';
  const nextHeight = Math.min(Math.max(inputEl.scrollHeight, 42), 120);
  inputEl.style.height = `${nextHeight}px`;
}

function sanitizeAssistantReplyForMemory() {
  return 'assistant 刚刚自然地回应了用户，保留了语气和互动节奏，但不保留具体事实。';
}
async function buildAssistantMemoryContent(text) {
  const mode = localStorage.getItem('memory_mode') || 'auto';

  if (mode === 'raw') {
    return text;
  }

  if (mode === 'auto') {
    try {
      return await summarizeAssistantReplyMemory(text);
    } catch (err) {
      console.error('自动总结失败，回退到基础记忆模式。', err);
      return sanitizeAssistantReplyForMemory(text);
    }
  }

  return sanitizeAssistantReplyForMemory(text);
}
function buildApiMessages() {
  const ruleSettings = typeof getConversationRuleSettings === 'function'
    ? getConversationRuleSettings(window.currentConversationId)
    : {
        nameIdentity: '',
        coreWorld: '',
        persona: '',
        style: '',
        relationship: ''
      };
  const linkedMemories = typeof getLinkedMemoryEntries === 'function'
    ? getLinkedMemoryEntries(window.currentConversationId)
    : [];
  const groupMemberRules = typeof getGroupMemberRuleEntries === 'function'
    ? getGroupMemberRuleEntries(window.currentConversationId)
    : [];

  const systemMessage = {
    role: 'system',
    content: [
      'You are chatting inside a phone-style chat app.',
      'Reply naturally, warmly, and like a real person in messages.',
      'Do not act like customer support.',
      '',
      '[Priority]',
      'Name identity = Core worldview > Persona > Style > Relationship state > Chat history',
      '',
      '- Name identity and Core worldview are parallel highest-priority layers.',
      '- Persona must obey both Name identity and Core worldview.',
      '- Style is below Persona and controls expression style only.',
      '- Relationship state is lower priority and only affects current interaction dynamics.',
      '- Chat history is the lowest-priority reference only.',
      '- Lower-priority layers must never override higher-priority layers.',
      '',
      '[Name identity]',
      'Defines who the character truly is.',
      ruleSettings.nameIdentity || '(empty)',
      '',
      '[Core worldview]',
      'Defines the world’s hard rules.',
      ruleSettings.coreWorld || '(empty)',
      '',
      '[Persona]',
      'Defines long-term personality, role, and behavior logic.',
      ruleSettings.persona || '(empty)',
      '',
      '[Style]',
      'Defines expression style, wording habit, and tone tendency.',
      ruleSettings.style || '(empty)',
      '',
      '[Relationship state]',
      'Defines temporary relationship dynamics only.',
      ruleSettings.relationship || '(empty)',
      '',
      '[Group members]',
      'When this is a group chat, the selected members below must stay consistent with their own identity, persona, style, and relationship state.',
      'Do not let one member violate or overwrite another member’s setting.',
      groupMemberRules.length
        ? groupMemberRules.map(item => [
            `- ${item.name}`,
            `  Name identity: ${item.nameIdentity || '(empty)'}`,
            `  Persona: ${item.persona || '(empty)'}`,
            `  Style: ${item.style || '(empty)'}`,
            `  Relationship state: ${item.relationship || '(empty)'}`
          ].join('\n')).join('\n')
        : '(empty)',
      '',
      '[Linked memories]',
      'Low-priority reference snippets from related private chats. Never let them override higher-priority layers.',
      linkedMemories.length
        ? linkedMemories.map(item => `[${item.source}][${item.role}] ${item.text}`).join('\n')
        : '(empty)',
      '',
      '[Chat history]',
      'Reference only; ignore it if it conflicts with any higher-priority layer.'
    ].join('\n')
  };

  const historyMessages = chatHistory
    .filter(item => item.role === 'user' || item.role === 'ai')
    .map(item => ({
      role: item.role,
      content: buildHistoryMessageContent(item)
    }));

  return [systemMessage, ...historyMessages];
}

async function sendMessage() {
  if (!window.currentConversationId) {
    alert('请先进入一个对话。');
    return;
  }

  if (currentController) {
    currentController.abort();
    currentController = null;
    removeTyping();
  }

  const inputEl = document.getElementById('chat-input');
  const text = inputEl.value.trim();
  const attachment = pendingImageAttachment ? { ...pendingImageAttachment } : null;
  if (!text && !attachment) return;

  const userMessageId = Date.now().toString();
  const apiText = attachment ? buildImagePromptText(text) : text;
  const memoryContent = attachment
    ? [text, `用户发送了一张图片${attachment.name ? `（${attachment.name}）` : ''}。`].filter(Boolean).join(' ')
    : text;

  chatHistory.push({
    id: userMessageId,
    role: 'user',
    content: text,
    apiText,
    memoryContent,
    attachment
  });

  pendingUserMessageId = userMessageId;
  pendingAiMessageId = null;

  saveHistory();
  if (typeof touchConversation === 'function') {
    touchConversation(window.currentConversationId);
  }
  renderMessages();

  inputEl.value = '';
  clearPendingImageAttachment();
  setChatMenuOpen(false);
  autoResizeChatInput();
  appendTyping();

  currentController = new AbortController();

  try {
    const reply = await generateWithRuleRetry(buildApiMessages(), currentController.signal);

    removeTyping();

    const aiMessageId = `${Date.now()}_ai`;
    const aiMemoryContent = await buildAssistantMemoryContent(reply);

    chatHistory.push({
      id: aiMessageId,
      role: 'ai',
      content: reply,
      memoryContent: aiMemoryContent
    });

    pendingAiMessageId = aiMessageId;
    pendingUserMessageId = null;

    saveHistory();
    if (typeof touchConversation === 'function') {
      touchConversation(window.currentConversationId);
    }
    renderMessages();
  } catch (err) {
    removeTyping();

    if (err.name === 'AbortError') {
      pendingAiMessageId = null;
      pendingUserMessageId = null;
      return;
    }

    showSystemMessage(`出错了：${err.message}`);
    pendingAiMessageId = null;
    pendingUserMessageId = null;
  } finally {
    currentController = null;
  }
}
function rollbackPendingTurnByUserMessageId(messageId) {
  if (!messageId) return;
  if (pendingUserMessageId !== messageId) return;

  if (currentController) {
    currentController.abort();
    currentController = null;
  }

  removeTyping();

  chatHistory = chatHistory.filter(item => {
    if (item.id === pendingUserMessageId) return false;
    if (pendingAiMessageId && item.id === pendingAiMessageId) return false;
    return true;
  });

  pendingUserMessageId = null;
  pendingAiMessageId = null;

  saveHistory();
  renderMessages();
}

function stopCurrentReply() {
  if (currentController) {
    currentController.abort();
    currentController = null;
    removeTyping();
  }
  setChatMenuOpen(false);
}

async function editOrDeleteMessage(messageId) {
  const target = chatHistory.find(item => item.id === messageId);
  if (!target) return;

  const action = window.prompt(
    '输入 1 编辑这条消息，输入 2 删除这条消息。',
    '1'
  );

  if (action === '2') {
    const ok = window.confirm('确认彻底删除这条消息吗？删除后它不会再参与后续上下文。');
    if (!ok) return;

    rollbackPendingTurnByUserMessageId(messageId);
    chatHistory = chatHistory.filter(item => item.id !== messageId);

    if (pendingUserMessageId === messageId) pendingUserMessageId = null;
    if (pendingAiMessageId === messageId) pendingAiMessageId = null;

    saveHistory();
    renderMessages();
    return;
  }

  if (action === '1') {
    const nextContent = window.prompt('编辑消息内容：', target.content);
    if (nextContent === null) return;

    const trimmed = nextContent.trim();

    if (!trimmed) {
      const ok = window.confirm('内容为空，是否直接删除这条消息？');
      if (!ok) return;

      rollbackPendingTurnByUserMessageId(messageId);
      chatHistory = chatHistory.filter(item => item.id !== messageId);

      if (pendingUserMessageId === messageId) pendingUserMessageId = null;
      if (pendingAiMessageId === messageId) pendingAiMessageId = null;
    } else {
      if (target.role === 'user' && pendingUserMessageId === messageId && currentController) {
        currentController.abort();
        currentController = null;
        removeTyping();
      }

      target.content = trimmed;

      if (target.role === 'user') {
        target.memoryContent = trimmed;

        const currentIndex = chatHistory.findIndex(item => item.id === messageId);
        if (currentIndex !== -1) {
          const nextItem = chatHistory[currentIndex + 1];
          if (nextItem && nextItem.role === 'ai') {
            nextItem.memoryContent = await buildAssistantMemoryContent(nextItem.content);
          }
        }
      }

      if (target.role === 'ai') {
        target.memoryContent = await buildAssistantMemoryContent(trimmed);
      }
    }

    saveHistory();
    renderMessages();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  if (typeof loadCurrentConversationIntoChat === 'function') {
    loadCurrentConversationIntoChat();
  } else {
    loadHistory();
    renderMessages();
  }

  const stopBtn = document.getElementById('stop-btn');
  const menuBtn = document.getElementById('chat-menu-btn');
  const addImageBtn = document.getElementById('chat-add-image-btn');
  const moodBtn = document.getElementById('chat-mood-btn');
  const imageInputEl = document.getElementById('chat-image-input');
  const attachmentPreviewEl = document.getElementById('chat-attachment-preview');
  const inputEl = document.getElementById('chat-input');
  const messagesEl = document.getElementById('chat-messages');

  if (stopBtn) stopBtn.addEventListener('click', stopCurrentReply);
  if (menuBtn) {
    menuBtn.addEventListener('click', event => {
      event.stopPropagation();
      setChatMenuOpen(!chatMenuOpen);
    });
  }
  if (addImageBtn) {
    addImageBtn.addEventListener('click', () => {
      imageInputEl?.click();
    });
  }
  if (moodBtn) {
    moodBtn.addEventListener('click', () => {
      if (!inputEl) return;
      inputEl.value += inputEl.value ? ' :)' : ':)';
      autoResizeChatInput();
      inputEl.focus();
    });
  }
  if (imageInputEl) {
    imageInputEl.addEventListener('change', event => {
      handleChatImageSelection(event.target.files?.[0]);
    });
  }

  if (inputEl) {
    autoResizeChatInput();
    inputEl.addEventListener('input', autoResizeChatInput);
    inputEl.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  }

  if (messagesEl) {
    messagesEl.addEventListener('dblclick', event => {
      const bubble = event.target.closest('.bubble');
      const message = event.target.closest('.chat-message');
      if (!bubble || !message) return;

      const id = message.dataset.id;
      if (!id) return;

      editOrDeleteMessage(id);
    });
  }

  if (attachmentPreviewEl) {
    attachmentPreviewEl.addEventListener('click', event => {
      if (event.target.id === 'chat-attachment-remove-btn') {
        clearPendingImageAttachment();
      }
    });
  }

  document.addEventListener('click', event => {
    if (chatMenuOpen && !event.target.closest('#chat-mini-menu') && !event.target.closest('#chat-menu-btn')) {
      setChatMenuOpen(false);
    }
  });
});
