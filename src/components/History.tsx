import React from 'react';
import { WeatherData } from '@/types/weather';

interface HistoryProps {
  weatherData: WeatherData;
}

const History: React.FC<HistoryProps> = ({ weatherData }) => {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title mb-4">Yesterday's Weather</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body">
                <h6 className="card-subtitle mb-3">Daily Summary</h6>
                <div className="row g-3">
                  <div className="col-6">
                    <p className="mb-1">
                      <strong>Max Temp:</strong> {weatherData.history.forecastday[0].day.maxtemp_c}°C
                    </p>
                    <p className="mb-1">
                      <strong>Min Temp:</strong> {weatherData.history.forecastday[0].day.mintemp_c}°C
                    </p>
                    <p className="mb-1">
                      <strong>Avg Temp:</strong> {weatherData.history.forecastday[0].day.avgtemp_c}°C
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="mb-1">
                      <strong>Max Wind:</strong> {weatherData.history.forecastday[0].day.maxwind_kph} km/h
                    </p>
                    <p className="mb-1">
                      <strong>Precipitation:</strong> {weatherData.history.forecastday[0].day.totalprecip_mm} mm
                    </p>
                    <p className="mb-1">
                      <strong>Humidity:</strong> {weatherData.history.forecastday[0].day.avghumidity}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body">
                <h6 className="card-subtitle mb-3">Hourly Data</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Temp</th>
                        <th>Wind</th>
                        <th>Precip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weatherData.history.forecastday[0].hour.map((hour, index) => (
                        <tr key={index}>
                          <td>{formatTime(hour.time)}</td>
                          <td>{hour.temp_c}°C</td>
                          <td>{hour.wind_kph} km/h</td>
                          <td>{hour.precip_mm} mm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History; 