export interface WeatherData {
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