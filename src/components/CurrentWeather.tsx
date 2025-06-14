import React from 'react';
import { WeatherData } from '@/types/weather';

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const { current, location } = weatherData;

  return (
    <div className="current-weather">
      <div className="location-info mb-4">
        <h2 className="text-2xl font-bold">{location.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {location.region}, {location.country}
        </p>
      </div>

      <div className="current-conditions bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-4xl font-bold mb-2">{current.temp_c}°C</h3>
            <p className="text-xl">{current.condition.text}</p>
          </div>
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            className="w-24 h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm opacity-80">Feels Like</p>
            <p className="text-xl font-semibold">{current.feelslike_c}°C</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm opacity-80">Humidity</p>
            <p className="text-xl font-semibold">{current.humidity}%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm opacity-80">Wind</p>
            <p className="text-xl font-semibold">{current.wind_kph} km/h</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm opacity-80">Precipitation</p>
            <p className="text-xl font-semibold">{current.precip_mm} mm</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Air Quality</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm opacity-80">CO</p>
              <p className="text-xl font-semibold">{current.air_quality.co}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm opacity-80">NO₂</p>
              <p className="text-xl font-semibold">{current.air_quality.no2}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm opacity-80">O₃</p>
              <p className="text-xl font-semibold">{current.air_quality.o3}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm opacity-80">PM2.5</p>
              <p className="text-xl font-semibold">{current.air_quality.pm2_5}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 