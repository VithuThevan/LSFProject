import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes&lang=en`
    );
    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    // Transform the data to include more information
    const transformedData = {
      current: {
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        icon: data.current.condition.icon,
        temperature: data.current.temp_c,
        uvIndex: data.current.uv,
        windSpeed: data.current.wind_kph,
        feelsLike: data.current.feelslike_c,
        pressure: data.current.pressure_mb,
        visibility: data.current.vis_km,
        airQuality: data.current.air_quality,
        lastUpdated: data.current.last_updated
      },
      forecast: data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        humidity: day.day.avghumidity,
        chanceOfRain: day.day.daily_chance_of_rain,
        chanceOfSnow: day.day.daily_chance_of_snow,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        moonrise: day.astro.moonrise,
        moonset: day.astro.moonset,
        moonPhase: day.astro.moon_phase,
        hourly: day.hour.map((hour: any) => ({
          time: hour.time,
          temp: hour.temp_c,
          condition: hour.condition.text,
          icon: hour.condition.icon,
          chanceOfRain: hour.chance_of_rain,
          chanceOfSnow: hour.chance_of_snow
        }))
      })),
      alerts: data.alerts?.alert || []
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 