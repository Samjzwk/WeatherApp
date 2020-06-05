import { useState } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import { WeatherPrimaryInformations, WeatherExtraInformations, WeatherForecast } from '../components/WeatherInformations';
import SearchModal from '../components/SearchModal';
import {currentWeather,oneCallWeather, formatExtraData} from "../Lib/weather";

export default function Home({ actualCity, actualCountry, actualWeather:{current}, extraData, dailyData} ) {
  const [state , setState] = useState({
    showModal : false,
    actualCity,
    actualCountry,
    current,
    extraData,
    dailyData
  });
  const [citySearch, setCitySearch] = useState('');

  const searchWeatherCity = async () => {
    console.log("test");
    const searchWeather = await currentWeather(citySearch);
    if(searchWeather.coord && searchWeather.coord.length !== 0){
      const weeklySearchWeather = await oneCallWeather(searchWeather.coord.lat,searchWeather.coord.lon),
      extraData = formatExtraData(weeklySearchWeather.current);
      
      setState({showModal: false,
        actualCity: searchWeather.name,
        actualCountry: searchWeather.sys.country,
        current: weeklySearchWeather.current,
        extraData,
        dailyData: weeklySearchWeather.daily
      });
      setCitySearch('');
    }
    else{
      setState({...state,showModal:false});
      setCitySearch('');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/weatherico.ico" />
      </Head>
      <div class="credit">
        Developer : <a href="https://www.linkedin.com/in/samuel-jozwiak-5a218b13b/" target="_blank">Samuel Jozwiak</a>
        Designer : <a href="https://dribbble.com/shots/6357271-Weather-Application-for-Desktop" target="_blank">Hassanur Rakib</a>
        Api : <a href="https://openweathermap.org/" target="_blank">OpenWeather</a>
      </div>
      <Layout>
        {state.showModal &&
          <SearchModal citySearch={citySearch} 
          setCitySearch={setCitySearch} 
          searchWeatherCity={()=>{ searchWeatherCity()}}/>
        }
        <div className="weather__wrapper">
          <WeatherPrimaryInformations description={state.current.weather[0].description} actualCity={state.actualCity} actualCountry={state.actualCountry} temp={Math.round(state.current.temp - 273.15)} 
                                      onCLickModal = {()=> setState( prevState  => ({...prevState,showModal: !prevState.showModal}))} />
          <WeatherExtraInformations datas={state.extraData} />
          <WeatherForecast weeks={state.dailyData} />
        </div>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const weatherData = await oneCallWeather(48.85,2.35),
  extraData = formatExtraData(weatherData.current);
  return {
    props: {
      actualCity: 'Paris',
      actualCountry: 'FR',
      actualWeather: weatherData,
      extraData,
      dailyData: weatherData.daily
    }
  }
}
