const { ipcRenderer } = require("electron");

let ecgData = [];  // Хранит записи ЭКГ

// Отображает сгенерированные или загруженные данные
function displayEcgData(data) {
    const canvas = document.getElementById("ecgCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    data.forEach((point, i) => {
        const x = (canvas.width / data.length) * i;
        const y = (canvas.height / 2) - point;
        ctx.lineTo(x, y);
    });
    ctx.stroke();
}

// Генерация синтетических данных ЭКГ
function generateEcgData() {
    const data = Array.from({ length: 600 }, () => Math.sin(Math.random() * 2 * Math.PI) * 50);
    displayEcgData(data);
}

// Загрузка и отображение ранее сохраненных данных
function loadPreviousEcgData() {
    const savedDataList = document.getElementById("savedDataList");
    savedDataList.innerHTML = ecgData.map((data, index) => 
        `<button onclick="viewSavedEcg(${index})">Запись ${index + 1}</button>`).join("");
}

// Загрузка данных из JSON файла (или API)
async function loadEcgDataFromFile() {
    const response = await fetch("data/real_ecg_data.json");
    const data = await response.json();
    ecgData.push(data);
    loadPreviousEcgData();
}

// Просмотр выбранной записи ЭКГ
function viewSavedEcg(index) {
    displayEcgData(ecgData[index]);
}

// Переключение секций
function displaySection(sectionId) {
    document.querySelectorAll(".content-section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Обновление интерфейса
document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById("loadDataBtn");
    loadButton.addEventListener("click", loadEcgDataFromFile);
});
