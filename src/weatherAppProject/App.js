import React from 'react';
import axios from 'axios';
import RenderPage from 'weatherAppProject/renderPage';
import RenderLoading from 'weatherAppProject/renderLoading';
import 'weatherAppProject/App.css';

//cityList : ["busan", "Hanoi","New York", "London", "paris", "Sydney", "Rome", "Osaka", "Budapest", "Berlin", "Havana", "Hong Kong"],

class App extends React.Component {
  state = {
    cityList: ['New York', 'Paris', 'Sydney', 'Rome', 'Budapest', 'Berlin'],
    isLoading: true,
    cardList: [],
    mainInfo: {},
  };

  getLocalTime = (timeZone) => {
    let d = new Date();
    let localHours = d.getHours() - 9 + timeZone;
    if (localHours < 0) {
      localHours += 24;
    }
    let localMinute = d.getMinutes();
    return `${localHours}:${localMinute}`;
  };

  getWeather = async (cityName) => {
    const API_KEY = '27338683655f3e15f8a75651633c9a1d';
    const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?';
    const json = await axios.get(
      `${WEATHER_API}q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const weatherInfo = json.data.weather[0];
    weatherInfo.temp = Math.floor(json.data.main.temp);
    weatherInfo.localTime = this.getLocalTime(json.data.timezone / 3600);
    return weatherInfo;
  };

  getCityImg = async (cityName) => {
    const API_KEY = '22034991-dca9a94768b57d643bdde920b';
    const formatedCity = cityName.replace(' ', '+');
    const cityImg = await axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${formatedCity}
    &image_type=photo
    &orientation=horizontal
    &min_width=300
    &min_height=300
    &per_page=3
    &category= places
    &colors="black"
    &pretty=true`
      )
      .then((response) => {
        return response.data.hits[0].webformatURL;
      });
    return cityImg;
  };

  getMainWeather = async (coords) => {
    const API_KEY = '27338683655f3e15f8a75651633c9a1d';
    const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?';
    const { data } = await axios.get(
      `${WEATHER_API}lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`
    );
    const weatherInfo = data.weather[0];
    let main = {};
    main.city = data.name;
    main.temp = data.main.temp;
    main.state = weatherInfo.main;
    main.weatherIcon = `http://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`;
    main.time = this.transTimeState(this.getLocalTime(data.timezone / 3600));
    this.setState({ mainInfo: main });
  };

  getLocalTime = (timeZone) => {
    let d = new Date();
    let localHours = d.getHours() - 9 + timeZone;
    if (localHours < 0) {
      localHours += 24;
    }
    let localMinute = d.getMinutes();
    return `${localHours}:${localMinute}`;
  };

  transTimeState = (time) => {
    const split = time.split(':');
    let hour = Number(split[0]);
    let minute = Number(split[1]);
    if (minute < 10) {
      minute = `0${String(minute)}`;
    } else {
      minute = String(minute);
    }
    if (hour > 12) {
      if (hour >= 22) {
        return `${hour - 12}:` + minute + ' PM';
      } else {
        return `0${hour - 12}:` + minute + ' PM';
      }
    } else if (hour === 12) {
      return time + ' PM';
    } else {
      return time + ' AM';
    }
  };

  handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = {
      latitude: latitude,
      longitude: longitude,
    };
    this.getMainWeather(coords);
  };

  handleGeoFailure = () => {
    console.log('no location');
  };

  setInfo = async () => {
    const { cityList } = this.state;
    let cards = [];
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoFailure
    );
    for (let i = 0; i < cityList.length; i++) {
      const cityName = cityList[i];
      const cityInfo = { cityName: cityName, index: i };
      cityInfo.weather = await this.getWeather(cityName);
      cityInfo.cityImg = await this.getCityImg(cityName);
      cards.push(cityInfo);
    }
    this.setState({ cardList: cards, isLoading: false });
  };

  componentDidMount() {
    this.setInfo(); //?????? ??????!!!
    //?????? this.setInfo?????? ?????? ????????? ?????? componentMount() ?????? ?????? ?????????.
    //????????? ????????? ????????? this.getWeather????????? this.getCityImg???????????? ?????? string ????????? obj????????? return??????
    //?????? promise ????????? ????????? ??? promise ?????? ?????? ?????? ?????? ???????????????.(?????? ?????????????????????)
    //????????? ?????? ?????? ????????? ??? ?????? async()??? await??? ?????????????????? ??????????????? ?????? ????????????.
    //??????...
  }

  render() {
    const { isLoading, cardList, mainInfo } = this.state;
    return (
      <section className="contents">
        {isLoading ? (
          <RenderLoading />
        ) : (
          <RenderPage cardList={cardList} main={mainInfo} />
        )}
      </section>
    );
  }
}

export default App;
