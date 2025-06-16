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

        {/* Daily Summary Row */}
        <div className="row g-3 mb-4">
          <div className="col-sm-6 col-md-4">
            <div className="card bg-light h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Temperature</h6>
                <p className="mb-1"><strong>Max:</strong> {history.day.maxtemp_c}°C</p>
                <p className="mb-1"><strong>Min:</strong> {history.day.mintemp_c}°C</p>
                <p className="mb-0"><strong>Avg:</strong> {history.day.avgtemp_c}°C</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card bg-light h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Wind & Rain</h6>
                <p className="mb-1"><strong>Max Wind:</strong> {history.day.maxwind_kph} km/h</p>
                <p className="mb-0"><strong>Precipitation:</strong> {history.day.totalprecip_mm} mm</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card bg-light h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-2">Humidity</h6>
                <p className="mb-0"><strong>Avg Humidity:</strong> {history.day.avghumidity}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Data Section */}
        <h6 className="card-subtitle my-3">Hourly Data</h6>
        <div className="d-flex flex-row overflow-auto gap-3 mt-3 pb-3">
          {history.hour.map((hour: any, index: number) => (
            <div
              key={index}
              className="card flex-shrink-0 border border-primary"
              style={{
                minWidth: '160px',
                transition: 'box-shadow 0.2s ease',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.1)'}
            >
              <div className="card-body p-2 text-center">
                <p className="mb-1 fw-bold">{formatTime(hour.time)}</p>
                <p className="mb-1">🌡 {hour.temp_c}°C</p>
                <p className="mb-1">💨 {hour.wind_kph} km/h</p>
                <p className="mb-0">🌧 {hour.precip_mm} mm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryWeather;
