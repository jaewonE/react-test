import React from 'react';

function RenderCard({ cityName, cityImg, weather }) {
  return (
    <div className="card">
      <img className="card__bg" src={cityImg} alt={cityName} />
      <span className="card__info card__name">{cityName}</span>
      <span className="card__info card__time">{weather.localTime}</span>
      <span className="card__info card__state">{weather.main}</span>
      <span className="card__info card__temp">{weather.temp}°C</span>
    </div>
  );
}
export default RenderCard;
