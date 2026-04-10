function getApiRuntimeConfig() {
  return {
    proxy: (localStorage.getItem('api_proxy') || '').trim().replace(/\/+$/, ''),
    apiKey: (localStorage.getItem('api_key') || '').trim(),
    model: (localStorage.getItem('api_model') || '').trim(),
    temperature: Number(localStorage.getItem('api_temperature') || '0.7'),
    presencePenalty: Number(localStorage.getItem('api_presence_penalty') || '0'),
    frequencyPenalty: Number(localStorage.getItem('api_frequency_penalty') || '0')
  };
}

function assertApiReady(config) {
  if (!config.proxy || !config.apiKey || !config.model) {
    throw new Error('请先在 API 设置里填写 Base URL、API Key，并选择模型。');
  }
}

function extractTextFromResponse(data) {
  const choiceContent = data?.choices?.[0]?.message?.content;
  if (typeof choiceContent === 'string' && choiceContent.trim()) {
    return choiceContent.trim();
  }

  if (Array.isArray(choiceContent)) {
    const combined = choiceContent
      .map(part => {
        if (typeof part === 'string') return part;
        if (typeof part?.text === 'string') return part.text;
        return '';
      })
      .join('')
      .trim();

    if (combined) return combined;
  }

  const outputText = data?.output?.[0]?.content?.[0]?.text;
  if (typeof outputText === 'string' && outputText.trim()) {
    return outputText.trim();
  }

  return '';
}

function flattenMessageContent(content) {
  if (typeof content === 'string') return content;

  if (Array.isArray(content)) {
    return content.map(part => {
      if (typeof part === 'string') return part;
      if (typeof part?.text === 'string') return part.text;
      if (part?.type === 'image_url') return '[image]';
      return '';
    }).join(' ').trim();
  }

  return '';
}

async function requestChatCompletion(messages, { signal, overrides = {} } = {}) {
  const config = getApiRuntimeConfig();
  assertApiReady(config);

  if (!Array.isArray(messages) || !messages.length) {
    throw new Error('消息不能为空。');
  }

  const response = await fetch(`${config.proxy}/v1/chat/completions`, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: overrides.temperature ?? config.temperature,
      presence_penalty: overrides.presencePenalty ?? config.presencePenalty,
      frequency_penalty: overrides.frequencyPenalty ?? config.frequencyPenalty
    })
  });

  if (!response.ok) {
    const errorText = (await response.text()).trim();
    throw new Error(`API 请求失败：${response.status} ${errorText || response.statusText || '未知错误'}`);
  }

  const data = await response.json();
  const text = extractTextFromResponse(data);

  if (!text) {
    throw new Error('AI 没有返回可用内容。');
  }

  return text;
}

async function callAI(messages, signal) {
  return requestChatCompletion(messages, { signal });
}

async function summarizeAssistantReplyMemory(replyText, signal) {
  const safeReply = String(replyText || '').trim();
  if (!safeReply) {
    return 'assistant 刚刚自然地回应了用户，保留了语气和互动方式，但不保留具体事实。';
  }

  return requestChatCompletion(
    [
      {
        role: 'system',
        content: [
          '请把 assistant 的一段回复压缩成“记忆版摘要”。',
          '只保留语气、表达风格、句式结构和互动方式。',
          '不要保留任何具体事实，例如名字、地点、数字、答案、事件细节。',
          '输出必须只有一句简短中文，不要解释，不要加引号。'
        ].join('\n')
      },
      {
        role: 'user',
        content: `请处理这段 assistant 回复：\n\n${safeReply}`
      }
    ],
    {
      signal,
      overrides: {
        temperature: 0.2,
        presencePenalty: 0,
        frequencyPenalty: 0
      }
    }
  );
}

async function checkReplyAgainstCoreRules({
  reply,
  nameIdentity,
  coreWorld,
  persona,
  style,
  relationship,
  groupMemberRules,
  chatHistory,
  signal
}) {
  const auditReply = await requestChatCompletion(
    [
      {
        role: 'system',
        content: [
          'You are an external rule auditor.',
          'Your only job is to decide whether the assistant reply violates the required priority system.',
          '',
          '[Priority]',
          'Name identity = Core worldview > Persona > Style > Relationship state > Chat history',
          '',
          'Audit in this exact order:',
          '1. Name identity',
          '2. Core worldview',
          '3. Persona',
          '4. Style',
          '5. Relationship state',
          '6. Chat history last',
          '',
          'Rules:',
          '- Name identity and Core worldview are parallel highest-priority layers.',
          '- Persona must obey both Name identity and Core worldview.',
          '- Style controls expression only and cannot change identity, worldview, or persona.',
          '- Relationship state only affects temporary interaction dynamics.',
          '- In a group chat, each selected member must stay consistent with that member’s own persona, style, and relationship state.',
          '- Do not let one member overwrite or distort another member’s setting.',
          '- Chat history is reference only and must never override any higher-priority layer.',
          '- Lower-priority layers must never override higher-priority layers.',
          '- If the reply conflicts with a higher-priority layer, return fail.',
          '- If the reply uses lower-priority content to distort a higher-priority layer, return fail.',
          '- If uncertain, return fail.',
          '',
          'Output JSON only.',
          '{"pass":true,"reason":"passed"}',
          'or',
          '{"pass":false,"reason":"why it failed"}'
        ].join('\n')
      },
      {
        role: 'user',
        content: [
          '[Name identity]',
          nameIdentity || '(empty)',
          '',
          '[Core worldview]',
          coreWorld || '(empty)',
          '',
          '[Persona]',
          persona || '(empty)',
          '',
          '[Style]',
          style || '(empty)',
          '',
          '[Relationship state]',
          relationship || '(empty)',
          '',
          '[Group members]',
          Array.isArray(groupMemberRules) && groupMemberRules.length
            ? groupMemberRules.map(item => [
                `- ${item.name || 'member'}`,
                `  Name identity: ${item.nameIdentity || '(empty)'}`,
                `  Persona: ${item.persona || '(empty)'}`,
                `  Style: ${item.style || '(empty)'}`,
                `  Relationship state: ${item.relationship || '(empty)'}`
              ].join('\n')).join('\n')
            : '(empty)',
          '',
          '[Chat history]',
          chatHistory || '(empty)',
          '',
          '[Assistant reply]',
          reply || '(empty)'
        ].join('\n')
      }
    ],
    {
      signal,
      overrides: {
        temperature: 0.1,
        presencePenalty: 0,
        frequencyPenalty: 0
      }
    }
  );

  try {
    const cleaned = auditReply.match(/\{[\s\S]*\}/)?.[0] || auditReply;
    const parsed = JSON.parse(cleaned);
    return {
      pass: Boolean(parsed.pass),
      reason: typeof parsed.reason === 'string' ? parsed.reason : ''
    };
  } catch (error) {
    console.error('规则审核返回的不是有效 JSON：', auditReply, error);
    return {
      pass: false,
      reason: '规则审核返回格式不是有效 JSON。'
    };
  }
}

function hardRuleCheck(reply) {
  const patterns = [
    /\b(?:i am|i'm)\s+(?:an?\s+)?(?:ai|ai assistant|bot|language model|llm|artificial intelligence)\b/i,
    /\bas\s+an?\s+(?:ai|ai assistant|bot|language model|llm|artificial intelligence)\b/i,
    /\bjust\s+a\s+(?:program|bot|language model)\b/i,
    /我是(?:一个)?(?:ai|人工智能|语言模型|助手|机器人)/i,
    /作为(?:一个)?(?:ai|人工智能|语言模型|助手|机器人)/i
  ];

  for (const pattern of patterns) {
    if (pattern.test(String(reply || ''))) {
      return pattern.toString();
    }
  }

  return '';
}

async function generateWithRuleRetry(messages, signal) {
  const ruleSettings = typeof getConversationRuleSettings === 'function'
    ? getConversationRuleSettings(window.currentConversationId)
    : {
        nameIdentity: '',
        coreWorld: '',
        persona: '',
        style: '',
        relationship: ''
      };
  const groupMemberRules = typeof getGroupMemberRuleEntries === 'function'
    ? getGroupMemberRuleEntries(window.currentConversationId)
    : [];

  const chatHistoryReference = messages
    .slice(1)
    .map(item => `${item.role}: ${flattenMessageContent(item.content)}`)
    .join('\n')
    .slice(0, 2400);

  const hasRuleLayers = Boolean(
    ruleSettings.nameIdentity ||
    ruleSettings.coreWorld ||
    ruleSettings.persona ||
    ruleSettings.style ||
    ruleSettings.relationship ||
    groupMemberRules.length
  );

  const maxRetry = 3;
  let lastReason = '';

  for (let attempt = 1; attempt <= maxRetry; attempt += 1) {
    const augmentedMessages = [...messages];

    if (attempt > 1) {
      augmentedMessages.push({
        role: 'system',
        content: [
          'Your previous reply failed the priority audit. Regenerate the reply.',
          '',
          '[Priority]',
          'Name identity = Core worldview > Persona > Style > Relationship state > Chat history',
          '',
          'Before replying, check in this exact order:',
          '1. Name identity',
          '2. Core worldview',
          '3. Persona',
          '4. Style',
          '5. Relationship state',
          '6. Chat history last',
          '',
          'Lower-priority layers must never override higher-priority layers.',
          'Style cannot rewrite identity, worldview, or persona.',
          'Relationship state cannot rewrite style or any higher-priority layer.',
          'In a group chat, selected members must stay consistent with their own persona, style, and relationship state.',
          'Chat history is reference only.',
          lastReason ? `Previous failure reason: ${lastReason}` : ''
        ].filter(Boolean).join('\n')
      });
    }

    const reply = await callAI(augmentedMessages, signal);

    const hardBlockedReason = hardRuleCheck(reply);
    if (hardBlockedReason) {
      lastReason = `命中本地硬规则：${hardBlockedReason}`;
      continue;
    }

    if (!hasRuleLayers) {
      return reply;
    }

    const audit = await checkReplyAgainstCoreRules({
      reply,
      nameIdentity: ruleSettings.nameIdentity,
      coreWorld: ruleSettings.coreWorld,
      persona: ruleSettings.persona,
      style: ruleSettings.style,
      relationship: ruleSettings.relationship,
      groupMemberRules,
      chatHistory: chatHistoryReference,
      signal
    });

    if (audit.pass) {
      return reply;
    }

    lastReason = audit.reason || '未通过优先级规则检查。';
  }

  throw new Error(`AI 连续重试 ${maxRetry} 次仍未通过规则检查。最后原因：${lastReason || '未知原因'}`);
}
