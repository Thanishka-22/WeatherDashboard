import WeatherByDate from "../components/WeatherByDate";
import WeatherByMonth from "../components/WeatherByMonth";
import YearlyStats from "../components/YearlyStats";

function Dashboard() {
  return (
    <div className="container">
      <h1>Delhi Weather Dashboard</h1>
      <WeatherByDate />
      <WeatherByMonth />
      <YearlyStats />
    </div>
  );
}

export default Dashboard;