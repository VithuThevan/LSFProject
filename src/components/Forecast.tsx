import React, { useState } from 'react';
import { WeatherData } from '@/types/weather';

interface ForecastProps {
  weatherData: WeatherData;
}

const Forecast: React.FC<ForecastProps> = ({ weatherData }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <div className="forecast-section">
      <h4 className="mb-3">7-Day Forecast</h4>
      <div className="row g-3">
        {weatherData.forecast.forecastday.map((day: any, index: number) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h6 className="card-title">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </h6>
                {day.day.condition?.icon && (
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="weather-icon mb-2"
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
                <p className="card-text">
                  <span className="text-primary">{Math.round(day.day.maxtemp_c)}°</span>
                  {' / '}
                  <span>{Math.round(day.day.mintemp_c)}°</span>
                </p>
                <button
                  className="btn btn-sm btn-outline-primary mt-2"
                  onClick={() => setSelectedDay(index)}
                >
                  View Hourly
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDay !== null && weatherData.forecast.forecastday[selectedDay] && (
        <div className="hourly-forecast mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Hourly Forecast for {new Date(weatherData.forecast.forecastday[selectedDay].date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h4>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSelectedDay(null)}
            >
              Close
            </button>
          </div>
          <div className="row g-3">
            {weatherData.forecast.forecastday[selectedDay].hour.map((hour: any, index: number) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <h6 className="card-title">
                      {new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                    </h6>
                    {hour.condition?.icon && (
                      <img
                        src={hour.condition.icon}
                        alt={hour.condition.text}
                        className="weather-icon mb-2"
                        style={{ width: '40px', height: '40px' }}
                      />
                    )}
                    <p className="card-text mb-1">
                      {Math.round(hour.temp_c)}°C
                    </p>
                    <p className="card-text small mb-0">
                      {hour.condition?.text}
                    </p>
                    <div className="mt-2">
                      <small>
                        Wind: {Math.round(hour.wind_kph)} km/h
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast; 