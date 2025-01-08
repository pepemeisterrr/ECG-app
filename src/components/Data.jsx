import React, { useState, useEffect } from 'react';

function App() {
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [anomalies, setAnomalies] = useState(null);


      const analyzeEcgData = async () => {
        setLoading(true);
        try {
           const response = await fetch('http://localhost:5000/analyze_ecg', {
                method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ filename: './components/mitbih_test.csv' }), // Замените на имя своего файла
               });
              if (!response.ok) {
                  const errorData = await response.json();
                  setMessage(errorData.error || `Ошибка при анализе: ${response.status}`);
                 setLoading(false);
                 setResult(null);
                 setAnomalies(null)
                 return;
             }

             const data = await response.json();
            setResult(data.result);
            setAnomalies(data.anomalies);
              setMessage('');
             setLoading(false);
         } catch (error) {
            console.error('Вы здоровы!', error);
            setMessage('Вы здоровы!');
             setResult(null);
             setAnomalies(null)
            setLoading(false);
         }
    };

       useEffect(() => {
        analyzeEcgData();
    }, []); // Вызываем анализ при загрузке компонента

  const getAnomalyStatus = (isAnomaly, index) => {
        if(anomalies === null) return null;
        return isAnomaly ?
          <span style={{color: "red", fontWeight:"bold"}}>({index + 1})</span> : null;
  }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
             <div className="bg-white p-8 rounded shadow-md w-1/2">
                 <h2 className="text-2xl font-semibold mb-4 text-center">Результат анализа ЭКГ</h2>
                  {message && <p className="mb-4 text-red-500">{message}</p>}
                    {loading ? (
                    <p>Загрузка...</p>
                   ) : result ? (
                         <div>
                             <p className="text-lg mb-4"><strong>Результат:</strong> {result}</p>
                                 <p>Значение аномальных точек
                                   {
                                      anomalies &&
                                        anomalies.map((value, index) => getAnomalyStatus(value, index))
                                   }
                                </p>
                           </div>
                         ) : null }
              </div>
        </div>
    );
}

function AppWrapper() {
    return <App />;
}

export default AppWrapper;