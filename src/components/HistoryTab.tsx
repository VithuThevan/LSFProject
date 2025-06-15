import React from 'react';

interface Props {
  weatherData: any;
  formatTime: (timeString: string) => string;
}

const HistoryWeather: React.FC<Props> = ({ weatherData, formatTime }) => {
  if (!weatherData?.history?.forecastday?.length) return null;

  const history = weatherData.history.forecastday[0];

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
                    <p className="mb-1"><strong>Max Temp:</strong> {history.day.maxtemp_c}°C</p>
                    <p className="mb-1"><strong>Min Temp:</strong> {history.day.mintemp_c}°C</p>
                    <p className="mb-1"><strong>Avg Temp:</strong> {history.day.avgtemp_c}°C</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-1"><strong>Max Wind:</strong> {history.day.maxwind_kph} km/h</p>
                    <p className="mb-1"><strong>Precipitation:</strong> {history.day.totalprecip_mm} mm</p>
                    <p className="mb-1"><strong>Humidity:</strong> {history.day.avghumidity}%</p>
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
                      {history.hour.map((hour: any, index: number) => (
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

export default HistoryWeather;