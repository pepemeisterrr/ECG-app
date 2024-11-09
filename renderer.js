// renderer.js

const parseCSV = (csvData) => {
  const rows = csvData.trim().split('\n').map(row => row.split(','));
  const ecgData = rows.map(row => ({
      data: row.slice(0, -1).map(Number),  // ECG samples
      label: row.slice(-1)[0]  // Class label
  }));
  return ecgData;
};

const renderECGGraph = (data) => {
  const ctx = document.getElementById('ecgChart').getContext('2d');
  const ecgChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: data.map((_, index) => index),  // Time points
          datasets: [{
              label: 'ECG Data',
              data: data,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options: {
          responsive: true,
          scales: {
              x: { display: false },
              y: { suggestedMin: -1, suggestedMax: 1 }
          }
      }
  });
};

document.getElementById('loadCsvButton').addEventListener('click', async () => {
  const csvData = await window.api.loadCsv();
  if (csvData) {
      const ecgData = parseCSV(csvData);
      const sample = ecgData[0].data;  // Display the first sample for simplicity
      renderECGGraph(sample);
  }
});
