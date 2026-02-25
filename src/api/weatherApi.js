import axios from "axios";
const BASE_URL = "https://archive-api.open-meteo.com/v1/archive";
const paramsBase = {
  latitude: 28.6139,
  longitude: 77.2090,
  daily: [
    "temperature_2m_max",
    "temperature_2m_min",
    "relative_humidity_2m_mean",
    "pressure_msl_mean",
    "weathercode"
  ].join(","),
  timezone: "Asia/Kolkata",
};
export const getWeatherByDate = async (date) => {
  const res = await axios.get(BASE_URL, {
    params: {
      ...paramsBase,
      start_date: date,
      end_date: date,
    },
  });
  return res.data;
};
export const getWeatherByMonth = async (year, month) => {
  const m = String(month).padStart(2, "0");
  const start = `${year}-${m}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${m}-${lastDay}`;
  const res = await axios.get(BASE_URL, {
    params: {
      ...paramsBase,
      start_date: start,
      end_date: end,
    },
  });
  return res.data;
};
export const getYearlyData = async (year) => {
  const res = await axios.get(BASE_URL, {
    params: {
      ...paramsBase,
      start_date: `${year}-01-01`,
      end_date: `${year}-12-31`,
    },
  });

  return res.data;
};