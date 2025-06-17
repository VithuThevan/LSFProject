import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('latitude');
  const lng = searchParams.get('longitude');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.GEOCODE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in geocoding:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location data' },
      { status: 500 }
    );
  }
} 