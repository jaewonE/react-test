import React from 'react';
import RenderCard from 'weatherAppProject/card';

function RenderPage({ cardList, main }) {
  return (
    <div className="container">
      <div className="main_wrapper">
        <div className="top_space"></div>
        <div className="main_title">
          <span className="main_title__country">south korea</span>
          <span className="main_title__city">{main.city}</span>
        </div>
        <div className="main_icon">
          <img
            className="main_weatherIcon"
            src={main.weatherIcon}
            alt="weatherImageIcon"
          />
        </div>
        <div className="main_description">
          <span className="main_description__temp">{main.temp}°C</span>
          <span className="main_description__state">{main.state}</span>
        </div>
      </div>
      <div className="side_wrapper">
        <div className="clock_wrapper">
          <span className="clock">{main.time}</span>
        </div>
        <div className="card_wrapper">
          {cardList.map((card) => (
            <RenderCard
              key={card.index}
              cityName={card.cityName}
              cityImg={card.cityImg}
              weather={card.weather}
            />
          ))}
        </div>
      </div>
      <img
        className="main__bg"
        src="https://cdn.hipwallpaper.com/i/13/69/8TvaC0.jpg"
        alt="bg_image"
      />
    </div>
  );
}

export default RenderPage;
