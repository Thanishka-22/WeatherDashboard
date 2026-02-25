import React, { useState } from "react";
import { getYearlyData } from "../api/weatherApi";

function YearlyStats() {
  const [year, setYear] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    if (!year) {
      setError("Enter a year");
      return;
    }

    try {
      setError("");
      const res = await getYearlyData(year);
      const temps = res.daily.temperature_2m_max;

      const sorted = [...temps].sort((a, b) => a - b);

      const highest = Math.max(...temps);
      const lowest = Math.min(...temps);
      const median = sorted[Math.floor(sorted.length / 2)];

      setStats({ highest, lowest, median });
    } catch {
      setError("Failed to fetch yearly status.");
    }
  };

  return (
    <div className="card">
      <h2>Yearly Temperature Status</h2>

      <input
        placeholder="Enter Year"
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={fetchStats}>Get Stats</button>

      {stats && (
        <div className="result">
          <p>Highest Temperature: {stats.highest} °C</p>
          <p>Median Temperature: {stats.median} °C</p>
          <p>Lowest Temperature: {stats.lowest} °C</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default YearlyStats;