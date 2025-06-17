// Next.js page file (main)
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import LastUpdated from "@/components/LastUpdated";
import CurrentWeather from "@/components/CurrentTab";
import ForecastWeather from "@/components/ForecastTab";
import HistoryWeather from "@/components/HistoryTab";

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
      "us-epa-index": number;
      "gb-defra-index": number;
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

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locationError, setLocationError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState<"current" | "forecast" | "history">("current");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const getLocation = async () => {
      setLocationLoading(true);
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported.");
        setLocationLoading(false);
        setCity("London");
        return;
      }
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `/api/geocode?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();
        if (data.locality) {
          setCity(data.locality);
        } else {
          setCity("");
        }
      } catch (error) {
        setLocationError("Unable to get location.");
        setCity("London");
      } finally {
        setLocationLoading(false);
      }
    };
    getLocation();
  }, [mounted]);

  const fetchWeatherData = useCallback(async (cityName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(cityName)}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setWeatherData(data);
      setLastUpdateTime(new Date());
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !city) return;
    fetchWeatherData(city);
    const interval = setInterval(() => fetchWeatherData(city), 30000);
    return () => clearInterval(interval);
  }, [mounted, city, fetchWeatherData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem(
      "city"
    ) as HTMLInputElement;
    if (!input.value.trim()) {
      setFormError("Please enter a city name");
      return;
    }
    setFormError("");
    setCity(input.value);
  };

  const formatTime = (timeString: string) =>
    new Date(timeString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (!mounted) return null;

  const isLoading = loading || locationLoading || initialLoad;

  return (
    <main className="container" data-theme={theme}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 mt-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start">
            <h1 className="display-4 mb-3 mb-md-0">Weather Forecast</h1>
            <button
              onClick={toggleTheme}
              className="btn btn-outline-secondary rounded-circle p-2"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"
                } mode`}
              style={{ width: "40px", height: "40px" }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>

          {locationError && !isLoading && (
            <div className="alert alert-warning mb-4" role="alert">
              {locationError}
            </div>
          )}

          <form onSubmit={handleSearch} className="mb-4">
            <div className="row g-2">
              <div className="col-12 col-sm-11">
                <input
                  type="text"
                  name="city"
                  className={`form-control ${formError ? "is-invalid" : ""}`}
                  placeholder="Enter city name"
                  onChange={() => setFormError("")}
                  disabled={isLoading}
                />
              </div>
              <div className="col-12 col-sm-1">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <i className="bi bi-search"></i>
                  )}
                </button>
              </div>
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
              <p>
                {locationLoading
                  ? "Detecting your location..."
                  : "Loading weather data..."}
              </p>
            </div>
          ) : weatherData ? (
            <>
              {lastUpdateTime && (
                <LastUpdated lastUpdateTime={lastUpdateTime} />
              )}
              <ul className="nav nav-tabs mb-4 flex-nowrap">
                {["current", "forecast", "history"].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${selectedTab === tab ? "active" : ""
                        }`}
                      onClick={() => setSelectedTab(tab as any)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>

              {selectedTab === "current" && (
                <CurrentWeather weatherData={weatherData} />
              )}
              {selectedTab === "forecast" && (
                <ForecastWeather
                  weatherData={weatherData}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                />
              )}
              {selectedTab === "history" && (
                <HistoryWeather
                  weatherData={weatherData}
                  formatTime={formatTime}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
