function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }
}

function updateTime() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const date = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const statusBar = document.querySelector('#status-bar span:first-child');
  const homeTime = document.querySelector('#clock-container .time');
  const homeDate = document.querySelector('#clock-container .date');

  if (statusBar) statusBar.textContent = time;
  if (homeTime) homeTime.textContent = time;
  if (homeDate) homeDate.textContent = date;
}

function loadApiSettings() {
  const proxyEl = document.getElementById('api-proxy');
  const keyEl = document.getElementById('api-key');
  const modelEl = document.getElementById('api-model');

  if (proxyEl) proxyEl.value = localStorage.getItem('api_proxy') || '';
  if (keyEl) keyEl.value = localStorage.getItem('api_key') || '';
  if (modelEl) modelEl.value = localStorage.getItem('api_model') || '';
}

function saveApiSettings() {
  localStorage.setItem('api_proxy', document.getElementById('api-proxy').value.trim());
  localStorage.setItem('api_key', document.getElementById('api-key').value.trim());
  localStorage.setItem('api_model', document.getElementById('api-model').value.trim());
  alert('API 设置已保存');
}

document.addEventListener('DOMContentLoaded', () => {
  updateTime();
  setInterval(updateTime, 30000);

  loadApiSettings();

  const saveBtn = document.getElementById('save-api-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveApiSettings);
  }
});
