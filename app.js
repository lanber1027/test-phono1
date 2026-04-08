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

function normalizeBaseUrl(url) {
  return (url || '').trim().replace(/\/+$/, '');
}

function loadApiSettings() {
  const proxyEl = document.getElementById('api-proxy');
  const keyEl = document.getElementById('api-key');
  const modelEl = document.getElementById('api-model');
  const modelSelectEl = document.getElementById('api-model-select');

  const savedProxy = localStorage.getItem('api_proxy') || '';
  const savedKey = localStorage.getItem('api_key') || '';
  const savedModel = localStorage.getItem('api_model') || '';

  if (proxyEl) proxyEl.value = savedProxy;
  if (keyEl) keyEl.value = savedKey;
  if (modelEl) modelEl.value = savedModel;

  if (modelSelectEl && savedModel) {
    modelSelectEl.innerHTML = `
      <option value="">请先拉取模型</option>
      <option value="${savedModel}" selected>${savedModel}</option>
    `;
  }
}

async function fetchModels() {
  const proxyEl = document.getElementById('api-proxy');
  const keyEl = document.getElementById('api-key');
  const modelSelectEl = document.getElementById('api-model-select');
  const modelInputEl = document.getElementById('api-model');

  const baseUrl = normalizeBaseUrl(proxyEl?.value);
  const apiKey = (keyEl?.value || '').trim();

  if (!baseUrl) {
    alert('请先填写 Base URL');
    return;
  }

  modelSelectEl.innerHTML = `<option value="">拉取中...</option>`;

  try {
    const headers = {};
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${baseUrl}/v1/models`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`拉取失败：${response.status} ${errorText}`);
    }

    const data = await response.json();
    const models = Array.isArray(data?.data) ? data.data : [];

    modelSelectEl.innerHTML = `<option value="">请选择模型</option>`;

    if (!models.length) {
      modelSelectEl.innerHTML = `<option value="">没有返回模型</option>`;
      alert('接口请求成功，但没有返回可用模型。你可以手动填写模型名。');
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

    modelSelectEl.onchange = function () {
      if (this.value && modelInputEl) {
        modelInputEl.value = this.value;
      }
    };

    alert(`成功拉取 ${models.length} 个模型，请手动选择`);
  } catch (err) {
    modelSelectEl.innerHTML = `<option value="">拉取失败</option>`;
    alert(err.message);
  }
}

function saveApiSettings() {
  const proxy = normalizeBaseUrl(document.getElementById('api-proxy').value);
  const key = document.getElementById('api-key').value.trim();
  const modelInput = document.getElementById('api-model').value.trim();
  const modelSelect = document.getElementById('api-model-select').value;

  const finalModel = modelInput || modelSelect;

  localStorage.setItem('api_proxy', proxy);
  localStorage.setItem('api_key', key);
  localStorage.setItem('api_model', finalModel);

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

  const fetchBtn = document.getElementById('fetch-models-btn');
  if (fetchBtn) {
    fetchBtn.addEventListener('click', fetchModels);
  }
});
