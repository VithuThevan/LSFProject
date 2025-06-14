'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '@/context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherData {
  current: {
    condition: string;
    humidity: number;
    icon: string;
    temperature: number;
    uvIndex: number;
    windSpeed: number;
    feelsLike: number;
    pressure: number;
    visibility: number;
    airQuality: {
      'us-epa-index': number;
      'gb-defra-index': number;
    };
    lastUpdated: string;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    humidity: number;
    chanceOfRain: number;
    chanceOfSnow: number;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moonPhase: string;
    hourly: Array<{
      time: string;
      temp: number;
      condition: string;
      icon: string;
      chanceOfRain: number;
      chanceOfSnow: number;
    }>;
  }>;
  alerts: Array<{
    headline: string;
    msgtype: string;
    severity: string;
    urgency: string;
    areas: string;
    category: string;
    certainty: string;
    event: string;
    note: string;
    effective: string;
    expires: string;
    desc: string;
    instruction: string;
  }>;
}

interface LocationData {
  city: string;
  state: string;
  country: string;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [locationData, setLocationData] = useState<LocationData>({
    city: '',
    state: '',
    country: ''
  });
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [timeUntilUpdate, setTimeUntilUpdate] = useState<number>(30);

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle location detection after mount
  useEffect(() => {
    if (!mounted) return;

    const getLocation = async () => {
      setLocationLoading(true);
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser. Please enter a city manually.');
        setLocationLoading(false);
        setCity('London');
        setLocationData({
          city: 'London',
          state: 'England',
          country: 'United Kingdom'
        });
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `/api/geocode?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();

        if (data.locality) {
          setCity(data.locality);
          setLocationData({
            city: data.locality,
            state: data.principalSubdivision || '',
            country: data.countryName || ''
          });
        } else {
          // Fallback to London if no city is found
          setCity('');
          setLocationData({
            city: '',
            state: '',
            country: ''
          });
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setLocationError('Unable to get your location. Please enter a city manually.');
        // Fallback to London on error
        setCity('London');
        setLocationData({
          city: '',
          state: '',
          country: ''
        });
      } finally {
        setLocationLoading(false);
      }
    };

    getLocation();
  }, [mounted]);

  // Fetch weather data
  const fetchWeatherData = useCallback(async (cityName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/weather?city=${cityName}`);
      const data = await response.json();
      setWeatherData(data);
      setLastUpdateTime(new Date());
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  // Auto-refresh timer
  useEffect(() => {
    if (!mounted || !city) return;

    // Initial fetch
    fetchWeatherData(city);

    // Set up auto-refresh
    const refreshInterval = setInterval(() => {
      fetchWeatherData(city);
    }, 30000); // 30 seconds

    // Cleanup interval on unmount or city change
    return () => clearInterval(refreshInterval);
  }, [mounted, city, fetchWeatherData]);

  // Countdown timer
  useEffect(() => {
    if (!lastUpdateTime) return;

    const countdownInterval = setInterval(() => {
      const now = new Date();
      const timeDiff = Math.floor((now.getTime() - lastUpdateTime.getTime()) / 1000);
      const remainingTime = Math.max(0, 30 - timeDiff);
      setTimeUntilUpdate(remainingTime);

      if (remainingTime === 0) {
        setTimeUntilUpdate(30);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [lastUpdateTime]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('city') as HTMLInputElement;

    if (!input.value.trim()) {
      setFormError('Please enter a city name');
      return;
    }

    setFormError('');
    setCity(input.value);
    setLocationData({
      city: input.value,
      state: '',
      country: ''
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!mounted) {
    return null;
  }

  const isLoading = loading || locationLoading || initialLoad;

  return (
    <main className="container py-5" data-theme={theme}>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h1 className="display-4 mb-0">Weather Forecast</h1>
            <div className="d-flex align-items-center gap-3">
              {lastUpdateTime && !isLoading && (
                <div className="text-muted small">
                  Next update in {timeUntilUpdate}s
                </div>
              )}
              <button
                onClick={toggleTheme}
                className="btn btn-outline-secondary rounded-circle p-2"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                style={{ width: '40px', height: '40px' }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>

          {locationError && !isLoading && (
            <div className="alert alert-warning mb-4" role="alert">
              {locationError}
            </div>
          )}

          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                name="city"
                className={`form-control ${formError ? 'is-invalid' : ''}`}
                placeholder="Enter city name"
                onChange={() => setFormError('')}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  'Search'
                )}
              </button>
            </div>
            {formError && (
              <div className="invalid-feedback d-block text-danger mt-2">
                {formError}
              </div>
            )}
          </form>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">
                {locationLoading ? 'Detecting your location...' : 'Loading weather data...'}
              </p>
            </div>
          ) : weatherData ? (
            <>
              {weatherData.alerts && weatherData.alerts.length > 0 && (
                <div className="alert alert-danger mb-4" role="alert">
                  <h5 className="alert-heading">Weather Alerts</h5>
                  {weatherData.alerts.map((alert, index) => (
                    <div key={index} className="mb-2">
                      <strong>{alert.headline}</strong>
                      <p className="mb-1">{alert.desc}</p>
                      <small>Effective: {formatTime(alert.effective)} - {formatTime(alert.expires)}</small>
                    </div>
                  ))}
                </div>
              )}

              <div className="card weather-card mb-4">
                <div className="card-body">
                  <div className="location-info mb-4">
                    <h2 className="card-title mb-1">{locationData.city}</h2>
                    {(locationData.state || locationData.country) && (
                      <p className="text-muted mb-0">
                        {[locationData.state, locationData.country]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                    {weatherData.current?.lastUpdated && (
                      <small className="text-muted">
                        Last updated: {formatTime(weatherData.current.lastUpdated)}
                      </small>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-center">
                        {weatherData.current?.icon && (
                          <img
                            src={`https:${weatherData.current.icon}`}
                            alt={weatherData.current.condition || 'Weather condition'}
                            className="img-fluid mb-3"
                            style={{ width: '100px' }}
                          />
                        )}
                        {weatherData.current?.condition && (
                          <h3>{weatherData.current.condition}</h3>
                        )}
                        {weatherData.current?.temperature !== undefined && (
                          <h1 className="display-4 mb-3">{weatherData.current.temperature}°C</h1>
                        )}
                        {weatherData.current?.feelsLike !== undefined && (
                          <p className="text-muted">Feels like {weatherData.current.feelsLike}°C</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        {weatherData.current?.humidity !== undefined && (
                          <div className="col-6 mb-3">
                            <div className="card h-100">
                              <div className="card-body">
                                <h5>Humidity</h5>
                                <p className="mb-0">{weatherData.current.humidity}%</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {weatherData.current?.uvIndex !== undefined && (
                          <div className="col-6 mb-3">
                            <div className="card h-100">
                              <div className="card-body">
                                <h5>UV Index</h5>
                                <p className="mb-0">{weatherData.current.uvIndex}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {weatherData.current?.windSpeed !== undefined && (
                          <div className="col-6 mb-3">
                            <div className="card h-100">
                              <div className="card-body">
                                <h5>Wind Speed</h5>
                                <p className="mb-0">{weatherData.current.windSpeed} km/h</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {weatherData.current?.pressure !== undefined && (
                          <div className="col-6 mb-3">
                            <div className="card h-100">
                              <div className="card-body">
                                <h5>Pressure</h5>
                                <p className="mb-0">{weatherData.current.pressure} mb</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {weatherData.current?.visibility !== undefined && (
                          <div className="col-6">
                            <div className="card h-100">
                              <div className="card-body">
                                <h5>Visibility</h5>
                                <p className="mb-0">{weatherData.current.visibility} km</p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="col-6">
                          <div className="card h-100">
                            <div className="card-body">
                              <h5>Air Quality</h5>
                              <p className="mb-0">
                                {weatherData.current?.airQuality ?
                                  `US EPA: ${weatherData.current.airQuality['us-epa-index']}` :
                                  'Not available'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {weatherData.forecast && weatherData.forecast.length > 0 && (
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title mb-4">7-Day Forecast</h3>
                    <div className="row">
                      {weatherData.forecast.map((day, index) => (
                        <div
                          key={index}
                          className={`col-md-3 col-sm-6 mb-3 ${selectedDay === index ? 'selected' : ''}`}
                          onClick={() => setSelectedDay(index)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="card h-100">
                            <div className="card-body text-center">
                              <h5>{formatDate(day.date)}</h5>
                              <img
                                src={`https:${day.icon}`}
                                alt={day.condition}
                                className="img-fluid mb-2"
                                style={{ width: '50px' }}
                              />
                              <p className="mb-1">{day.condition}</p>
                              <div className="d-flex justify-content-center gap-2">
                                <span className="text-primary">{day.maxTemp}°</span>
                                <span className="text-muted">{day.minTemp}°</span>
                              </div>
                              <div className="mt-2">
                                <small className="text-muted">
                                  Rain: {day.chanceOfRain}% | Snow: {day.chanceOfSnow}%
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {weatherData.forecast && weatherData.forecast[selectedDay] && (
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title mb-4">
                      Hourly Forecast for {formatDate(weatherData.forecast[selectedDay].date)}
                    </h3>
                    <div className="row">
                      {weatherData.forecast[selectedDay].hourly.map((hour, index) => (
                        <div key={index} className="col-md-2 col-sm-4 col-6 mb-3">
                          <div className="card h-100">
                            <div className="card-body text-center">
                              <h6>{formatTime(hour.time)}</h6>
                              <img
                                src={`https:${hour.icon}`}
                                alt={hour.condition}
                                className="img-fluid mb-2"
                                style={{ width: '40px' }}
                              />
                              <p className="mb-1">{hour.temp}°</p>
                              <small className="text-muted">
                                Rain: {hour.chanceOfRain}%
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {lastUpdateTime && (
                <div className="text-center text-muted small mt-3">
                  Last updated: {formatTime(lastUpdateTime.toISOString())}
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
