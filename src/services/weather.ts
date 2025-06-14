export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  condition: string;
  icon: string;
}

export async function getWeatherData(city: string = 'Colombo'): Promise<WeatherData> {
  const response = await fetch(`/api/weather?q=${encodeURIComponent(city)}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
