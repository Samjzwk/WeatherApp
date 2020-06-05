const API_Key = '598723c4fbcdb3f63fc58a79ee937ab2';

export const currentWeather = async (citySearch) => {
  const searchWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${API_Key}`),
  searchWeather = await searchWeatherResponse.json();
  return searchWeather;
}

export const oneCallWeather = async (lat,lon) => {
  const weeklySearchWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${API_Key}`),
  weeklySearchWeather = await weeklySearchWeatherResponse.json();
  return weeklySearchWeather;
}

export const formatExtraData = (informations) => {
  return {
      'humidity': informations.humidity + ' %', 
      'air pressure': informations.pressure + ' hPa', 
      'cloud Cover': informations.clouds + ' %', 
      'wind Speed': informations.wind_speed + ' km/h' 
    }
}
