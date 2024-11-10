const parseCSV = (csvData) => {
    const rows = csvData.trim().split('\n').map(row => row.split(','));
    const ecgData = rows.map(row => ({
        data: row.slice(0, -1).map(Number),  // ECG samples
        label: row.slice(-1)[0]  // Class label
    }));
    return ecgData;
};

let ecgChart;
const renderECGGraph = (initialData) => {
    const ctx = document.getElementById('ecgChart').getContext('2d');
    ecgChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: initialData.length }, (_, i) => i),
            datasets: [{
                label: 'ECG Data',
                data: initialData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: { display: false },
                y: { suggestedMin: -1, suggestedMax: 1 }
            }
        }
    });
    console.log("Initial chart rendered.");
};

const updateECGGraph = (newDataPoint) => {
    ecgChart.data.datasets[0].data.push(newDataPoint);  // Add new data point
    ecgChart.data.datasets[0].data.shift();             // Remove the first data point
    ecgChart.update('none');                            // Update chart without animation
    console.log("Chart updated with new data point:", newDataPoint);
};

document.getElementById('loadCsvButton').addEventListener('click', async () => {
    const csvData = await window.api.loadCsv();
    if (csvData) {
        const ecgData = parseCSV(csvData);
        let sample = ecgData[0].data;

        // Check if sample length is less than 188 and repeat if necessary
        if (sample.length < 188) {
            console.log("Sample length is less than 188, repeating data.");
            const repeatTimes = Math.ceil(188 / sample.length);
            sample = Array.from({ length: repeatTimes }, () => sample).flat().slice(0, 188);
        }

        // Initialize chart with sample data
        renderECGGraph(sample);

        // Set up interval to simulate real-time data update
        let index = 188;
        const interval = setInterval(() => {
            // Repeat data cyclically for continuous feed
            const newDataPoint = sample[index % sample.length];
            updateECGGraph(newDataPoint);
            index++;
        }, 8);  // Update interval in ms (8ms ≈ 125Hz)
    }
});
