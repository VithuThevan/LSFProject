import React from 'react';

interface Props {
    weatherData: any;
}

const CurrentWeather: React.FC<Props> = ({ weatherData }) => {
    return (
        <div className="container-fluid px-0">
            {/* Current Weather Card */}
            <div className="card mb-4">
                <div className="card-body p-2 p-sm-3">
                    <div className="row g-3 align-items-center">
                        {/* Location */}
                        <div className="col-12 col-md-2 text-center text-md-start mb-3 mb-md-0">
                            <h2 className="h4 mb-1">{weatherData?.location?.name || 'Location'}</h2>
                            {weatherData?.location?.region && weatherData?.location?.country && (
                                <p className="mb-0 text-muted">
                                    {weatherData.location.region}, {weatherData.location.country}
                                </p>
                            )}
                        </div>

                        {/* Weather Condition */}
                        <div className="col-12 col-md-3 text-center text-md-start">
                            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start">
                                {weatherData?.current?.condition?.icon && (
                                    <img
                                        src={weatherData.current.condition.icon}
                                        alt={weatherData.current.condition.text || 'Weather condition'}
                                        className="img-fluid"
                                        style={{ width: '64px', height: '64px' }}
                                    />
                                )}
                                <div className="ms-md-3 mt-2 mt-md-0">
                                    <h3 className="h5 mb-0">{weatherData?.current?.temp_c || 0}°C</h3>
                                    <p className="mb-0 small text-muted">
                                        Feels like {weatherData?.current?.feelslike_c || 0}°C
                                    </p>
                                    <p className="mb-0">{weatherData?.current?.condition?.text || 'No data'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Weather Metrics */}
                        <div className="col-12 col-md-7">
                            <div className="row g-2">
                                {['Humidity', 'Wind', 'UV Index'].map((label, i) => {
                                    const value = [
                                        weatherData?.current?.humidity + '%',
                                        weatherData?.current?.wind_kph + ' km/h',
                                        weatherData?.current?.uv
                                    ][i];
                                    return (
                                        <div className="col-4" key={label}>
                                            <div className="card bg-light h-100">
                                                <div className="card-body p-2 text-center">
                                                    <h6 className="card-subtitle mb-1 small">{label}</h6>
                                                    <p className="card-text mb-0">{value || 'No data'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Astronomy */}
            <div className="card mb-4">
                <div className="card-body p-2 p-sm-3">
                    <h4 className="h5 card-title mb-3">Astronomy</h4>
                    <div className="row g-2">
                        {['Sunrise', 'Sunset', 'Moon Phase', 'Moon Illumination'].map((title, i) => {
                            const value = [
                                weatherData?.astronomy?.astro?.sunrise,
                                weatherData?.astronomy?.astro?.sunset,
                                weatherData?.astronomy?.astro?.moon_phase,
                                `${weatherData?.astronomy?.astro?.moon_illumination}%`
                            ][i];
                            return (
                                <div className="col-6 col-md-3" key={title}>
                                    <div className="p-2 text-center">
                                        <h6 className="mb-1 small">{title}</h6>
                                        <p className="mb-0">{value || 'No data'}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Air Quality */}
            <div className="card mb-4">
                <div className="card-body p-2 p-sm-3">
                    <h4 className="h5 card-title mb-3">Air Quality</h4>
                    <div className="row g-2">
                        {['CO', 'NO2', 'O3', 'SO2', 'PM2.5', 'PM10'].map((label, i) => {
                            const key = ['co', 'no2', 'o3', 'so2', 'pm2_5', 'pm10'][i];
                            const value = weatherData?.current?.air_quality?.[key] || 'No data';
                            return (
                                <div className="col-4 col-sm-4 col-md-2" key={label}>
                                    <div className="p-2 text-center">
                                        <h6 className="mb-1 small">{label}</h6>
                                        <p className="mb-0">{value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Alerts */}
            {weatherData?.alerts?.alert?.length > 0 && (
                <div className="card mb-4 border-warning">
                    <div className="card-body p-2 p-sm-3">
                        <h4 className="h5 card-title mb-3">Weather Alerts</h4>
                        {weatherData.alerts.alert.map((alert: any, index: number) => (
                            <div key={index} className="alert alert-warning mb-2 mb-sm-3 p-2 p-sm-3">
                                <h5 className="h6 alert-heading mb-1">{alert.headline}</h5>
                                <p className="mb-1 small">{alert.desc}</p>
                                {alert.instruction && (
                                    <>
                                        <hr className="my-1" />
                                        <p className="mb-0 small"><strong>Instructions:</strong> {alert.instruction}</p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sports */}
            {(weatherData.sports?.football?.length > 0 || weatherData.sports?.cricket?.length > 0) && (
                <div className="card mb-4">
                    <div className="card-body p-2 p-sm-3">
                        <h4 className="h5 card-title mb-3">Sports Events</h4>
                        {['football', 'cricket'].map((sport) => (
                            weatherData.sports[sport]?.length > 0 && (
                                <div className="mb-3" key={sport}>
                                    <h5 className="h6 mb-2">{sport.charAt(0).toUpperCase() + sport.slice(1)}</h5>
                                    <div className="row g-2">
                                        {weatherData.sports[sport].map((match: any, index: number) => (
                                            <div key={index} className="col-12 col-sm-6">
                                                <div className="card h-100">
                                                    <div className="card-body p-2">
                                                        <h6 className="card-subtitle mb-1 small">{match.league}</h6>
                                                        <p className="card-text mb-1 small">{match.home_team} vs {match.away_team}</p>
                                                        <p className="card-text mb-0">
                                                            <small className="text-muted">{new Date(match.start).toLocaleString()}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentWeather;