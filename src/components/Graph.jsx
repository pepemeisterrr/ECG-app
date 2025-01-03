import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function Graph() {
  const [ecgData, setEcgData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("/src/assets/mitbih_test.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            const allData = result.data.map((row) =>
              row.slice(0, row.length - 1).map(Number)
            );
            setEcgData(allData.flat());
          },
          skipEmptyLines: true,
        });
      })
      .catch((error) => console.error("Error loading CSV file:", error));
  }, []);

  useEffect(() => {
    if (ecgData.length) {
      let index = 0;
      intervalRef.current = setInterval(() => {
        setCurrentData((prev) => {
          const nextIndex = Math.min(index + 1, ecgData.length);
          const newData = [...prev, ...ecgData.slice(index, nextIndex)];
          index = nextIndex;
          return newData.slice(-375);
        });
      }, 8);
    }

    return () => clearInterval(intervalRef.current);
  }, [ecgData]);

  const chartData = {
    labels: Array.from({ length: currentData.length }, (_, i) => i),
    datasets: [
      {
        label: "ECG Signal",
        data: currentData,
        borderColor: "rgba(220, 20, 60, 1)",
        backgroundColor: "rgba(193, 0, 32, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    animation: { duration: 0 },
    scales: {
      x: { display: false },
      y: {
        min: 0,
        max: 1.2,
        title: { display: true, text: "ECG Amplitude" },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="py-4 px-6 my-2">
      <h2 className="font-semibold text-xl mb-4">Real-Time ECG Monitoring</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default Graph;
