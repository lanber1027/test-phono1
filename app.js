const STORAGE_KEYS = {
  contacts: 'dreamtopia_phone_contacts_v2',
  conversations: 'dreamtopia_phone_conversations_v2',
  currentConversation: 'dreamtopia_phone_current_conversation_v2',
  moments: 'dreamtopia_phone_moments_v1',
  notes: 'dreamtopia_phone_notes_v1',
  selectedNote: 'dreamtopia_phone_selected_note_v1',
  worldRules: 'dreamtopia_phone_world_rules_v1',
  appIconImages: 'dreamtopia_phone_app_icon_images_v1',
  homeLayout: 'dreamtopia_phone_home_layout_v1',
  homeWallpaper: 'dreamtopia_phone_home_wallpaper_v1'
};

const CHAT_HISTORY_PREFIX = 'dreamtopia_chat_history_v2_';
const DEFAULT_GROUP_SHARED_MEMORY_LIMIT = 12;
const MAX_GROUP_SHARED_MEMORY_LIMIT = 30;
const HOME_PAGE_MIN_COUNT = 2;
const HOME_LONG_PRESS_MS = 420;
const HOME_DRAG_SWITCH_DELAY = 260;
const HOME_DRAG_EDGE_SIZE = 54;

const COMMUNITY_FEEDS = {
  redbook: [
    {
      id: 'rb_1',
      user: 'Mira',
      subtitle: '穿搭 / 房间 / 生活感',
      text: '把房间角落改成了奶油白和薄荷绿，整个人都松弛下来。',
      mediaLabel: 'Soft room reset',
      mediaA: '#ff8fab',
      mediaB: '#6ee7b7',
      meta: '2 分钟前',
      likes: 328,
      comments: 44
    },
    {
      id: 'rb_2',
      user: 'Qii',
      subtitle: '日常 / 咖啡 / city walk',
      text: '下雨天最适合一个人去街角咖啡馆写点东西。',
      mediaLabel: 'Rainy coffee note',
      mediaA: '#60a5fa',
      mediaB: '#f59e0b',
      meta: '18 分钟前',
      likes: 241,
      comments: 28
    }
  ],
  weibo: [
    {
      id: 'wb_1',
      user: 'Aster',
      subtitle: '热议 / 吐槽 / 碎碎念',
      text: '谁懂啊，最安静的人往往朋友圈更新最狠。',
      mediaLabel: 'Tonight mood',
      mediaA: '#fb7185',
      mediaB: '#7c3aed',
      meta: '刚刚',
      likes: 189,
      comments: 63
    },
    {
      id: 'wb_2',
      user: 'Nova',
      subtitle: '短内容 / 近况',
      text: '今天的关键词：晚风、晚饭、晚一点再回消息。',
      mediaLabel: 'Small daily post',
      mediaA: '#f97316',
      mediaB: '#0ea5e9',
      meta: '11 分钟前',
      likes: 417,
      comments: 90
    }
  ],
  forum: [
    {
      id: 'forum_1',
      user: 'Luna',
      subtitle: '主题帖 / 情绪 / 关系',
      text: '如果一个人总是在深夜找你聊天，那到底是习惯、依赖，还是喜欢？',
      mediaLabel: 'Thread · 298 replies',
      mediaA: '#1d4ed8',
      mediaB: '#111827',
      meta: '主楼更新于 1 小时前',
      likes: 96,
      comments: 298
    },
    {
      id: 'forum_2',
      user: 'Orin',
      subtitle: '讨论 / 设定 / 故事',
      text: '想做一个像手机一样真实的 AI 世界，需要哪些基础 App 才会更有代入感？',
      mediaLabel: 'Thread · 124 replies',
      mediaA: '#0f766e',
      mediaB: '#14b8a6',
      meta: '主楼更新于 3 小时前',
      likes: 67,
      comments: 124
    }
  ]
};

const MAP_ROUTES = [
  { id: 'route_1', title: '回到 Home 桌面', meta: '1.2 km · 6 分钟', distance: '最快', time: '刚刚' },
  { id: 'route_2', title: 'Luna 常去的街角咖啡馆', meta: '2.8 km · 步行 14 分钟 · 适合发朋友圈', distance: '步行', time: '推荐' },
  { id: 'route_3', title: 'Whisper 同步位置', meta: '共享地图点位，像情侣 App 一样保留连接感', distance: '同步', time: '在线' }
];

const APP_ICON_CONFIG = [
  { key: 'messages', label: '聊聊', fallbackText: '聊', defaultImage: './images/liaoliao-home-cover.png', screenId: 'messages-screen', accentClass: 'app-green', launcher: true, defaultPage: 0, messagesTabTarget: 'chats' },
  { key: 'notes', label: '备忘录', fallbackText: 'O', defaultImage: '', screenId: 'notes-screen', accentClass: 'app-sunset', launcher: true, defaultPage: 0 },
  { key: 'maps', label: '地图', fallbackText: 'G', defaultImage: '', screenId: 'maps-screen', accentClass: 'app-map', launcher: true, defaultPage: 1 },
  { key: 'redbook', label: '小红书', fallbackText: 'R', defaultImage: '', screenId: 'redbook-screen', accentClass: 'app-red', launcher: true, defaultPage: 0 },
  { key: 'weibo', label: '微博', fallbackText: 'W', defaultImage: '', screenId: 'weibo-screen', accentClass: 'app-amber', launcher: true, defaultPage: 1 },
  { key: 'forum', label: '论坛', fallbackText: 'F', defaultImage: '', screenId: 'forum-screen', accentClass: 'app-indigo', launcher: true, defaultPage: 1 },
  { key: 'rules', label: '规则', fallbackText: '#', defaultImage: '', screenId: 'rules-screen', accentClass: 'app-neutral', launcher: true, defaultPage: 0 },
  { key: 'appearance', label: '外观', fallbackText: 'A', defaultImage: '', screenId: 'settings-screen', accentClass: 'app-sky', launcher: true, defaultPage: 0 },
  { key: 'whisper', label: 'Whisper', fallbackText: 'H', defaultImage: '', screenId: 'whisper-screen', accentClass: 'app-pink', launcher: false },
  { key: 'api', label: 'AI 设置', fallbackText: 'AI', defaultImage: '', screenId: 'api-screen', accentClass: 'app-dark', launcher: false }
];

let contacts = [];
let conversations = [];
let moments = [];
let notes = [];
let worldRules = [];
let appIconImages = {};
let homeLayout = [];
let homeWallpaper = '';
let currentConversationId = null;
let selectedNoteId = null;
let currentMessagesTab = 'chats';
let currentWhisperView = 'home';
let currentHomePage = 0;
let homePendingPress = null;
let homeDragState = null;
let homeDragGhost = null;
let homeDragSwitchTimer = null;
let homeSwipeState = null;
let suppressHomeLauncherClickUntil = 0;
let openConversationSwipeId = null;
let conversationSwipeState = null;
let suppressConversationOpenUntil = 0;

function uid(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function initialsFromName(name) {
  const safeName = String(name || '').trim();
  if (!safeName) return 'AI';
  const compact = safeName.replace(/\s+/g, '');
  if (/^[\u4e00-\u9fa5]+$/.test(compact)) return compact.slice(0, 2);
  return compact.slice(0, 2).toUpperCase();
}

function formatClock(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function formatHomeDate(date) {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return `${weekdays[date.getDay()]} ${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatRelativeTime(timestamp) {
  const diff = Date.now() - Number(timestamp || 0);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`;
  return `${Math.floor(diff / day)} 天前`;
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clampSharedMemoryLimit(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_GROUP_SHARED_MEMORY_LIMIT;
  return Math.max(0, Math.min(MAX_GROUP_SHARED_MEMORY_LIMIT, Math.round(parsed)));
}

function extractTimestampFromMessageId(messageId, fallback = Date.now()) {
  const base = Number(String(messageId || '').split('_')[0]);
  return Number.isFinite(base) && base > 0 ? base : fallback;
}

function buildSnippet(text, query = '', radius = 16) {
  const content = String(text || '').replace(/\s+/g, ' ').trim();
  if (!content) return '';
  if (!query) return content;

  const lowerContent = content.toLowerCase();
  const lowerQuery = String(query).toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);
  if (index === -1) return content;

  const start = Math.max(0, index - radius);
  const end = Math.min(content.length, index + lowerQuery.length + radius * 2);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < content.length ? '...' : '';
  return `${prefix}${content.slice(start, end)}${suffix}`;
}

function getAvatarColor(seed) {
  const palette = ['#34d399', '#60a5fa', '#fb7185', '#f59e0b', '#818cf8', '#14b8a6'];
  let index = 0;
  String(seed || '').split('').forEach(char => {
    index += char.charCodeAt(0);
  });
  return palette[index % palette.length];
}

function createContactPayload(name, note = '', avatarLabel = '') {
  return {
    id: uid('contact'),
    name,
    avatar: avatarLabel || initialsFromName(name),
    note,
    createdAt: Date.now()
  };
}

function createConversationPayload({
  id,
  contactId = null,
  remark = '',
  nameIdentity = '',
  title,
  type = 'direct',
  description = '',
  persona = '',
  style = '',
  relationship = '',
  coreWorld = '',
  avatarImage = '',
  updatedAt = Date.now(),
  participantIds = [],
  sharedMemoryLimit = DEFAULT_GROUP_SHARED_MEMORY_LIMIT
}) {
  const displayName = remark || title || nameIdentity || '未命名对话';
  return {
    id: id || uid('conv'),
    contactId,
    title: displayName,
    remark: displayName,
    nameIdentity: nameIdentity || displayName,
    type,
    description,
    persona,
    style,
    relationship,
    coreWorld,
    avatarImage: String(avatarImage || '').trim(),
    participantIds,
    sharedMemoryLimit: clampSharedMemoryLimit(sharedMemoryLimit),
    unreadCount: 0,
    createdAt: Date.now(),
    updatedAt
  };
}

function buildSeedData() {
  const now = Date.now();

  return {
    contacts: [
      { id: 'contact_luna', name: 'Luna', avatar: 'LU', note: '深夜会发长消息的朋友', createdAt: now - 1000 * 60 * 60 * 30 },
      { id: 'contact_nova', name: 'Nova', avatar: 'NV', note: 'Whisper 已连接', createdAt: now - 1000 * 60 * 60 * 25 },
      { id: 'contact_iris', name: 'Iris', avatar: 'IR', note: '负责群聊里最会接话的人', createdAt: now - 1000 * 60 * 60 * 18 }
    ],
    conversations: [
      createConversationPayload({
        id: 'conv_luna',
        contactId: 'contact_luna',
        remark: 'Luna',
        nameIdentity: 'Luna',
        title: 'Luna',
        type: 'direct',
        description: 'Text Message · 适合一对一聊天',
        relationship: '你们之间有一种安静但黏连的亲密感。',
        persona: '你现在扮演 Luna。回复要像熟悉的朋友，口吻柔和，略带一点深夜聊天感。',
        updatedAt: now - 1000 * 60 * 7
      }),
      createConversationPayload({
        id: 'conv_circle',
        remark: 'Dream Circle',
        nameIdentity: 'Dream Circle',
        title: 'Dream Circle',
        type: 'group',
        description: 'Group Chat · 3 位朋友',
        participantIds: ['contact_luna', 'contact_nova', 'contact_iris'],
        relationship: '这是一个熟人小群，大家彼此熟悉，可以接梗，也会分享近况。',
        persona: '你现在扮演一个温柔、自然、有真实群聊感的小群。回复里允许偶尔提到不同朋友的语气，但整体仍然要保持像真实聊天记录。',
        updatedAt: now - 1000 * 60 * 22
      }),
      createConversationPayload({
        id: 'conv_nova',
        contactId: 'contact_nova',
        remark: 'Nova',
        nameIdentity: 'Nova',
        title: 'Nova',
        type: 'direct',
        description: 'Whisper Connected',
        relationship: '更像特别亲近的好友或恋人式连接，知道彼此很多生活细节。',
        persona: '你现在扮演 Nova。回复亲近、细腻、像共享了生活的人。',
        updatedAt: now - 1000 * 60 * 58
      })
    ],
    moments: [
      { id: 'moment_1', author: 'Nova', avatar: 'NV', text: '今天想把聊天窗口留给最想念的人。', createdAt: now - 1000 * 60 * 6, likes: 18, comments: 4 },
      { id: 'moment_2', author: 'You', avatar: 'ME', text: '做一个像手机一样真实的 AI 世界，好像比想象里更有趣。', createdAt: now - 1000 * 60 * 28, likes: 27, comments: 9 },
      { id: 'moment_3', author: 'Luna', avatar: 'LU', text: '晚一点再回消息，不是不想回，是想认真回。', createdAt: now - 1000 * 60 * 72, likes: 36, comments: 12 }
    ],
    notes: [
      { id: 'note_1', title: 'Dreamtopia 灵感', body: '让手机里的每个 App 都像真实生活的一角：聊天、动态、地图、论坛、共享手机。', updatedAt: now - 1000 * 60 * 12 },
      { id: 'note_2', title: 'Whisper 想法', body: 'Whisper 可以查看对方主页、共享聊天片段、共享备忘录，偏亲密关系或好友感。', updatedAt: now - 1000 * 60 * 42 }
    ]
  };
}

function seedHistoryIfMissing(conversation) {
  const key = `${CHAT_HISTORY_PREFIX}${conversation.id}`;
  const existing = readJson(key, null);
  if (Array.isArray(existing) && existing.length) return;

  let history = [];

  if (conversation.id === 'conv_luna') {
    history = [
      { id: `${Date.now() - 400000}`, role: 'ai', content: '今天想聊什么？我在。', memoryContent: '今天想聊什么？我在。' },
      { id: `${Date.now() - 300000}`, role: 'user', content: '想把手机做得更像真的。', memoryContent: '想把手机做得更像真的。' }
    ];
  } else if (conversation.id === 'conv_circle') {
    history = [
      { id: `${Date.now() - 250000}`, role: 'ai', content: 'Dream Circle：今天谁先来发一个新动态？', memoryContent: 'Dream Circle：今天谁先来发一个新动态？' }
    ];
  } else if (conversation.id === 'conv_nova') {
    history = [
      { id: `${Date.now() - 190000}`, role: 'ai', content: 'Whisper 已经同步了，我把主页留给你看。', memoryContent: 'Whisper 已经同步了，我把主页留给你看。' }
    ];
  }

  if (history.length) writeJson(key, history);
}

function normalizeContacts(list) {
  if (!Array.isArray(list)) return [];
  return list.map(item => ({
    id: item.id || uid('contact'),
    name: item.name || '未命名联系人',
    avatar: item.avatar || initialsFromName(item.name),
    note: item.note || '',
    createdAt: item.createdAt || Date.now()
  }));
}

function normalizeConversations(list) {
  if (!Array.isArray(list)) return [];
  return list.map(item => ({
    id: item.id || uid('conv'),
    contactId: item.contactId || null,
    title: item.remark || item.title || item.name || item.nameIdentity || '未命名对话',
    remark: item.remark || item.title || item.name || item.nameIdentity || '未命名对话',
    nameIdentity: item.nameIdentity || item.characterName || item.name || item.title || item.remark || '',
    type: item.type || 'direct',
    description: item.description || '',
    persona: item.persona || '',
    style: item.style || item.tone || '',
    relationship: item.relationship || '',
    coreWorld: item.coreWorld || '',
    avatarImage: String(item.avatarImage || item.characterAvatarImage || '').trim(),
    participantIds: Array.isArray(item.participantIds) ? item.participantIds : [],
    sharedMemoryLimit: clampSharedMemoryLimit(item.sharedMemoryLimit),
    unreadCount: Number(item.unreadCount || 0),
    createdAt: item.createdAt || Date.now(),
    updatedAt: item.updatedAt || Date.now()
  }));
}

function normalizeMoments(list) {
  if (!Array.isArray(list)) return [];
  return list.map(item => ({
    id: item.id || uid('moment'),
    author: item.author || 'You',
    avatar: item.avatar || initialsFromName(item.author),
    text: item.text || '',
    createdAt: item.createdAt || Date.now(),
    likes: Number(item.likes || 0),
    comments: Number(item.comments || 0)
  }));
}

function normalizeNotes(list) {
  if (!Array.isArray(list)) return [];
  return list.map(item => ({
    id: item.id || uid('note'),
    title: item.title || '未命名笔记',
    body: item.body || '',
    updatedAt: item.updatedAt || Date.now()
  }));
}

function normalizeWorldRules(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map(item => ({
      id: item.id || uid('world_rule'),
      content: String(item.content || item.text || '').trim(),
      syncAll: item.syncAll !== false,
      createdAt: item.createdAt || Date.now()
    }))
    .filter(item => item.content);
}

function normalizeAppIconImages(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const normalizedValue = { ...value };
  if (typeof normalizedValue.appearance !== 'string' && typeof normalizedValue.settings === 'string') {
    normalizedValue.appearance = normalizedValue.settings;
  }

  return APP_ICON_CONFIG.reduce((result, item) => {
    const image = typeof normalizedValue[item.key] === 'string' ? normalizedValue[item.key].trim() : '';
    if (image) result[item.key] = image;
    return result;
  }, {});
}

function getLauncherAppConfigs() {
  return APP_ICON_CONFIG.filter(item => item.launcher);
}

function normalizeHomeLayout(value) {
  const layoutMap = new Map(
    getLauncherAppConfigs().map((item, index) => [
      item.key,
      { id: item.key, page: item.defaultPage || 0, order: index }
    ])
  );

  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      const id = typeof entry === 'string' ? entry : (entry?.id || entry?.key);
      if (!layoutMap.has(id)) return;

      const page = Number.isFinite(Number(entry?.page)) ? Math.max(0, Math.round(Number(entry.page))) : layoutMap.get(id).page;
      const order = Number.isFinite(Number(entry?.order)) ? Math.max(0, Math.round(Number(entry.order))) : index;
      layoutMap.set(id, { id, page, order });
    });
  }

  return Array.from(layoutMap.values())
    .sort((a, b) => (a.page - b.page) || (a.order - b.order))
    .map((item, index) => ({ ...item, order: index }));
}

function normalizeHomeWallpaper(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function loadData() {
  contacts = normalizeContacts(readJson(STORAGE_KEYS.contacts, []));
  conversations = normalizeConversations(readJson(STORAGE_KEYS.conversations, []));
  moments = normalizeMoments(readJson(STORAGE_KEYS.moments, []));
  notes = normalizeNotes(readJson(STORAGE_KEYS.notes, []));
  worldRules = normalizeWorldRules(readJson(STORAGE_KEYS.worldRules, []));
  appIconImages = normalizeAppIconImages(readJson(STORAGE_KEYS.appIconImages, {}));
  homeLayout = normalizeHomeLayout(readJson(STORAGE_KEYS.homeLayout, []));
  homeWallpaper = normalizeHomeWallpaper(localStorage.getItem(STORAGE_KEYS.homeWallpaper));
  currentConversationId = localStorage.getItem(STORAGE_KEYS.currentConversation) || null;
  selectedNoteId = localStorage.getItem(STORAGE_KEYS.selectedNote) || null;
}

function saveContacts() {
  writeJson(STORAGE_KEYS.contacts, contacts);
}

function saveConversations() {
  writeJson(STORAGE_KEYS.conversations, conversations);
}

function saveMoments() {
  writeJson(STORAGE_KEYS.moments, moments);
}

function saveNotes() {
  writeJson(STORAGE_KEYS.notes, notes);
}

function saveAppIconImages() {
  writeJson(STORAGE_KEYS.appIconImages, appIconImages);
}

function saveHomeLayout() {
  writeJson(STORAGE_KEYS.homeLayout, homeLayout);
}

function saveHomeWallpaper() {
  if (homeWallpaper) {
    localStorage.setItem(STORAGE_KEYS.homeWallpaper, homeWallpaper);
  } else {
    localStorage.removeItem(STORAGE_KEYS.homeWallpaper);
  }
}

function syncCoreWorldBookFromWorldRules() {
  const syncedRules = worldRules
    .filter(item => item.syncAll)
    .map(item => item.content.trim())
    .filter(Boolean);

  localStorage.setItem('core_world_book', syncedRules.join('\n\n'));
}

function saveWorldRules() {
  writeJson(STORAGE_KEYS.worldRules, worldRules);
  syncCoreWorldBookFromWorldRules();
}

function saveCurrentConversationId() {
  if (currentConversationId) {
    localStorage.setItem(STORAGE_KEYS.currentConversation, currentConversationId);
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentConversation);
  }
}

function saveSelectedNoteId() {
  if (selectedNoteId) {
    localStorage.setItem(STORAGE_KEYS.selectedNote, selectedNoteId);
  } else {
    localStorage.removeItem(STORAGE_KEYS.selectedNote);
  }
}

function migrateLegacyCoreWorldBook() {
  if (worldRules.length) {
    syncCoreWorldBookFromWorldRules();
    return;
  }

  const legacyCoreWorld = (localStorage.getItem('core_world_book') || '').trim();
  if (!legacyCoreWorld) return;

  worldRules = normalizeWorldRules([
    {
      id: uid('world_rule'),
      content: legacyCoreWorld,
      syncAll: true,
      createdAt: Date.now()
    }
  ]);
  saveWorldRules();
}

function ensureSeedData() {
  const nothingSeeded = !contacts.length && !conversations.length && !moments.length && !notes.length;
  if (nothingSeeded) {
    const seed = buildSeedData();
    contacts = seed.contacts;
    conversations = seed.conversations;
    moments = seed.moments;
    notes = seed.notes;
    currentConversationId = conversations[0]?.id || null;
    selectedNoteId = notes[0]?.id || null;

    saveContacts();
    saveConversations();
    saveMoments();
    saveNotes();
    saveCurrentConversationId();
    saveSelectedNoteId();
  }

  conversations.forEach(seedHistoryIfMissing);

  if (!currentConversationId && conversations[0]) {
    currentConversationId = conversations[0].id;
    saveCurrentConversationId();
  }

  if (!selectedNoteId && notes[0]) {
    selectedNoteId = notes[0].id;
    saveSelectedNoteId();
  }

  window.currentConversationId = currentConversationId;
}

function getContactById(contactId) {
  return contacts.find(item => item.id === contactId) || null;
}

function getConversationById(conversationId) {
  return conversations.find(item => item.id === conversationId) || null;
}

function getConversationDisplayName(conversation) {
  if (!conversation) return 'AI 聊天';
  return conversation.remark || conversation.title || conversation.nameIdentity || 'AI 聊天';
}

function getConversationNameIdentity(conversation) {
  if (!conversation) return '';
  return (conversation.nameIdentity || conversation.title || conversation.remark || '').trim();
}

function getConversationAvatarInfo(conversation) {
  if (!conversation) {
    return {
      imageUrl: '',
      text: 'AI',
      accent: getAvatarColor('AI')
    };
  }

  const displayName = getConversationDisplayName(conversation);
  const contact = getContactById(conversation.contactId);

  return {
    imageUrl: String(conversation.avatarImage || '').trim(),
    text: conversation.type === 'group'
      ? initialsFromName(displayName)
      : (contact?.avatar || initialsFromName(displayName)),
    accent: getAvatarColor(displayName)
  };
}

function buildConversationAvatarHtml(conversation, className = 'thread-avatar') {
  const avatar = getConversationAvatarInfo(conversation);
  if (avatar.imageUrl) {
    return `
      <div class="${className} is-image">
        <img src="${escapeHtml(avatar.imageUrl)}" alt="${escapeHtml(getConversationDisplayName(conversation))}" />
      </div>
    `;
  }

  return `<div class="${className}" style="--accent:${avatar.accent};">${escapeHtml(avatar.text)}</div>`;
}

function getHistorySearchableText(item) {
  if (!item) return '';

  const visibleText = String(item.content || item.memoryContent || '').trim();
  if (visibleText) return visibleText;

  if (item.attachment?.type === 'image') {
    return item.attachment?.name ? `图片 ${item.attachment.name}` : '图片';
  }

  return '';
}

function getGlobalRuleSettings() {
  return {
    nameIdentity: (localStorage.getItem('name_identity_book') || '').trim(),
    coreWorld: (localStorage.getItem('core_world_book') || '').trim(),
    persona: (localStorage.getItem('persona_book') || '').trim(),
    style: (localStorage.getItem('style_book') || '').trim(),
    relationship: (localStorage.getItem('relationship_state') || '').trim()
  };
}

function getConversationRuleSettings(conversationId = window.currentConversationId) {
  const conversation = getConversationById(conversationId);
  const globalRules = getGlobalRuleSettings();

  return {
    conversation,
    remark: getConversationDisplayName(conversation),
    nameIdentity: (conversation?.nameIdentity || globalRules.nameIdentity || conversation?.title || '').trim(),
    coreWorld: (conversation?.coreWorld || globalRules.coreWorld || '').trim(),
    persona: (conversation?.persona || globalRules.persona || '').trim(),
    style: (conversation?.style || globalRules.style || '').trim(),
    relationship: (conversation?.relationship || globalRules.relationship || '').trim()
  };
}

function getSelectedNote() {
  return notes.find(item => item.id === selectedNoteId) || notes[0] || null;
}

function getConversationHistory(conversationId) {
  return readJson(`${CHAT_HISTORY_PREFIX}${conversationId}`, []);
}

function getConversationMembers(conversation) {
  if (!conversation || !Array.isArray(conversation.participantIds)) return [];
  return conversation.participantIds
    .map(contactId => getContactById(contactId))
    .filter(Boolean);
}

function getConversationSearchPreview(conversation, query = '') {
  const history = getConversationHistory(conversation.id);
  const lastMessage = history[history.length - 1];
  const fallback = String(getHistorySearchableText(lastMessage) || conversation.description || '点开开始聊天').replace(/\s+/g, ' ').trim();

  if (!query) return fallback;

  const candidateTexts = [
    ...[...history].reverse().map(getHistorySearchableText),
    getConversationDisplayName(conversation),
    conversation.nameIdentity,
    ...getConversationMembers(conversation).map(contact => contact.name)
  ];

  const matched = candidateTexts.find(text => String(text || '').toLowerCase().includes(query.toLowerCase()));
  return buildSnippet(matched || fallback, query);
}

function conversationMatchesQuery(conversation, query = '') {
  if (!query) return true;

  const contact = getContactById(conversation.contactId);
  const members = getConversationMembers(conversation);
  const history = getConversationHistory(conversation.id);
  const haystack = [
    getConversationDisplayName(conversation),
    conversation.nameIdentity,
    conversation.description,
    contact?.name,
    contact?.note,
    ...members.map(member => member.name),
    ...members.map(member => member.note || ''),
    ...history.map(getHistorySearchableText)
  ].join(' ').toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function getLinkedMemoryEntries(conversationId = window.currentConversationId) {
  const conversation = getConversationById(conversationId);
  if (!conversation || conversation.type !== 'group') return [];

  const limit = clampSharedMemoryLimit(conversation.sharedMemoryLimit);
  if (!limit) return [];

  const entries = [];
  getConversationMembers(conversation).forEach(member => {
    const directConversation = findDirectConversation(member.id);
    if (!directConversation) return;

    getConversationHistory(directConversation.id).forEach(item => {
      const text = String(item.memoryContent || item.content || '').trim();
      if (!text || (item.role !== 'user' && item.role !== 'ai')) return;

      entries.push({
        source: member.name,
        role: item.role,
        text: text.length > 72 ? `${text.slice(0, 72)}...` : text,
        timestamp: extractTimestampFromMessageId(item.id, directConversation.updatedAt)
      });
    });
  });

  return entries
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit)
    .reverse();
}

function getGroupMemberRuleEntries(conversationId = window.currentConversationId) {
  const conversation = getConversationById(conversationId);
  if (!conversation || conversation.type !== 'group') return [];

  return getConversationMembers(conversation)
    .map(member => {
      const directConversation = findDirectConversation(member.id);
      return {
        name: member.name,
        nameIdentity: (directConversation?.nameIdentity || member.name || '').trim(),
        persona: (directConversation?.persona || '').trim(),
        style: (directConversation?.style || '').trim(),
        relationship: (directConversation?.relationship || '').trim()
      };
    })
    .filter(item => item.nameIdentity || item.persona || item.style || item.relationship);
}

function getConversationActivityTime(conversation) {
  const history = getConversationHistory(conversation.id);
  const lastItem = history[history.length - 1];
  const historyTimestamp = Number(String(lastItem?.id || '').split('_')[0]);
  return Number.isFinite(historyTimestamp) && historyTimestamp > 0
    ? historyTimestamp
    : conversation.updatedAt || conversation.createdAt || Date.now();
}

function findDirectConversation(contactId) {
  return conversations.find(item => item.type === 'direct' && item.contactId === contactId) || null;
}

function touchConversation(conversationId) {
  const conversation = getConversationById(conversationId);
  if (!conversation) return;
  conversation.updatedAt = Date.now();
  saveConversations();
}

function deleteConversationPermanently(conversationId) {
  const conversation = getConversationById(conversationId);
  if (!conversation) return;

  const confirmed = window.confirm(
    `确认永久删除“${getConversationDisplayName(conversation)}”吗？删除后这条对话的人设、关系和全部聊天记录都会立刻消失，无法找回。`
  );
  if (!confirmed) return;

  conversations = conversations.filter(item => item.id !== conversationId);
  saveConversations();
  localStorage.removeItem(`${CHAT_HISTORY_PREFIX}${conversationId}`);

  if (currentConversationId === conversationId) {
    currentConversationId = conversations[0]?.id || null;
    window.currentConversationId = currentConversationId;
    saveCurrentConversationId();
    showScreen('messages-screen');
  }

  openConversationSwipeId = null;
  renderConversationList();
  updateHomeCards();
}

function updateTime() {
  const now = new Date();
  const homeTimeEl = document.getElementById('home-time');
  const homeDateEl = document.getElementById('home-date');
  const whisperTimeEl = document.getElementById('whisper-phone-time');
  const whisperDateEl = document.getElementById('whisper-phone-date');

  if (homeTimeEl) homeTimeEl.textContent = formatClock(now);
  if (homeDateEl) homeDateEl.textContent = formatHomeDate(now);
  if (whisperTimeEl) whisperTimeEl.textContent = formatClock(now);
  if (whisperDateEl) whisperDateEl.textContent = formatHomeDate(now);
}

function getHomeLayoutEntry(appId) {
  return homeLayout.find(item => item.id === appId) || null;
}

function getHomePageCount() {
  const maxPage = homeLayout.reduce((max, item) => Math.max(max, Number(item.page || 0)), 0);
  return Math.max(HOME_PAGE_MIN_COUNT, maxPage + 1);
}

function getHomePages() {
  const pageCount = getHomePageCount();
  const pages = Array.from({ length: pageCount }, () => []);
  const configMap = new Map(APP_ICON_CONFIG.map(item => [item.key, item]));

  [...homeLayout]
    .sort((a, b) => (a.page - b.page) || (a.order - b.order))
    .forEach(item => {
      const config = configMap.get(item.id);
      if (!config || !config.launcher) return;
      const pageIndex = Math.max(0, Math.min(pageCount - 1, Number(item.page || 0)));
      pages[pageIndex].push(config);
    });

  return pages;
}

function setHomePage(page, { animate = true } = {}) {
  const track = document.getElementById('home-app-pages-track');
  const dots = document.querySelectorAll('.home-page-dot');
  const pageCount = getHomePageCount();
  currentHomePage = Math.max(0, Math.min(pageCount - 1, Number(page || 0)));

  if (track) {
    track.style.transition = animate ? 'transform 0.28s ease' : 'none';
    track.style.transform = `translateX(-${currentHomePage * 100}%)`;
  }

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentHomePage);
  });
}

function applyHomeWallpaper() {
  const homeShell = document.querySelector('.home-shell');
  const preview = document.getElementById('appearance-wallpaper-preview');

  if (homeShell) {
    const hasWallpaper = Boolean(homeWallpaper);
    homeShell.classList.toggle('has-home-wallpaper', hasWallpaper);
    if (hasWallpaper) {
      homeShell.style.setProperty('--home-wallpaper-image', formatCssImageValue(homeWallpaper));
    } else {
      homeShell.style.removeProperty('--home-wallpaper-image');
    }
  }

  if (preview) {
    if (homeWallpaper) {
      preview.style.backgroundImage = formatCssImageValue(homeWallpaper);
    } else {
      preview.style.backgroundImage = '';
    }
  }

  const input = document.getElementById('home-wallpaper-url-input');
  if (input && input.value !== homeWallpaper) {
    input.value = homeWallpaper;
  }
}

function handleHomeLauncherClick(event) {
  if (Date.now() < suppressHomeLauncherClickUntil) {
    event.preventDefault();
    return;
  }

  const button = event.currentTarget;
  if (!button?.dataset?.screen) return;
  if (button.dataset.messagesTabTarget) showMessagesTab(button.dataset.messagesTabTarget);
  showScreen(button.dataset.screen);
}

function cancelHomePendingPress() {
  if (!homePendingPress) return;
  window.clearTimeout(homePendingPress.timer);
  homePendingPress = null;
}

function removeHomeDragGhost() {
  if (homeDragGhost) {
    homeDragGhost.remove();
    homeDragGhost = null;
  }
}

function clearHomeDragSwitchTimer() {
  if (homeDragSwitchTimer) {
    window.clearTimeout(homeDragSwitchTimer);
    homeDragSwitchTimer = null;
  }
}

function updateHomeDragGhostPosition(clientX, clientY) {
  if (!homeDragGhost) return;
  homeDragGhost.style.transform = `translate(${clientX - 41}px, ${clientY - 54}px)`;
}

function updateHomeDropTarget(appId) {
  document.querySelectorAll('.home-app.is-drop-target').forEach(button => {
    button.classList.remove('is-drop-target');
  });

  if (!appId) return;
  const target = document.querySelector(`[data-launcher-app-id="${appId}"]`);
  if (target) target.classList.add('is-drop-target');
}

function startHomeDrag(appId, button, pointerId, clientX, clientY) {
  cancelHomePendingPress();
  if (!button) return;

  const sourcePage = getHomeLayoutEntry(appId)?.page ?? currentHomePage;
  homeDragState = {
    appId,
    pointerId,
    sourcePage,
    targetAppId: null,
    dragMoved: false
  };

  const homeShell = document.querySelector('.home-shell');
  if (homeShell) homeShell.classList.add('is-reordering');

  button.classList.add('is-dragging-source');
  suppressHomeLauncherClickUntil = Date.now() + 240;

  homeDragGhost = button.cloneNode(true);
  homeDragGhost.classList.add('home-app-ghost');
  homeDragGhost.removeAttribute('data-screen');
  homeDragGhost.removeAttribute('data-launcher-app-id');
  document.body.appendChild(homeDragGhost);
  updateHomeDragGhostPosition(clientX, clientY);
}

function queueHomePageSwitch(targetPage) {
  if (!homeDragState) return;
  const pageCount = getHomePageCount();
  const nextPage = Math.max(0, Math.min(pageCount - 1, targetPage));
  if (nextPage === currentHomePage) {
    clearHomeDragSwitchTimer();
    return;
  }

  if (homeDragSwitchTimer) return;
  homeDragSwitchTimer = window.setTimeout(() => {
    setHomePage(nextPage);
    homeDragSwitchTimer = null;
  }, HOME_DRAG_SWITCH_DELAY);
}

function updateHomeLayoutOrder(dragId, targetPage, targetAppId = null) {
  const pageCount = getHomePageCount();
  const pages = Array.from({ length: pageCount }, (_, pageIndex) =>
    homeLayout
      .filter(item => item.page === pageIndex)
      .sort((a, b) => a.order - b.order)
      .map(item => item.id)
  );

  pages.forEach(pageItems => {
    const index = pageItems.indexOf(dragId);
    if (index !== -1) pageItems.splice(index, 1);
  });

  const safePage = Math.max(0, Math.min(pageCount - 1, targetPage));
  const targetList = pages[safePage];
  const targetIndex = targetAppId ? targetList.indexOf(targetAppId) : -1;

  if (targetIndex >= 0) {
    targetList.splice(targetIndex, 0, dragId);
  } else {
    targetList.push(dragId);
  }

  homeLayout = pages.flatMap((pageItems, pageIndex) =>
    pageItems.map((id, order) => ({ id, page: pageIndex, order }))
  );
  saveHomeLayout();
}

function finishHomeDrag() {
  if (!homeDragState) return;

  const shouldReorder = homeDragState.dragMoved || currentHomePage !== homeDragState.sourcePage || Boolean(homeDragState.targetAppId);
  if (shouldReorder) {
    updateHomeLayoutOrder(homeDragState.appId, currentHomePage, homeDragState.targetAppId);
  }

  document.querySelector('.home-shell')?.classList.remove('is-reordering');
  document.querySelector(`[data-launcher-app-id="${homeDragState.appId}"]`)?.classList.remove('is-dragging-source');
  updateHomeDropTarget(null);
  clearHomeDragSwitchTimer();
  removeHomeDragGhost();
  homeDragState = null;

  renderHomeLauncher();
  setHomePage(currentHomePage, { animate: false });
}

function renderHomeLauncher() {
  const track = document.getElementById('home-app-pages-track');
  const dots = document.getElementById('home-page-dots');
  if (!track || !dots) return;

  const pages = getHomePages();
  track.innerHTML = pages.map((pageApps, pageIndex) => `
    <div class="home-app-page" data-home-page="${pageIndex}">
      <div class="home-app-grid-page">
        ${pageApps.map(app => `
          <button
            type="button"
            class="home-app ${escapeHtml(app.accentClass || '')}"
            data-launcher-app-id="${app.key}"
            data-screen="${app.screenId}"
            ${app.messagesTabTarget ? `data-messages-tab-target="${app.messagesTabTarget}"` : ''}
          >
            ${app.key === 'messages' ? '<span class="home-app-badge" id="messages-home-badge"></span>' : ''}
            <span class="home-app-icon" data-app-icon-key="${app.key}">${escapeHtml(app.fallbackText)}</span>
            <span class="home-app-label">${escapeHtml(app.label)}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');

  dots.innerHTML = pages.map((_, pageIndex) => `
    <button type="button" class="home-page-dot ${pageIndex === currentHomePage ? 'active' : ''}" data-home-page-dot="${pageIndex}" aria-label="切换到第 ${pageIndex + 1} 页"></button>
  `).join('');

  track.querySelectorAll('[data-launcher-app-id]').forEach(button => {
    button.addEventListener('click', handleHomeLauncherClick);
    button.addEventListener('pointerdown', event => {
      if (event.button !== 0 || homeDragState) return;

      const currentButton = event.currentTarget;
      homePendingPress = {
        appId: currentButton.dataset.launcherAppId,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        button: currentButton,
        timer: window.setTimeout(() => {
          startHomeDrag(currentButton.dataset.launcherAppId, currentButton, event.pointerId, event.clientX, event.clientY);
        }, HOME_LONG_PRESS_MS)
      };
    });
    button.addEventListener('dragstart', event => event.preventDefault());
  });

  dots.querySelectorAll('[data-home-page-dot]').forEach(button => {
    button.addEventListener('click', () => {
      setHomePage(Number(button.dataset.homePageDot || 0));
    });
  });

  currentHomePage = Math.max(0, Math.min(pages.length - 1, currentHomePage));
  applyAppIconImages();
  updateHomeCards();
  setHomePage(currentHomePage, { animate: false });
}

function saveHomeWallpaperFromInput() {
  const input = document.getElementById('home-wallpaper-url-input');
  if (!input) return;

  homeWallpaper = String(input.value || '').trim();
  saveHomeWallpaper();
  applyHomeWallpaper();
  alert('主屏幕壁纸已更新。');
}

function clearHomeWallpaper() {
  homeWallpaper = '';
  saveHomeWallpaper();
  applyHomeWallpaper();
  const fileInput = document.getElementById('home-wallpaper-file-input');
  if (fileInput) fileInput.value = '';
  alert('已恢复默认壁纸。');
}

function handleHomeWallpaperFileChange(file) {
  if (!file) return;
  if (!String(file.type || '').startsWith('image/')) {
    alert('请上传图片文件。');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    homeWallpaper = typeof reader.result === 'string' ? reader.result : '';
    saveHomeWallpaper();
    applyHomeWallpaper();
    const fileInput = document.getElementById('home-wallpaper-file-input');
    if (fileInput) fileInput.value = '';
    alert('主屏幕壁纸已上传并应用。');
  };
  reader.onerror = () => {
    alert('读取壁纸失败，请重试。');
  };
  reader.readAsDataURL(file);
}

function updateHomeCards() {
  const unreadCount = conversations.reduce((sum, item) => sum + Number(item.unreadCount || 0), 0);
  const badgeEl = document.getElementById('messages-home-badge');
  const momentPreviewEl = document.getElementById('home-moment-preview');
  const whisperPreviewEl = document.getElementById('home-whisper-preview');
  const summaryEl = document.getElementById('home-summary');

  if (badgeEl) {
    badgeEl.textContent = unreadCount > 9 ? '9+' : String(unreadCount);
    badgeEl.classList.toggle('visible', unreadCount > 0);
  }

  if (momentPreviewEl && moments[0]) {
    momentPreviewEl.textContent = `${moments[0].author}：${moments[0].text.slice(0, 18)}${moments[0].text.length > 18 ? '...' : ''}`;
  }

  if (whisperPreviewEl) {
    whisperPreviewEl.textContent = 'Nova 的主页、聊天和共享备忘都能查看。';
  }

  if (summaryEl) {
    summaryEl.textContent = `今天有 ${conversations.length} 个聊天入口、${moments.length} 条动态、${notes.length} 张笔记正在运作。`;
  }
}

function getAppIconConfig(key) {
  return APP_ICON_CONFIG.find(item => item.key === key) || null;
}

function getStoredAppIconImage(key) {
  return typeof appIconImages[key] === 'string' ? appIconImages[key].trim() : '';
}

function getResolvedAppIconImage(key) {
  return getStoredAppIconImage(key) || getAppIconConfig(key)?.defaultImage || '';
}

function formatCssImageValue(imageUrl) {
  const safeUrl = String(imageUrl || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

  return `url("${safeUrl}")`;
}

function applyIconImageToElement(element, imageUrl) {
  if (!element) return;

  const hasImage = Boolean(imageUrl);
  element.classList.toggle('image-home-icon', hasImage);
  element.classList.toggle('has-custom-image', hasImage);

  if (hasImage) {
    element.style.setProperty('--app-icon-image', formatCssImageValue(imageUrl));
  } else {
    element.style.removeProperty('--app-icon-image');
  }
}

function applyAppIconImages() {
  APP_ICON_CONFIG.forEach(item => {
    const imageUrl = getResolvedAppIconImage(item.key);
    document.querySelectorAll(`[data-app-icon-key="${item.key}"], [data-preview-icon-key="${item.key}"]`).forEach(element => {
      applyIconImageToElement(element, imageUrl);
    });
  });
}

function updateAppIconImage(key, imageUrl) {
  if (!getAppIconConfig(key)) return;

  const normalized = String(imageUrl || '').trim();
  if (normalized) {
    appIconImages[key] = normalized;
  } else {
    delete appIconImages[key];
  }

  saveAppIconImages();
  renderHomeLauncher();
  applyAppIconImages();
}

function renderAppIconSettings() {
  const listEl = document.getElementById('app-icon-settings-list');
  if (!listEl) return;

  listEl.innerHTML = APP_ICON_CONFIG.map(item => {
    const customImage = getStoredAppIconImage(item.key);
    const sourceText = customImage
      ? '当前使用你自定义的图片'
      : (item.defaultImage ? '当前使用默认图片' : '当前使用默认渐变图标');

    return `
      <article class="settings-card app-icon-card">
        <div class="app-icon-card-head">
          <span class="home-app-icon app-icon-settings-preview" data-preview-icon-key="${item.key}">${escapeHtml(item.fallbackText)}</span>
          <div class="app-icon-card-copy">
            <strong>${escapeHtml(item.label)}</strong>
            <span class="app-icon-source">${sourceText}</span>
          </div>
        </div>

        <label class="form-label" for="app-icon-url-${item.key}">图片 URL</label>
        <input
          id="app-icon-url-${item.key}"
          class="form-input"
          data-app-icon-url-input="${item.key}"
          placeholder="粘贴图片链接，或直接使用下面的上传按钮"
          value="${escapeHtml(customImage)}"
        />

        <div class="app-icon-actions">
          <label class="sub-btn compact-btn app-icon-file-label">
            上传图片
            <input type="file" accept="image/*" data-app-icon-file-input="${item.key}" />
          </label>
          <button type="button" class="main-btn compact-main-btn" data-save-app-icon="${item.key}">保存</button>
          <button type="button" class="sub-btn compact-btn" data-clear-app-icon="${item.key}">恢复默认</button>
        </div>
      </article>
    `;
  }).join('');

  applyAppIconImages();
}

function saveAppIconFromInput(key) {
  const input = document.querySelector(`[data-app-icon-url-input="${key}"]`);
  if (!input) return;

  updateAppIconImage(key, input.value);
  renderAppIconSettings();
  alert('App 图片已更新。');
}

function clearAppIconImage(key) {
  updateAppIconImage(key, '');
  renderAppIconSettings();
  alert('已恢复默认图标。');
}

function handleAppIconFileChange(key, file) {
  if (!getAppIconConfig(key) || !file) return;

  if (!String(file.type || '').startsWith('image/')) {
    alert('请上传图片文件。');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    updateAppIconImage(key, typeof reader.result === 'string' ? reader.result : '');
    renderAppIconSettings();
    alert('图片已上传并应用到桌面图标。');
  };
  reader.onerror = () => {
    alert('读取图片失败，请重试。');
  };
  reader.readAsDataURL(file);
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const target = document.getElementById(screenId);
  if (!target) return;

  target.classList.add('active');

  if (screenId === 'home-screen') {
    renderHomeLauncher();
    applyHomeWallpaper();
  }

  if (screenId === 'messages-screen') {
    showMessagesTab(currentMessagesTab);
    renderConversationList();
    renderContacts();
    renderMoments();
  }

  if (screenId === 'notes-screen') renderNotes();
  if (screenId === 'maps-screen') renderRoutes();
  if (screenId === 'redbook-screen') renderCommunityFeed('redbook');
  if (screenId === 'weibo-screen') renderCommunityFeed('weibo');
  if (screenId === 'forum-screen') renderCommunityFeed('forum');
  if (screenId === 'whisper-screen') renderWhisper();
  if (screenId === 'rules-screen') renderWorldRules();
  if (screenId === 'settings-screen') {
    applyHomeWallpaper();
    renderAppIconSettings();
  }

  if (screenId === 'chat-screen' && typeof loadCurrentConversationIntoChat === 'function') {
    loadCurrentConversationIntoChat();
  }
}

function showMessagesTab(tabName) {
  currentMessagesTab = tabName;

  document.querySelectorAll('[data-messages-tab]').forEach(button => {
    button.classList.toggle('active', button.dataset.messagesTab === tabName);
  });

  document.querySelectorAll('.messages-tab').forEach(panel => {
    panel.classList.toggle('active', panel.id === `messages-tab-${tabName}`);
  });
}

function renderConversationList() {
  const listEl = document.getElementById('conversation-list');
  if (!listEl) return;

  const query = (document.getElementById('chat-search')?.value || '').trim().toLowerCase();
  const sorted = [...conversations].sort((a, b) => getConversationActivityTime(b) - getConversationActivityTime(a));
  const filtered = sorted.filter(conversation => conversationMatchesQuery(conversation, query));

  if (!filtered.length) {
    listEl.innerHTML = '<div class="settings-card">没有匹配到聊天，试试搜索消息内容、联系人名字，或新建一个群聊。</div>';
    return;
  }

  listEl.innerHTML = filtered.map(conversation => {
    const displayName = getConversationDisplayName(conversation);
    const preview = getConversationSearchPreview(conversation, query);

    return `
      <div class="thread-swipe-row ${openConversationSwipeId === conversation.id ? 'is-swiped' : ''}" data-thread-swipe-row="${conversation.id}">
        <div class="thread-delete-pane">
          <button type="button" class="thread-delete-btn" data-delete-conversation="${conversation.id}">删除</button>
        </div>
        <button type="button" class="thread-card" data-open-conversation="${conversation.id}">
          ${buildConversationAvatarHtml(conversation)}
          <div class="thread-main">
            <div class="thread-top">
              <h3 class="thread-name">${escapeHtml(displayName)}</h3>
              <span class="thread-time">${formatRelativeTime(getConversationActivityTime(conversation))}</span>
            </div>
            <p class="thread-preview">${escapeHtml(preview)}</p>
          </div>
          ${conversation.unreadCount ? `<div class="thread-side"><span class="thread-badge">${conversation.unreadCount}</span></div>` : ''}
        </button>
      </div>
    `;
  }).join('');
}

function renderContacts() {
  const listEl = document.getElementById('contacts-list');
  if (!listEl) return;

  const query = (document.getElementById('contact-search')?.value || '').trim().toLowerCase();
  const filtered = contacts.filter(contact => {
    if (!query) return true;
    return [contact.name, contact.note].join(' ').toLowerCase().includes(query);
  });

  if (!filtered.length) {
    listEl.innerHTML = '<div class="settings-card">暂时没有匹配到联系人，可以右上角继续新建。</div>';
    return;
  }

  listEl.innerHTML = filtered.map(contact => `
    <div class="contact-card">
      <div class="contact-avatar" style="--accent:${getAvatarColor(contact.name)};">${contact.avatar || initialsFromName(contact.name)}</div>
      <div class="contact-main">
        <div class="contact-top">
          <h3 class="contact-name">${contact.name}</h3>
          <span class="contact-meta">${formatRelativeTime(contact.createdAt)}</span>
        </div>
        <p class="contact-note">${contact.note || '点击开始新的 AI 聊天。'}</p>
      </div>
      <div class="contact-action">
        <button type="button" class="main-btn compact-main-btn" data-start-contact-chat="${contact.id}">聊天</button>
      </div>
    </div>
  `).join('');
}

function renderMoments() {
  const listEl = document.getElementById('moments-list');
  if (!listEl) return;

  const ordered = [...moments].sort((a, b) => b.createdAt - a.createdAt);
  listEl.innerHTML = ordered.map(moment => `
    <article class="moment-card">
      <div class="moment-head">
        <div class="moment-avatar" style="--accent:${getAvatarColor(moment.author)};">${moment.avatar || initialsFromName(moment.author)}</div>
        <div>
          <h3 class="moment-name">${moment.author}</h3>
          <div class="moment-time">${formatRelativeTime(moment.createdAt)}</div>
        </div>
      </div>
      <div class="moment-body">
        <p class="moment-text">${moment.text}</p>
        <div class="moment-actions">
          <span>赞 ${moment.likes}</span>
          <span>评论 ${moment.comments}</span>
          <span>分享</span>
        </div>
      </div>
    </article>
  `).join('');
}

function renderNotes() {
  const listEl = document.getElementById('notes-list');
  const titleEl = document.getElementById('note-title-input');
  const bodyEl = document.getElementById('note-body-input');
  const updatedLabelEl = document.getElementById('note-updated-label');
  if (!listEl || !titleEl || !bodyEl || !updatedLabelEl) return;

  const ordered = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
  const current = getSelectedNote();

  listEl.innerHTML = ordered.map(note => `
    <button type="button" class="note-card ${note.id === current?.id ? 'active' : ''}" data-select-note="${note.id}">
      <div class="thread-top">
        <h3 class="note-title">${note.title}</h3>
        <span class="note-time">${formatRelativeTime(note.updatedAt)}</span>
      </div>
      <p class="note-snippet">${note.body.slice(0, 80)}${note.body.length > 80 ? '...' : ''}</p>
    </button>
  `).join('');

  if (current) {
    titleEl.value = current.title;
    bodyEl.value = current.body;
    updatedLabelEl.textContent = `更新于 ${formatRelativeTime(current.updatedAt)}`;
  } else {
    titleEl.value = '';
    bodyEl.value = '';
    updatedLabelEl.textContent = '暂无笔记';
  }
}

function renderRoutes() {
  const listEl = document.getElementById('map-route-list');
  if (!listEl) return;

  listEl.innerHTML = MAP_ROUTES.map(route => `
    <article class="route-card">
      <div class="route-top">
        <div>
          <h3 class="route-title">${route.title}</h3>
          <p class="route-meta">${route.meta}</p>
        </div>
        <div>
          <div class="route-distance">${route.distance}</div>
          <div class="route-time">${route.time}</div>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCommunityFeed(type) {
  const containerMap = { redbook: 'redbook-feed', weibo: 'weibo-feed', forum: 'forum-feed' };
  const container = document.getElementById(containerMap[type]);
  const items = COMMUNITY_FEEDS[type];
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = items.map(item => `
    <article class="feed-card">
      <div class="feed-head">
        <div class="feed-avatar" style="--accent:${getAvatarColor(item.user)};">${initialsFromName(item.user)}</div>
        <div>
          <div class="feed-top">
            <strong class="feed-name">${item.user}</strong>
            <span class="feed-meta">${item.meta}</span>
          </div>
          <p class="feed-subtitle">${item.subtitle}</p>
        </div>
      </div>
      <p class="feed-text">${item.text}</p>
      <div class="feed-media" style="--media-a:${item.mediaA};--media-b:${item.mediaB};">${item.mediaLabel}</div>
      <div class="feed-actions">
        <span>赞 ${item.likes}</span>
        <span>评论 ${item.comments}</span>
        <span>收藏</span>
      </div>
    </article>
  `).join('');
}

function renderWhisperPreview() {
  const container = document.getElementById('whisper-phone-preview');
  if (!container) return;

  let inner = '';

  if (currentWhisperView === 'home') {
    inner = `
      <div class="mini-phone">
        <div class="mini-phone-screen">
          <div class="mini-phone-time" id="whisper-phone-time">${formatClock(new Date())}</div>
          <div class="mini-phone-date" id="whisper-phone-date">${formatHomeDate(new Date())}</div>
          <div class="mini-phone-grid">
            <div class="mini-app"><div class="mini-app-icon">M</div><div class="mini-app-label">Msg</div></div>
            <div class="mini-app"><div class="mini-app-icon">N</div><div class="mini-app-label">Notes</div></div>
            <div class="mini-app"><div class="mini-app-icon">W</div><div class="mini-app-label">Whisper</div></div>
            <div class="mini-app"><div class="mini-app-icon">F</div><div class="mini-app-label">论坛</div></div>
          </div>
          <div class="mini-list">
            <div class="mini-list-card">Nova 刚刚把一条共享笔记改成了“今晚记得早点回我”。</div>
            <div class="mini-list-card">最近打开最多的是 Messages 和 Whisper。</div>
          </div>
        </div>
      </div>
    `;
  }

  if (currentWhisperView === 'chats') {
    inner = `
      <div class="mini-phone">
        <div class="mini-phone-screen">
          <div class="mini-list">
            <div class="mini-list-card">Messages · Luna：我把今天的想法发在朋友圈了。</div>
            <div class="mini-list-card">Dream Circle：谁来决定今晚的主题？</div>
            <div class="mini-list-card">Whisper：同步完成，可以继续查看对方主页。</div>
          </div>
        </div>
      </div>
    `;
  }

  if (currentWhisperView === 'notes') {
    inner = `
      <div class="mini-phone">
        <div class="mini-phone-screen">
          <div class="mini-list">
            <div class="mini-list-card">共享备忘：把“像真的手机一样”的感觉做出来，重点是生活流和关系感。</div>
            <div class="mini-list-card">共享待办：补全朋友圈、群聊、地图、论坛的日常细节。</div>
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = inner;
}

function renderWhisper() {
  document.querySelectorAll('[data-whisper-view]').forEach(button => {
    button.classList.toggle('active', button.dataset.whisperView === currentWhisperView);
  });

  renderWhisperPreview();

  const syncList = document.getElementById('whisper-sync-list');
  if (!syncList) return;

  const items = [
    { title: '查看对方主页', text: '像打开一个被同步过的模拟手机桌面，可以看到时间、常用 App 和最近状态。', meta: '实时' },
    { title: '共享聊天感', text: 'Whisper 适合承接更亲密的朋友或情侣关系，比普通聊天更贴近“共同生活”的感觉。', meta: '1 分钟前' },
    { title: '共享备忘', text: '你们可以把一段共同计划、一段剧情设定，或者一句想留给对方的话放在这里。', meta: '刚刚' }
  ];

  syncList.innerHTML = items.map(item => `
    <article class="sync-card">
      <div>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </div>
      <span class="sync-meta">${item.meta}</span>
    </article>
  `).join('');
}

function renderWorldRules() {
  const listEl = document.getElementById('world-rule-list');
  if (!listEl) return;

  const ordered = [...worldRules].sort((a, b) => b.createdAt - a.createdAt);

  if (!ordered.length) {
    listEl.innerHTML = `
      <div class="settings-card world-rule-empty">
        还没有核心世界规则。点击右上角的 <strong>+</strong> 添加第一条规则，并决定是否同步给所有角色。
      </div>
    `;
    return;
  }

  listEl.innerHTML = ordered.map(rule => `
    <article class="world-rule-card">
      <div class="world-rule-top">
        <span class="world-rule-badge ${rule.syncAll ? '' : 'is-muted'}">
          ${rule.syncAll ? '已同步给所有角色' : '仅保存在世界书'}
        </span>
        <span class="world-rule-time">${formatRelativeTime(rule.createdAt)}</span>
      </div>
      <p class="world-rule-text">${escapeHtml(rule.content)}</p>
    </article>
  `).join('');
}

function setWorldRuleSyncState(syncAll) {
  const toggle = document.getElementById('world-rule-sync-toggle');
  if (!toggle) return;

  const nextState = Boolean(syncAll);
  toggle.dataset.syncAll = nextState ? 'true' : 'false';
  toggle.classList.toggle('active', nextState);
  toggle.textContent = `是否同步给所有角色：${nextState ? '是' : '否'}`;
}

function openWorldRuleModal() {
  const modal = document.getElementById('world-rule-modal');
  const input = document.getElementById('world-rule-input');
  if (!modal || !input) return;

  input.value = '';
  setWorldRuleSyncState(true);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  window.setTimeout(() => {
    input.focus();
  }, 0);
}

function closeWorldRuleModal() {
  const modal = document.getElementById('world-rule-modal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

function saveWorldRuleFromModal() {
  const input = document.getElementById('world-rule-input');
  const syncToggle = document.getElementById('world-rule-sync-toggle');
  const content = input?.value.trim() || '';

  if (!content) {
    alert('请先填写核心规则。');
    return;
  }

  worldRules.unshift({
    id: uid('world_rule'),
    content,
    syncAll: syncToggle?.dataset.syncAll !== 'false',
    createdAt: Date.now()
  });

  saveWorldRules();
  renderWorldRules();
  closeWorldRuleModal();
}

function createContact(name, note = '') {
  const trimmedName = String(name || '').trim();
  if (!trimmedName) return null;

  const contact = createContactPayload(trimmedName, note);
  contacts.unshift(contact);
  saveContacts();
  renderContacts();
  if (document.getElementById('group-modal')?.classList.contains('active')) {
    renderGroupMemberPicker();
  }
  return contact;
}

function createConversationForContact(contactId) {
  const existing = findDirectConversation(contactId);
  if (existing) return existing;

  const contact = getContactById(contactId);
  if (!contact) return null;

  const conversation = createConversationPayload({
    contactId,
    remark: contact.name,
    nameIdentity: contact.name,
    title: contact.name,
    type: 'direct',
    description: '私聊',
    relationship: `${contact.name} 是你手机里的联系人，当前关系适合从自然熟悉的聊天感开始。`,
    persona: `你现在扮演 ${contact.name}。回复自然、口语化，像真实手机聊天。`,
    style: '自然、简洁、口语化。'
  });

  conversations.unshift(conversation);
  saveConversations();
  seedHistoryIfMissing(conversation);
  return conversation;
}
function renderGroupMemberPicker() {
  const picker = document.getElementById('group-member-picker');
  if (!picker) return;

  if (!contacts.length) {
    picker.innerHTML = '<div class="group-empty-state">先在联系人里创建至少两个联系人，才能组建群聊。</div>';
    return;
  }

  picker.innerHTML = contacts.map(contact => `
    <label class="group-member-option">
      <input type="checkbox" value="${contact.id}" />
      <div class="group-member-copy">
        <strong>${escapeHtml(contact.name)}</strong>
        <span>${escapeHtml(contact.note || '可加入群聊')}</span>
      </div>
    </label>
  `).join('');
}

function openGroupModal() {
  const modal = document.getElementById('group-modal');
  const nameInput = document.getElementById('group-name-input');
  const limitInput = document.getElementById('group-memory-limit-input');
  if (!modal || !nameInput || !limitInput) return;

  renderGroupMemberPicker();
  nameInput.value = '';
  limitInput.value = String(DEFAULT_GROUP_SHARED_MEMORY_LIMIT);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  window.setTimeout(() => {
    nameInput.focus();
  }, 0);
}

function closeGroupModal() {
  const modal = document.getElementById('group-modal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

function saveGroupConversationFromModal() {
  const nameInput = document.getElementById('group-name-input');
  const limitInput = document.getElementById('group-memory-limit-input');
  const picker = document.getElementById('group-member-picker');
  if (!nameInput || !limitInput || !picker) return;

  const groupName = nameInput.value.trim();
  const members = Array.from(picker.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
  const sharedMemoryLimit = clampSharedMemoryLimit(limitInput.value);

  if (!groupName) {
    alert('请先填写群名称。');
    return;
  }

  if (members.length < 2) {
    alert('请至少选择两个联系人加入群聊。');
    return;
  }

  const conversation = createConversationPayload({
    remark: groupName,
    nameIdentity: groupName,
    title: groupName,
    type: 'group',
    participantIds: members,
    sharedMemoryLimit,
    description: `群成员 ${members.length} 人`,
    relationship: '这是一个真实日常感的群聊，大家彼此熟悉，可以自然接话和延续之前的话题。',
    persona: '你现在扮演一个有群体氛围感的群聊。回复可以自然带出不同成员的延续感，但整体仍像真实聊天记录。',
    style: '像微信或 QQ 群聊一样自然、简洁、口语化。'
  });

  conversations.unshift(conversation);
  saveConversations();
  seedHistoryIfMissing(conversation);
  renderConversationList();
  closeGroupModal();
  openConversation(conversation.id);
}

function createGroupConversation() {
  openGroupModal();
}
function publishMoment() {
  const input = document.getElementById('moment-input');
  const text = input?.value.trim();

  if (!text) {
    alert('先写一点内容再发布。');
    return;
  }

  moments.unshift({
    id: uid('moment'),
    author: 'You',
    avatar: 'ME',
    text,
    createdAt: Date.now(),
    likes: 0,
    comments: 0
  });

  saveMoments();
  input.value = '';
  renderMoments();
  updateHomeCards();
}

function selectNote(noteId) {
  selectedNoteId = noteId;
  saveSelectedNoteId();
  renderNotes();
}

function createNote() {
  const note = {
    id: uid('note'),
    title: `新笔记 ${notes.length + 1}`,
    body: '',
    updatedAt: Date.now()
  };

  notes.unshift(note);
  selectedNoteId = note.id;
  saveNotes();
  saveSelectedNoteId();
  renderNotes();
}

function saveCurrentNote() {
  const note = getSelectedNote();
  if (!note) return;

  const title = document.getElementById('note-title-input')?.value.trim() || '未命名笔记';
  const body = document.getElementById('note-body-input')?.value.trim() || '';

  note.title = title;
  note.body = body;
  note.updatedAt = Date.now();

  saveNotes();
  renderNotes();
  updateHomeCards();
}

function openConversation(conversationId) {
  currentConversationId = conversationId;
  window.currentConversationId = conversationId;

  const conversation = getConversationById(conversationId);
  if (conversation) {
    conversation.unreadCount = 0;
    conversation.updatedAt = getConversationActivityTime(conversation);
    saveConversations();
  }

  saveCurrentConversationId();
  renderConversationList();

  if (typeof loadCurrentConversationIntoChat === 'function') {
    loadCurrentConversationIntoChat();
  }

  showScreen('chat-screen');
}

function fillConversationSettingsForm(conversationId) {
  const conversation = getConversationById(conversationId);
  if (!conversation) return;

  const titleEl = document.getElementById('chat-title-input');
  const nameEl = document.getElementById('chat-name-input');
  const avatarImageEl = document.getElementById('chat-avatar-image-input');
  const personaEl = document.getElementById('chat-persona-input');
  const styleEl = document.getElementById('chat-style-input');
  const relationshipEl = document.getElementById('chat-relationship-input');
  const sharedMemoryLimitEl = document.getElementById('chat-shared-memory-limit-input');
  const groupSettingsEl = document.getElementById('group-memory-settings');

  if (titleEl) titleEl.value = getConversationDisplayName(conversation);
  if (nameEl) nameEl.value = getConversationNameIdentity(conversation);
  if (avatarImageEl) avatarImageEl.value = String(conversation.avatarImage || '').trim();
  if (personaEl) personaEl.value = conversation.persona || '';
  if (styleEl) styleEl.value = conversation.style || '';
  if (relationshipEl) relationshipEl.value = conversation.relationship || '';
  if (sharedMemoryLimitEl) sharedMemoryLimitEl.value = String(clampSharedMemoryLimit(conversation.sharedMemoryLimit));
  if (groupSettingsEl) groupSettingsEl.classList.toggle('hidden', conversation.type !== 'group');
  setChatAvatarPreview(String(conversation.avatarImage || '').trim(), conversation);
}

function setChatAvatarPreview(imageUrl = '', conversation = getConversationById(currentConversationId)) {
  const previewEl = document.getElementById('chat-avatar-preview');
  const hiddenInput = document.getElementById('chat-avatar-image-input');
  if (!previewEl) return;

  const normalized = String(imageUrl || '').trim();
  const avatarInfo = getConversationAvatarInfo(conversation);
  const fallbackText = avatarInfo.text || 'AI';

  previewEl.classList.toggle('has-image', Boolean(normalized));
  previewEl.innerHTML = normalized
    ? `<img src="${escapeHtml(normalized)}" alt="角色头像" />`
    : escapeHtml(fallbackText);

  if (hiddenInput) hiddenInput.value = normalized;
}

function clearChatAvatarSelection() {
  setChatAvatarPreview('', getConversationById(currentConversationId));
  const fileInput = document.getElementById('chat-avatar-file-input');
  if (fileInput) fileInput.value = '';
}

function handleChatAvatarFileChange(file) {
  if (!file) return;
  if (!String(file.type || '').startsWith('image/')) {
    alert('请上传图片文件。');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    setChatAvatarPreview(typeof reader.result === 'string' ? reader.result : '', getConversationById(currentConversationId));
  };
  reader.onerror = () => {
    alert('读取头像失败，请重试。');
  };
  reader.readAsDataURL(file);
}

function saveCurrentConversationSettings() {
  const conversation = getConversationById(currentConversationId);
  if (!conversation) {
    alert('当前没有打开任何对话。');
    return;
  }

  const remark = document.getElementById('chat-title-input')?.value.trim() || getConversationDisplayName(conversation);
  const nameIdentity = document.getElementById('chat-name-input')?.value.trim() || getConversationNameIdentity(conversation);

  conversation.remark = remark;
  conversation.title = remark;
  conversation.nameIdentity = nameIdentity;
  conversation.avatarImage = document.getElementById('chat-avatar-image-input')?.value.trim() || '';
  conversation.persona = document.getElementById('chat-persona-input')?.value.trim() || '';
  conversation.style = document.getElementById('chat-style-input')?.value.trim() || '';
  conversation.relationship = document.getElementById('chat-relationship-input')?.value.trim() || '';
  if (conversation.type === 'group') {
    conversation.sharedMemoryLimit = clampSharedMemoryLimit(document.getElementById('chat-shared-memory-limit-input')?.value);
  }
  conversation.updatedAt = Date.now();

  saveConversations();
  renderConversationList();

  if (typeof updateChatHeaderTitle === 'function') {
    updateChatHeaderTitle();
  }

  alert('聊天设定已保存。');
  showScreen('chat-screen');
}

function normalizeBaseUrl(url) {
  return (url || '').trim().replace(/\/+$/, '');
}

function syncRangeValue(inputId, valueId) {
  const input = document.getElementById(inputId);
  const value = document.getElementById(valueId);
  if (!input || !value) return;

  value.textContent = input.value;
  input.addEventListener('input', () => {
    value.textContent = input.value;
  });
}

function loadApiSettings() {
  const proxyEl = document.getElementById('api-proxy');
  const keyEl = document.getElementById('api-key');
  const modelEl = document.getElementById('api-model');
  const modelSelectEl = document.getElementById('api-model-select');
  const tempEl = document.getElementById('api-temperature');
  const presenceEl = document.getElementById('api-presence');
  const frequencyEl = document.getElementById('api-frequency');
  const memoryModeEl = document.getElementById('memory-mode');
  const nameIdentityEl = document.getElementById('name-identity-book');
  const coreWorldEl = document.getElementById('core-world-book');
  const personaEl = document.getElementById('persona-book');
  const styleEl = document.getElementById('style-book');
  const relationshipEl = document.getElementById('relationship-state');
  const priorityNoteEl = document.getElementById('priority-note');

  const savedProxy = localStorage.getItem('api_proxy') || '';
  const savedKey = localStorage.getItem('api_key') || '';
  const savedModel = localStorage.getItem('api_model') || '';
  const savedTemp = localStorage.getItem('api_temperature') || '0.7';
  const savedPresence = localStorage.getItem('api_presence_penalty') || '0';
  const savedFrequency = localStorage.getItem('api_frequency_penalty') || '0';
  const savedMemoryMode = localStorage.getItem('memory_mode') || 'auto';
  const savedNameIdentity = localStorage.getItem('name_identity_book') || '';
  const savedCoreWorld = localStorage.getItem('core_world_book') || '';
  const savedPersona = localStorage.getItem('persona_book') || '';
  const savedStyle = localStorage.getItem('style_book') || '';
  const savedRelationship = localStorage.getItem('relationship_state') || '';

  if (proxyEl) proxyEl.value = savedProxy;
  if (keyEl) keyEl.value = savedKey;
  if (modelEl) modelEl.value = savedModel;
  if (tempEl) tempEl.value = savedTemp;
  if (presenceEl) presenceEl.value = savedPresence;
  if (frequencyEl) frequencyEl.value = savedFrequency;
  if (memoryModeEl) memoryModeEl.value = savedMemoryMode;
  if (nameIdentityEl) nameIdentityEl.value = savedNameIdentity;
  if (coreWorldEl) coreWorldEl.value = savedCoreWorld;
  if (personaEl) personaEl.value = savedPersona;
  if (styleEl) styleEl.value = savedStyle;
  if (relationshipEl) relationshipEl.value = savedRelationship;

  if (priorityNoteEl) {
    priorityNoteEl.value = [
      'Priority:',
      'Name identity = Core worldview > Persona > Style > Relationship state > Chat history',
      '',
      '名称身份与核心世界规则并列最高优先级。',
      '低优先级内容绝不能覆盖高优先级内容。'
    ].join('\n');
  }

  if (modelSelectEl && savedModel) {
    modelSelectEl.innerHTML = `
      <option value="">请先拉取模型</option>
      <option value="${savedModel}" selected>${savedModel}</option>
    `;
  }

  syncRangeValue('api-temperature', 'temp-value');
  syncRangeValue('api-presence', 'presence-value');
  syncRangeValue('api-frequency', 'frequency-value');
}

async function fetchModels() {
  const proxyEl = document.getElementById('api-proxy');
  const keyEl = document.getElementById('api-key');
  const modelSelectEl = document.getElementById('api-model-select');
  const modelInputEl = document.getElementById('api-model');

  const baseUrl = normalizeBaseUrl(proxyEl?.value);
  const apiKey = (keyEl?.value || '').trim();

  if (!baseUrl) {
    alert('请先填写 Base URL。');
    return;
  }

  modelSelectEl.innerHTML = '<option value="">拉取中...</option>';

  try {
    const headers = {};
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const response = await fetch(`${baseUrl}/v1/models`, { method: 'GET', headers });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`拉取失败：${response.status} ${errorText}`);
    }

    const data = await response.json();
    const models = Array.isArray(data?.data) ? data.data : [];
    modelSelectEl.innerHTML = '<option value="">请选择模型</option>';

    if (!models.length) {
      modelSelectEl.innerHTML = '<option value="">没有返回模型</option>';
      alert('接口请求成功，但没有返回可用模型。你也可以手动填写模型名。');
      return;
    }

    models.forEach(item => {
      const id = item?.id || '';
      if (!id) return;
      const option = document.createElement('option');
      option.value = id;
      option.textContent = id;
      modelSelectEl.appendChild(option);
    });

    modelSelectEl.onchange = function onChange() {
      if (this.value && modelInputEl) modelInputEl.value = this.value;
    };

    alert(`成功拉取 ${models.length} 个模型，请手动选择。`);
  } catch (error) {
    modelSelectEl.innerHTML = '<option value="">拉取失败</option>';
    alert(error.message);
  }
}

function saveApiSettings() {
  const proxy = normalizeBaseUrl(document.getElementById('api-proxy')?.value);
  const key = document.getElementById('api-key')?.value.trim() || '';
  const modelInput = document.getElementById('api-model')?.value.trim() || '';
  const modelSelect = document.getElementById('api-model-select')?.value || '';
  const temperature = document.getElementById('api-temperature')?.value || '0.7';
  const presence = document.getElementById('api-presence')?.value || '0';
  const frequency = document.getElementById('api-frequency')?.value || '0';
  const memoryMode = document.getElementById('memory-mode')?.value || 'auto';

  localStorage.setItem('api_proxy', proxy);
  localStorage.setItem('api_key', key);
  localStorage.setItem('api_model', modelInput || modelSelect);
  localStorage.setItem('api_temperature', temperature);
  localStorage.setItem('api_presence_penalty', presence);
  localStorage.setItem('api_frequency_penalty', frequency);
  localStorage.setItem('memory_mode', memoryMode);

  alert('API 设置已保存。');
}

function saveRulesSettings() {
  saveWorldRules();
  renderWorldRules();
}

function bindStaticEvents() {
  document.querySelectorAll('[data-screen]').forEach(button => {
    button.addEventListener('click', () => {
      const screenId = button.dataset.screen;
      if (button.dataset.messagesTabTarget) showMessagesTab(button.dataset.messagesTabTarget);
      showScreen(screenId);
    });
  });

  document.querySelectorAll('[data-back-screen]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.backScreen;
      if (target === 'messages-screen') renderConversationList();
      showScreen(target);
    });
  });

  document.querySelectorAll('[data-messages-tab]').forEach(button => {
    button.addEventListener('click', () => {
      showMessagesTab(button.dataset.messagesTab);
    });
  });

  const homePagesShell = document.getElementById('home-app-pages-shell');
  homePagesShell?.addEventListener('pointerdown', event => {
    if (event.button !== 0 || homeDragState) return;
    if (event.target.closest('[data-launcher-app-id]')) return;

    const rect = homePagesShell.getBoundingClientRect();
    homeSwipeState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width: rect.width,
      active: null
    };
  });

  document.addEventListener('pointerdown', event => {
    const swipeRow = event.target.closest('[data-thread-swipe-row]');
    if (!swipeRow || event.target.closest('[data-delete-conversation]')) return;

    conversationSwipeState = {
      id: swipeRow.dataset.threadSwipeRow,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false
    };
  });

  document.addEventListener('click', event => {
    const conversationTrigger = event.target.closest('[data-open-conversation]');
    if (conversationTrigger) {
      if (Date.now() < suppressConversationOpenUntil) return;
      if (openConversationSwipeId === conversationTrigger.dataset.openConversation) {
        openConversationSwipeId = null;
        renderConversationList();
        return;
      }
      openConversation(conversationTrigger.dataset.openConversation);
      return;
    }

    const deleteConversationTrigger = event.target.closest('[data-delete-conversation]');
    if (deleteConversationTrigger) {
      deleteConversationPermanently(deleteConversationTrigger.dataset.deleteConversation);
      return;
    }

    const contactTrigger = event.target.closest('[data-start-contact-chat]');
    if (contactTrigger) {
      const conversation = createConversationForContact(contactTrigger.dataset.startContactChat);
      if (conversation) {
        renderConversationList();
        openConversation(conversation.id);
      }
      return;
    }

    const noteTrigger = event.target.closest('[data-select-note]');
    if (noteTrigger) {
      selectNote(noteTrigger.dataset.selectNote);
      return;
    }

    const whisperTrigger = event.target.closest('[data-whisper-view]');
    if (whisperTrigger) {
      currentWhisperView = whisperTrigger.dataset.whisperView;
      renderWhisper();
      return;
    }

    const saveAppIconTrigger = event.target.closest('[data-save-app-icon]');
    if (saveAppIconTrigger) {
      saveAppIconFromInput(saveAppIconTrigger.dataset.saveAppIcon);
      return;
    }

    const clearAppIconTrigger = event.target.closest('[data-clear-app-icon]');
    if (clearAppIconTrigger) {
      clearAppIconImage(clearAppIconTrigger.dataset.clearAppIcon);
      return;
    }

    if (openConversationSwipeId && !event.target.closest('[data-thread-swipe-row]')) {
      openConversationSwipeId = null;
      renderConversationList();
    }
  });

  document.addEventListener('change', event => {
    const fileInput = event.target.closest('[data-app-icon-file-input]');
    if (fileInput) {
      handleAppIconFileChange(fileInput.dataset.appIconFileInput, fileInput.files?.[0]);
      return;
    }

    if (event.target.id === 'chat-avatar-file-input') {
      handleChatAvatarFileChange(event.target.files?.[0]);
      return;
    }

    if (event.target.id === 'home-wallpaper-file-input') {
      handleHomeWallpaperFileChange(event.target.files?.[0]);
    }
  });

  document.addEventListener('pointermove', event => {
    if (conversationSwipeState && event.pointerId === conversationSwipeState.pointerId) {
      const dx = event.clientX - conversationSwipeState.startX;
      const dy = event.clientY - conversationSwipeState.startY;
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        conversationSwipeState.moved = true;
      }
    }

    if (homePendingPress && event.pointerId === homePendingPress.pointerId) {
      const moveX = Math.abs(event.clientX - homePendingPress.startX);
      const moveY = Math.abs(event.clientY - homePendingPress.startY);
      if (moveX > 8 || moveY > 8) {
        cancelHomePendingPress();
      }
    }

    if (homeDragState && event.pointerId === homeDragState.pointerId) {
      event.preventDefault();
      homeDragState.dragMoved = true;
      updateHomeDragGhostPosition(event.clientX, event.clientY);

      const shellRect = homePagesShell?.getBoundingClientRect();
      if (shellRect) {
        if (event.clientX >= shellRect.right - HOME_DRAG_EDGE_SIZE) {
          queueHomePageSwitch(currentHomePage + 1);
        } else if (event.clientX <= shellRect.left + HOME_DRAG_EDGE_SIZE) {
          queueHomePageSwitch(currentHomePage - 1);
        } else {
          clearHomeDragSwitchTimer();
        }
      }

      const hoverButton = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-launcher-app-id]');
      const targetId = hoverButton && hoverButton.dataset.launcherAppId !== homeDragState.appId
        ? hoverButton.dataset.launcherAppId
        : null;
      homeDragState.targetAppId = targetId;
      updateHomeDropTarget(targetId);
      return;
    }

    if (homeSwipeState && event.pointerId === homeSwipeState.pointerId) {
      const dx = event.clientX - homeSwipeState.startX;
      const dy = event.clientY - homeSwipeState.startY;

      if (homeSwipeState.active === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        homeSwipeState.active = Math.abs(dx) > Math.abs(dy);
        if (!homeSwipeState.active) {
          homeSwipeState = null;
          return;
        }
      }

      const track = document.getElementById('home-app-pages-track');
      if (!track) return;

      event.preventDefault();
      track.style.transition = 'none';
      track.style.transform = `translateX(${(-currentHomePage * homeSwipeState.width) + dx}px)`;
    }
  });

  document.addEventListener('pointerup', event => {
    if (conversationSwipeState && event.pointerId === conversationSwipeState.pointerId) {
      const dx = event.clientX - conversationSwipeState.startX;
      const dy = event.clientY - conversationSwipeState.startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 42) {
        suppressConversationOpenUntil = Date.now() + 260;
        if (dx < 0) {
          openConversationSwipeId = conversationSwipeState.id;
        } else if (openConversationSwipeId === conversationSwipeState.id) {
          openConversationSwipeId = null;
        }
        renderConversationList();
      }
      conversationSwipeState = null;
    }

    if (homePendingPress && event.pointerId === homePendingPress.pointerId) {
      cancelHomePendingPress();
    }

    if (homeDragState && event.pointerId === homeDragState.pointerId) {
      finishHomeDrag();
      return;
    }

    if (homeSwipeState && event.pointerId === homeSwipeState.pointerId) {
      if (homeSwipeState.active) {
        const dx = event.clientX - homeSwipeState.startX;
        const threshold = homeSwipeState.width * 0.18;
        if (dx <= -threshold) {
          setHomePage(currentHomePage + 1);
        } else if (dx >= threshold) {
          setHomePage(currentHomePage - 1);
        } else {
          setHomePage(currentHomePage);
        }
      }

      homeSwipeState = null;
    }
  });

  document.addEventListener('pointercancel', event => {
    if (conversationSwipeState && event.pointerId === conversationSwipeState.pointerId) {
      conversationSwipeState = null;
    }

    if (homePendingPress && event.pointerId === homePendingPress.pointerId) {
      cancelHomePendingPress();
    }

    if (homeDragState && event.pointerId === homeDragState.pointerId) {
      finishHomeDrag();
    }

    if (homeSwipeState && event.pointerId === homeSwipeState.pointerId) {
      setHomePage(currentHomePage);
      homeSwipeState = null;
    }
  });

  document.getElementById('chat-search')?.addEventListener('input', renderConversationList);
  document.getElementById('contact-search')?.addEventListener('input', renderContacts);
  document.getElementById('publish-moment-btn')?.addEventListener('click', publishMoment);
  document.getElementById('new-note-btn')?.addEventListener('click', createNote);
  document.getElementById('save-note-btn')?.addEventListener('click', saveCurrentNote);

  document.getElementById('add-contact-btn')?.addEventListener('click', () => {
    const name = window.prompt('输入联系人名字', `联系人 ${contacts.length + 1}`);
    if (!name) return;
    const note = window.prompt('写一句备注（可选）', '新的 AI 朋友');
    const created = createContact(name.trim(), (note || '').trim());
    if (created) renderContacts();
  });

  document.getElementById('new-direct-chat-btn')?.addEventListener('click', () => {
    const name = window.prompt('输入你想聊天的联系人名字', `朋友 ${contacts.length + 1}`);
    if (!name) return;

    const note = window.prompt('给这个联系人写一句备注（可选）', '新的聊天对象') || '';
    const contact = createContact(name.trim(), note.trim());
    if (!contact) return;

    const conversation = createConversationForContact(contact.id);
    renderContacts();
    renderConversationList();
    if (conversation) openConversation(conversation.id);
  });

  document.getElementById('open-group-modal-btn')?.addEventListener('click', openGroupModal);
  document.getElementById('close-group-modal-btn')?.addEventListener('click', closeGroupModal);
  document.getElementById('cancel-group-modal-btn')?.addEventListener('click', closeGroupModal);
  document.getElementById('save-group-btn')?.addEventListener('click', saveGroupConversationFromModal);
  document.querySelector('[data-close-group-modal]')?.addEventListener('click', closeGroupModal);
  document.getElementById('chat-avatar-clear-btn')?.addEventListener('click', clearChatAvatarSelection);

  document.getElementById('chat-settings-btn')?.addEventListener('click', () => {
    if (!currentConversationId) {
      alert('请先打开一个聊天。');
      return;
    }

    fillConversationSettingsForm(currentConversationId);
    showScreen('chat-settings-screen');
  });

  document.getElementById('save-chat-settings-btn')?.addEventListener('click', saveCurrentConversationSettings);
  document.getElementById('save-api-btn')?.addEventListener('click', saveApiSettings);
  document.getElementById('save-home-wallpaper-btn')?.addEventListener('click', saveHomeWallpaperFromInput);
  document.getElementById('clear-home-wallpaper-btn')?.addEventListener('click', clearHomeWallpaper);
  document.getElementById('fetch-models-btn')?.addEventListener('click', fetchModels);
  document.getElementById('open-world-rule-modal-btn')?.addEventListener('click', openWorldRuleModal);
  document.getElementById('close-world-rule-modal-btn')?.addEventListener('click', closeWorldRuleModal);
  document.getElementById('cancel-world-rule-btn')?.addEventListener('click', closeWorldRuleModal);
  document.getElementById('save-world-rule-btn')?.addEventListener('click', saveWorldRuleFromModal);
  document.getElementById('world-rule-sync-toggle')?.addEventListener('click', event => {
    setWorldRuleSyncState(event.currentTarget?.dataset.syncAll === 'false');
  });
  document.querySelector('[data-close-world-rule-modal]')?.addEventListener('click', closeWorldRuleModal);

  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target?.id === 'home-wallpaper-url-input') {
      event.preventDefault();
      saveHomeWallpaperFromInput();
      return;
    }

    if (event.key === 'Enter' && event.target?.matches?.('[data-app-icon-url-input]')) {
      event.preventDefault();
      saveAppIconFromInput(event.target.dataset.appIconUrlInput);
      return;
    }

    if (event.key === 'Escape') {
      closeWorldRuleModal();
      closeGroupModal();
    }
  });
}

function renderAll() {
  updateTime();
  renderHomeLauncher();
  applyHomeWallpaper();
  updateHomeCards();
  applyAppIconImages();
  renderConversationList();
  renderContacts();
  renderMoments();
  renderNotes();
  renderRoutes();
  renderCommunityFeed('redbook');
  renderCommunityFeed('weibo');
  renderCommunityFeed('forum');
  renderWhisper();
  renderWorldRules();
  renderAppIconSettings();
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  ensureSeedData();
  migrateLegacyCoreWorldBook();
  loadApiSettings();
  bindStaticEvents();
  renderAll();

  setInterval(() => {
    updateTime();
  }, 30000);
});

window.showScreen = showScreen;
window.getConversationById = getConversationById;
window.getConversationDisplayName = getConversationDisplayName;
window.getConversationAvatarInfo = getConversationAvatarInfo;
window.getConversationRuleSettings = getConversationRuleSettings;
window.getGroupMemberRuleEntries = getGroupMemberRuleEntries;
window.getLinkedMemoryEntries = getLinkedMemoryEntries;
window.openConversation = openConversation;
window.fillConversationSettingsForm = fillConversationSettingsForm;
window.touchConversation = touchConversation;
