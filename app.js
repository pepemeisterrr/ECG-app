function showTab(tabId) {
  document.getElementById('realtime').style.display = tabId === 'realtime' ? 'block' : 'none';
  document.getElementById('history').style.display = tabId === 'history' ? 'block' : 'none';
}

// Инициализация графика ЭКГ
const canvas = document.getElementById('ecg-canvas');
const ctx = canvas.getContext('2d');

function drawStaticECG() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i += 5) {
    ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.05) * 20);
  }
  ctx.strokeStyle = '#00f';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

drawStaticECG();
