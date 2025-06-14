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
import LastUpdated from '@/components/LastUpdated';

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
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    last_updated: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
    gust_kph: number;
    air_quality: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      'us-epa-index': number;
      'gb-defra-index': number;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
        daily_chance_of_rain: number;
        daily_chance_of_snow: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        windchill_c: number;
        heatindex_c: number;
        dewpoint_c: number;
        will_it_rain: number;
        chance_of_rain: number;
        will_it_snow: number;
        chance_of_snow: number;
        vis_km: number;
        gust_kph: number;
        uv: number;
      }>;
    }>;
  };
  astronomy: {
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: string;
    };
  };
  alerts: {
    alert: Array<{
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
  };
  sports: {
    football: Array<{
      match: string;
      league: string;
      start: string;
      end: string;
      stadium: string;
      country: string;
      competition: string;
      competition_id: number;
      season: string;
      season_id: number;
      status: string;
      status_id: number;
      home_team: string;
      home_team_id: number;
      away_team: string;
      away_team_id: number;
      home_score: number;
      away_score: number;
      minute: number;
      weather: {
        temp_c: number;
        wind_kph: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        vis_km: number;
        uv: number;
        gust_kph: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
    cricket: Array<{
      match: string;
      league: string;
      start: string;
      end: string;
      stadium: string;
      country: string;
      competition: string;
      competition_id: number;
      season: string;
      season_id: number;
      status: string;
      status_id: number;
      home_team: string;
      home_team_id: number;
      away_team: string;
      away_team_id: number;
      home_score: number;
      away_score: number;
      minute: number;
      weather: {
        temp_c: number;
        wind_kph: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        vis_km: number;
        uv: number;
        gust_kph: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
  timezone: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  marine: {
    forecast: Array<{
      date: string;
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        vis_km: number;
        uv: number;
        gust_kph: number;
        swell_height_m: number;
        swell_dir: string;
        swell_period_secs: number;
        water_temp_c: number;
      }>;
    }>;
  };
  history: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        vis_km: number;
        uv: number;
        gust_kph: number;
      }>;
    }>;
  };
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
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState<'current' | 'forecast' | 'history'>('current');
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [error, setError] = useState('');

  // Add default values for weather data
  const defaultWeatherData: WeatherData = {
    location: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime: ''
    },
    current: {
      last_updated: '',
      temp_c: 0,
      condition: {
        text: '',
        icon: ''
      },
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: '',
      pressure_mb: 0,
      precip_mm: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      vis_km: 0,
      uv: 0,
      gust_kph: 0,
      air_quality: {
        co: 0,
        no2: 0,
        o3: 0,
        so2: 0,
        pm2_5: 0,
        pm10: 0,
        'us-epa-index': 0,
        'gb-defra-index': 0
      }
    },
    forecast: {
      forecastday: []
    },
    astronomy: {
      astro: {
        sunrise: '',
        sunset: '',
        moonrise: '',
        moonset: '',
        moon_phase: '',
        moon_illumination: ''
      }
    },
    alerts: {
      alert: []
    },
    sports: {
      football: [],
      cricket: []
    },
    timezone: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime_epoch: 0,
      localtime: ''
    },
    marine: {
      forecast: []
    },
    history: {
      forecastday: []
    }
  };

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
      setError('');
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      console.log('Received weather data:', data); // Debug log
      setWeatherData(data);
      setLastUpdateTime(new Date());
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
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
    <main className="" data-theme={theme}>
      <div className="row justify-content-center">
        <div className="col-md-10 mt-5 ">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h1 className="display-4 mb-0">Weather Forecast</h1>
            <button
              onClick={toggleTheme}
              className="btn btn-outline-secondary rounded-circle p-2"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ width: '40px', height: '40px' }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
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
              <p className="">
                {locationLoading ? 'Detecting your location...' : 'Loading weather data...'}
              </p>
            </div>
          ) : weatherData ? (
            <>
              {lastUpdateTime && (
                <LastUpdated lastUpdateTime={lastUpdateTime} />
              )}
              {/* Navigation Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link ${selectedTab === 'current' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('current')}
                  >
                    Current
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${selectedTab === 'forecast' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('forecast')}
                  >
                    Forecast
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${selectedTab === 'history' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('history')}
                  >
                    History
                  </button>
                </li>
              </ul>

              {/* Current Weather Tab */}
              {selectedTab === 'current' && (
                <>
                  {/* Current Weather Card */}
                  <div className="card mb-4">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-md-6">
                          <h2 className="mb-1">{weatherData?.location?.name || 'Location'}</h2>
                          {weatherData?.location?.region && weatherData?.location?.country && (
                            <p className="mb-0">
                              {weatherData.location.region}, {weatherData.location.country}
                            </p>
                          )}
                          <div className="d-flex align-items-center mt-3">
                            {weatherData?.current?.condition?.icon && (
                              <img
                                src={weatherData.current.condition.icon}
                                alt={weatherData.current.condition.text || 'Weather condition'}
                                style={{ width: '64px', height: '64px' }}
                              />
                            )}
                            <div className="ms-3">
                              <h3 className="mb-0">{weatherData?.current?.temp_c || 0}°C</h3>
                              <p className=" mb-0">{weatherData?.current?.condition?.text || 'No data'}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row g-3">
                            <div className="col-6">
                              <div className="card bg-light">
                                <div className="card-body p-3">
                                  <h6 className="card-subtitle mb-1 ">Feels Like</h6>
                                  <p className="card-text mb-0">{weatherData?.current?.feelslike_c || 0}°C</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card bg-light">
                                <div className="card-body p-3">
                                  <h6 className="card-subtitle mb-1 ">Humidity</h6>
                                  <p className="card-text mb-0">{weatherData?.current?.humidity || 0}%</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card bg-light">
                                <div className="card-body p-3">
                                  <h6 className="card-subtitle mb-1 ">Wind</h6>
                                  <p className="card-text mb-0">{weatherData?.current?.wind_kph || 0} km/h</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card bg-light">
                                <div className="card-body p-3">
                                  <h6 className="card-subtitle mb-1 ">UV Index</h6>
                                  <p className="card-text mb-0">{weatherData?.current?.uv || 0}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Astronomy Card */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="card-title mb-4">Astronomy</h4>
                      <div className="row g-4">
                        <div className="col-md-3">
                          <div className="text-center">
                            <h6 className=" mb-2">Sunrise</h6>
                            <p className="mb-0">{weatherData?.astronomy?.astro?.sunrise || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <h6 className=" mb-2">Sunset</h6>
                            <p className="mb-0">{weatherData?.astronomy?.astro?.sunset || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <h6 className=" mb-2">Moon Phase</h6>
                            <p className="mb-0">{weatherData?.astronomy?.astro?.moon_phase || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <h6 className=" mb-2">Moon Illumination</h6>
                            <p className="mb-0">{weatherData?.astronomy?.astro?.moon_illumination || 'No data'}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Air Quality Card */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="card-title mb-4">Air Quality</h4>
                      <div className="row g-4">
                        <div className="col-md-2">
                          <div className="text-center">
                            <h6 className=" mb-2">CO</h6>
                            <p className="mb-0">{weatherData?.current?.air_quality?.co || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="text-center">
                            <h6 className=" mb-2">NO2</h6>
                            <p className="mb-0">{weatherData?.current?.air_quality?.no2 || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="text-center">
                            <h6 className=" mb-2">O3</h6>
                            <p className="mb-0">{weatherData?.current?.air_quality?.o3 || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="text-center">
                            <h6 className=" mb-2">SO2</h6>
                            <p className="mb-0">{weatherData?.current?.air_quality?.so2 || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="text-center">
                            <h6 className=" mb-2">PM2.5</h6>
                            <p className="mb-0">{weatherData?.current?.air_quality?.pm2_5 || 'No data'}</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="text-center">
                            <h6 className=" mb-2">PM10</h6>
                            <p className="mb-0">{weatherData?.current?.air_quality?.pm10 || 'No data'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alerts Card */}
                  {weatherData?.alerts?.alert?.length > 0 && (
                    <div className="card mb-4 border-warning">
                      <div className="card-body">
                        <h4 className="card-title mb-4">Weather Alerts</h4>
                        {weatherData.alerts.alert.map((alert, index) => (
                          <div key={index} className="alert alert-warning mb-3">
                            <h5 className="alert-heading">{alert.headline}</h5>
                            <p className="mb-0">{alert.desc}</p>
                            {alert.instruction && (
                              <>
                                <hr />
                                <p className="mb-0"><strong>Instructions:</strong> {alert.instruction}</p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sports Card */}
                  {(weatherData.sports?.football?.length > 0 || weatherData.sports?.cricket?.length > 0) && (
                    <div className="card mb-4">
                      <div className="card-body">
                        <h4 className="card-title mb-4">Sports Events</h4>
                        {weatherData.sports.football?.length > 0 && (
                          <div className="mb-4">
                            <h5 className="mb-3">Football</h5>
                            <div className="row g-4">
                              {weatherData.sports.football.map((match, index) => (
                                <div key={index} className="col-md-6">
                                  <div className="card">
                                    <div className="card-body">
                                      <h6 className="card-subtitle mb-2 ">{match.league}</h6>
                                      <p className="card-text mb-2">
                                        {match.home_team} vs {match.away_team}
                                      </p>
                                      <p className="card-text mb-0">
                                        <small className="">
                                          {new Date(match.start).toLocaleString()}
                                        </small>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {weatherData.sports.cricket?.length > 0 && (
                          <div>
                            <h5 className="mb-3">Cricket</h5>
                            <div className="row g-4">
                              {weatherData.sports.cricket.map((match, index) => (
                                <div key={index} className="col-md-6">
                                  <div className="card">
                                    <div className="card-body">
                                      <h6 className="card-subtitle mb-2 ">{match.league}</h6>
                                      <p className="card-text mb-2">
                                        {match.home_team} vs {match.away_team}
                                      </p>
                                      <p className="card-text mb-0">
                                        <small className="">
                                          {new Date(match.start).toLocaleString()}
                                        </small>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Forecast Tab */}
              {selectedTab === 'forecast' && (
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
                              <span className="">{Math.round(day.day.mintemp_c)}°</span>
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
                                <p className="card-text small  mb-0">
                                  {hour.condition?.text}
                                </p>
                                <div className="mt-2">
                                  <small className="">
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
              )}

              {/* History Tab */}
              {selectedTab === 'history' && weatherData?.history?.forecastday && (
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
              )}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
