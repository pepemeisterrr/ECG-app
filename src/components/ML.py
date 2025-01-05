from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import json
import os

filename = "./components/mitbih_test.csv"
app = Flask(__name__)
CORS(app)


def detect_anomalies(data, threshold=3):
    """Обнаруживает аномалии в данных ЭКГ на основе Z-оценки."""
    data = np.array(data, dtype=float)
    mean = np.mean(data)
    std = np.std(data)

    if std == 0:
      return [False] * len(data)  # Если std = 0 возвращаем массив False

    z_scores = np.abs((data - mean) / std)  # Вычисляем Z-оценки
    anomalies = z_scores > threshold  # Отмечаем аномалии
    return anomalies.tolist()

def analyze_file(filename):
    """Читает данные из файла, анализирует ЭКГ, возвращает результат."""
    try:
      filepath = os.path.join(os.path.dirname(__file__), filename)
      if not os.path.exists(filepath):
        return {"error": "Файл не найден"}, 404

      with open(filepath, 'r') as f:
            data_str = f.read().strip()
            if not data_str:
                return {"error": "Файл пуст"}, 400

            data = [item.strip() for item in data_str.split(',') if item.strip()] # Чистим данные
            if not data:
                  return {"error": "Нет данных в файле"}, 400
            anomalies = detect_anomalies(data)
            if any(anomalies): # Проверяем, есть ли аномалии
                return {"result": "Есть отклонения", "anomalies": anomalies}, 200
            else:
                return {"result": "Здоров", "anomalies": anomalies}, 200

    except Exception as e:
        print(e)
        return {"error": f"Ошибка при анализе ЭКГ: {e}"}, 500


@app.route('/analyze_ecg', methods=['POST'])
def analyze_ecg():
    """Эндпоинт для анализа ЭКГ."""
    try:
      data = request.get_json()
      if not data or 'filename' not in data:
          return jsonify({'error': 'Необходимо передать имя файла'}), 400

      filename = data['filename']
      result, status_code = analyze_file(filename)
      return jsonify(result), status_code
    except Exception as e:
        print(e)
        return jsonify({'error': f'Ошибка сервера при обработке запроса: {e}'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)