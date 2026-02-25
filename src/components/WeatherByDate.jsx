import React, { useState } from "react";
import { getWeatherByDate } from "../api/weatherApi";

function WeatherByDate() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!year || !month || !endDate) {
      setError("Enter year, month & end date");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResults([]);

      const allData = [];
      for (let d = 1; d <= endDate; d++) {
        const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const res = await getWeatherByDate(formattedDate);
        allData.push({
          date: formattedDate,
          max: res.daily.temperature_2m_max[0],
          min: res.daily.temperature_2m_min[0],
          humidity: res.daily.relative_humidity_2m_mean[0],
          pressure: res.daily.pressure_msl_mean[0],
        });
      }

      setResults(allData);
    } catch {
      setError("API limit exceeded. Try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Weather By Date</h2>

      <input placeholder="Year" onChange={(e) => setYear(e.target.value)} />
      <input placeholder="Month" onChange={(e) => setMonth(e.target.value)} />
      <input placeholder="End Date" onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
      {results.length > 0 && (
        <div className="result">
          {results.map((item) => (
            <div key={item.date} style={{ marginBottom: "12px" }}>
              <strong>{item.date}</strong>
              <p>Max: {item.max} °C</p>
              <p>Min: {item.min} °C</p>
              <p>Humidity: {item.humidity} %</p>
              <p>Pressure: {item.pressure} hPa</p>
              <hr />
            </div>
          ))}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default WeatherByDate;