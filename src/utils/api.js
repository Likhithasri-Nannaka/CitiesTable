import axios from 'axios';

const API_KEY = '384c74ba95ef5036ddd611927fe3146e';

export const fetchWeatherData = async (cityName) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
