import React, { useState } from "react";
import { getWeatherByMonth } from "../api/weatherApi";

function WeatherByMonth() {
  const [year, setYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!year || !endMonth || endMonth < 1 || endMonth > 12) {
      setError("Enter valid year & month (1–12)");
      return;
    }

    try {
      setError("");
      setResults([]);

      const allMonthsData = [];
      for (let m = 1; m <= endMonth; m++) {
        const res = await getWeatherByMonth(year, m);

        allMonthsData.push({
          month: m,
          totalDays: res.daily.time.length,
          maxTemp: Math.max(...res.daily.temperature_2m_max),
          minTemp: Math.min(...res.daily.temperature_2m_min),
        });
      }

      setResults(allMonthsData);
    } catch (err) {
      setError("Monthly fetch failed");
    }
  };

  return (
    <div className="card">
      <h2>Weather By Month</h2>

      <input
        placeholder="Year"
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        placeholder="End Month"
        onChange={(e) => setEndMonth(Number(e.target.value))}
      />

      <button onClick={fetchData}>Get Data</button>

      {results.length > 0 && (
        <div className="result">
          {results.map((item) => (
            <div key={item.month} style={{ marginBottom: "12px" }}>
              <strong>Month {item.month}</strong>
              <p>Total Days: {item.totalDays}</p>
              <p>Max Temp: {item.maxTemp} °C</p>
              <p>Min Temp: {item.minTemp} °C</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default WeatherByMonth;