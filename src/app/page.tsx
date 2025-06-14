/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { getWeatherData, WeatherData } from '@/services/weather';
import { cn } from '@/utils/cn'; // Optional: a helper for merging Tailwind classes

const weatherBackgrounds: Record<string, string> = {
  sunny: 'bg-gradient-to-br from-yellow-100 to-yellow-300',
  cloudy: 'bg-gradient-to-br from-gray-300 to-gray-500',
  rain: 'bg-gradient-to-br from-blue-300 to-blue-500',
  default: 'bg-gradient-to-b from-blue-100 to-blue-300',
};

function classifyWeather(condition: string): keyof typeof weatherBackgrounds {
  const lower = condition.toLowerCase();
  if (lower.includes('sunny')) return 'sunny';
  if (lower.includes('cloud') || lower.includes('overcast')) return 'cloudy';
  if (lower.includes('rain') || lower.includes('shower')) return 'rain';
  return 'default';
}

export default function Home() {
  const [city, setCity] = useState('Colombo');
  const [inputCity, setInputCity] = useState('Colombo');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName = 'Colombo') => {
    try {
      setLoading(true);
      const data = await getWeatherData(cityName);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    const intervalId = setInterval(() => fetchWeather(city), 60000);
    return () => clearInterval(intervalId);
  }, [city]);

  const backgroundClass = weather ? weatherBackgrounds[classifyWeather(weather.condition)] : weatherBackgrounds.default;

  return (
    <div className={cn("min-h-screen transition-all px-4 py-6 sm:px-6 md:px-8 lg:px-12", backgroundClass)}>
      <main className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 transition-all">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            🌤 Weather Reporter
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="px-4 py-2 rounded-xl border dark:border-gray-700 outline-none focus:ring-2 ring-blue-400 transition"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Enter city"
            />
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
              onClick={() => setCity(inputCity.trim())}
            >
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Fetching weather...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 p-5 rounded-xl text-center">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {weather && !loading && !error && (
          <div className="flex flex-col items-center gap-8 mt-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center gap-4">
                <img src={`https:${weather.icon}`} alt={weather.condition} className="w-20 h-20" />
                <p className="text-4xl font-semibold text-gray-900 dark:text-white">{weather.temperature}°C</p>
                <p className="text-lg text-gray-600 dark:text-gray-300">Temperature</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center gap-4">
                <p className="text-4xl font-semibold text-gray-900 dark:text-white">{weather.condition}</p>
                <p className="text-lg text-gray-600 dark:text-gray-300">Condition</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
              <WeatherCard title="Humidity" value={`${weather.humidity}%`} icon="💧" />
              <WeatherCard title="Wind Speed" value={`${weather.windSpeed} km/h`} icon="💨" />
              <WeatherCard title="UV Index" value={`${weather.uvIndex}`} icon="🔆" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function WeatherCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center flex flex-col items-center justify-center hover:scale-[1.02] transition-transform duration-150">
      <span className="text-3xl">{icon}</span>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
