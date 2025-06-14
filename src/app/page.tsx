/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { getWeatherData, WeatherData } from '@/services/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      const data = await getWeatherData();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchWeather();

    // Set up auto-refresh every 1 minute (60000 ms)
    const intervalId = setInterval(fetchWeather, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-3 py-4 sm:px-6 sm:py-8 md:px-8 lg:px-12">
      <main className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Weather in Colombo
          </h1>
        </div>

        {loading && (
          <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-6 sm:py-8">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-base font-medium">{error}</p>
            </div>
          </div>
        )}

        {weather && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Main Weather Info */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 sm:p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                  <img
                    src={`https:${weather.icon}`}
                    alt={weather.condition}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
                    {weather.temperature}°C
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
                    {weather.condition}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Humidity</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                      {weather.humidity}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Wind Speed</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                      {weather.windSpeed} km/h
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">UV Index</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                      {weather.uvIndex}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Condition</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                      {weather.condition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
