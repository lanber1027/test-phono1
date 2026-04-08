async function callAI(userText) {
  const proxy = (localStorage.getItem('api_proxy') || '').trim().replace(/\/+$/, '');
  const apiKey = (localStorage.getItem('api_key') || '').trim();
  const model = (localStorage.getItem('api_model') || '').trim();

  if (!proxy || !apiKey || !model) {
    throw new Error('请先去 API 设置页填写 Base URL、API Key，并选择模型');
  }

  const response = await fetch(`${proxy}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: '你现在是在一个手机聊天网页里和用户自然聊天。回复自然一点，不要太像客服。'
        },
        {
          role: 'user',
          content: userText
        }
      ],
      temperature: 0.9
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API 请求失败：${response.status} ${errorText}`);
  }

  const data = await response.json();

  const text =
    data?.choices?.[0]?.message?.content ||
    data?.output?.[0]?.content?.[0]?.text ||
    '';

  if (!text) {
    throw new Error('AI 没有返回可用内容');
  }

  return text;
}
