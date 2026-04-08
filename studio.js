function appendStudioMessage(role, text) {
  const messages = document.getElementById('studio-messages');

  const message = document.createElement('div');
  message.className = `studio-message ${role}`;
  message.innerHTML = `<div class="bubble">${text}</div>`;

  messages.appendChild(message);

  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 50);
}

// 本地规则生成器
function buildStudioReplies(input) {
  const text = input.trim();

  let atmosphere = "克制、安静，带一点压抑的余温";
  let relationship = "两个人之间明显还有没处理完的情绪";
  let placeDetail = "灯光有些冷，周围很安静";
  let actionDetail = "谁都没有立刻靠近，只是先看了对方一眼";
  let ending = "气氛没有结束，反而更沉了一点";

  if (text.includes("便利店")) {
    placeDetail = "便利店的白光让一切显得过于清晰";
  }

  if (text.includes("深夜")) {
    atmosphere = "深夜让所有情绪都被放大";
  }

  if (text.includes("重逢")) {
    relationship = "这是一个不太轻松的重逢";
    actionDetail = "两个人都停了一下，不确定怎么开口";
  }

  if (text.includes("没放下")) {
    ending = "谁都没说出口，但其实都知道还没放下";
  }

  return [
    `【场景】<br>${text}`,
    `【氛围】<br>${atmosphere}`,
    `【环境】<br>${placeDetail}`,
    `【人物】<br>${relationship}。${actionDetail}`,
    `【对白】<br>
A：好久不见。<br>
B：……嗯。<br><br>
A：你还会来这里。<br>
B：习惯吧。`,
    `【收束】<br>${ending}`
  ];
}

// 主函数
function generateStudio() {
  const inputEl = document.getElementById('studio-input');
  const input = inputEl.value.trim();

  if (!input) return;

  appendStudioMessage('user', input);

  const replies = buildStudioReplies(input);
  let index = 0;

  function sendNext() {
    if (index < replies.length) {
      appendStudioMessage('ai', replies[index]);
      index++;
      setTimeout(sendNext, 500);
    }
  }

  setTimeout(sendNext, 300);

  inputEl.value = '';
}

// 回车发送
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('studio-input');

  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateStudio();
    }
  });
});