/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Weather API key is not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const city = searchParams.get('q') || 'Colombo';

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    return NextResponse.json({
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      uvIndex: data.current.uv,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
