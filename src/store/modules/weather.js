
import axios from 'axios';

const state = {
  weatherData: {
    'Srinagar': null  // Initialize with null or an empty object
  },
  backgroundImage: ''
};

const getters = {
  weatherData: state => state.weatherData,
  backgroundImage: state => state.backgroundImage
};

const actions = {
  async fetchWeather({ commit }, city) {
    const apiKey = 'aa1de1947d0a47c1edf9e8ab1cb55d35'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      commit('setWeatherData', { city, data });
      commit('setBackgroundImage', data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
};

const mutations = {
  setWeatherData(state, { city, data }) {
    // Set the weather data for the specific city
    state.weatherData = {
      ...state.weatherData,
      [city]: data
    };
  },
  setBackgroundImage(state, data) {
    // Placeholder logic to set the background image based on weather data
    const weatherMain = data.weather[0].main.toLowerCase();
   
    switch (weatherMain) {
      case 'clear':
        state.backgroundImage = require('@/assets/clear.jpg');
        break;
      case 'rain':
        state.backgroundImage = require('@/assets/rain.jpg');
        break;
      case 'snow':
        state.backgroundImage = require('@/assets/snow.jpg');
        break;
      case 'haze':
        state.backgroundImage = require('@/assets/haze.jpg');
        break;
      case 'hot':
        state.backgroundImage = require('@/assets/hot.jpg');
        break;
      default:
        state.backgroundImage = require('@/assets/fewclouds.jpg');
    }
  }
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

