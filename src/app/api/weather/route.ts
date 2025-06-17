import { NextResponse } from 'next/server';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.BASE_URL;

async function fetchWeatherData(city: string) {
  try {
    // Fetch all available weather data
    const [
      currentResponse,
      forecastResponse,
      astronomyResponse,
      alertsResponse,
      sportsResponse,
      timezoneResponse,
      marineResponse,
      historyResponse
    ] = await Promise.all([
      fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=yes`),
      fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`),
      fetch(`${BASE_URL}/astronomy.json?key=${API_KEY}&q=${city}`),
      fetch(`${BASE_URL}/alerts.json?key=${API_KEY}&q=${city}`),
      fetch(`${BASE_URL}/sports.json?key=${API_KEY}&q=${city}`),
      fetch(`${BASE_URL}/timezone.json?key=${API_KEY}&q=${city}`),
      fetch(`${BASE_URL}/marine.json?key=${API_KEY}&q=${city}`),
      fetch(`${BASE_URL}/history.json?key=${API_KEY}&q=${city}&dt=${getYesterdayDate()}`)
    ]);

    const [
      currentData,
      forecastData,
      astronomyData,
      alertsData,
      sportsData,
      timezoneData,
      marineData,
      historyData
    ] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json(),
      astronomyResponse.json(),
      alertsResponse.json(),
      sportsResponse.json(),
      timezoneResponse.json(),
      marineResponse.json(),
      historyResponse.json()
    ]);

    // Transform the data to match the expected structure
    const transformedData = {
      location: currentData.location,
      current: {
        last_updated: currentData.current?.last_updated,
        temp_c: currentData.current.temp_c,
        condition: {
          text: currentData.current.condition.text,
          icon: currentData.current.condition.icon
        },
        wind_kph: currentData.current.wind_kph,
        wind_degree: currentData.current.wind_degree,
        wind_dir: currentData.current.wind_dir,
        pressure_mb: currentData.current.pressure_mb,
        precip_mm: currentData.current.precip_mm,
        humidity: currentData.current.humidity,
        cloud: currentData.current.cloud,
        feelslike_c: currentData.current.feelslike_c,
        vis_km: currentData.current.vis_km,
        uv: currentData.current.uv,
        gust_kph: currentData.current.gust_kph,
        air_quality: currentData.current.air_quality || {
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
        forecastday: forecastData.forecast.forecastday.map((day: any) => ({
          date: day.date,
          day: {
            maxtemp_c: day.day.maxtemp_c,
            mintemp_c: day.day.mintemp_c,
            avgtemp_c: day.day.avgtemp_c,
            maxwind_kph: day.day.maxwind_kph,
            totalprecip_mm: day.day.totalprecip_mm,
            avghumidity: day.day.avghumidity,
            daily_chance_of_rain: day.day.daily_chance_of_rain,
            daily_chance_of_snow: day.day.daily_chance_of_snow,
            condition: {
              text: day.day.condition.text,
              icon: day.day.condition.icon
            }
          },
          astro: day.astro,
          hour: day.hour.map((hour: any) => ({
            time: hour.time,
            temp_c: hour.temp_c,
            condition: {
              text: hour.condition.text,
              icon: hour.condition.icon
            },
            wind_kph: hour.wind_kph,
            wind_degree: hour.wind_degree,
            wind_dir: hour.wind_dir,
            pressure_mb: hour.pressure_mb,
            precip_mm: hour.precip_mm,
            humidity: hour.humidity,
            cloud: hour.cloud,
            feelslike_c: hour.feelslike_c,
            vis_km: hour.vis_km,
            uv: hour.uv,
            gust_kph: hour.gust_kph
          }))
        }))
      },
      astronomy: {
        astro: astronomyData.astronomy.astro
      },
      alerts: alertsData.alerts || { alert: [] },
      sports: sportsData.sports || { football: [], cricket: [] },
      timezone: timezoneData.location,
      marine: marineData.forecast || { forecast: [] },
      history: historyData.forecast || { forecastday: [] },
      lastUpdated: new Date().toISOString()
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Helper function to get yesterday's date in YYYY-MM-DD format
function getYesterdayDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  try {
    const data = await fetchWeatherData(city);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in weather API route:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
} 