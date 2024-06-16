
<template>
    <div class="weather-page">
      <div class="title-bar">
        <h1>Weather App</h1>
      </div>
  
      <div class="default-city-weather" v-if="showDefaultWeather && defaultWeather">
        <h2>{{ defaultWeather.name }}</h2>
        <p>{{ defaultWeather.main.temp }}°C</p>
        <p>{{ defaultWeather.weather[0].description }}</p>
      </div>
  
      <div class="input-container">
        <input type="text" v-model="cityInput" placeholder="Enter city name" />
        <button @click="fetchWeather">Get Weather</button>
      </div>
  
      <transition name="fade">
        <div v-if="weatherData && weatherData[cityInput]" class="weather-data">
          <h2>{{ weatherData[cityInput].name }}</h2>
          <p>{{ weatherData[cityInput].main.temp }}°C</p>
          <p>{{ weatherData[cityInput].weather[0].description }}</p>
        </div>
      </transition>
  
      <div class="background-image-container">
        <transition name="fade">
          <div :style="{ backgroundImage: 'url(' + backgroundImage + ')' }" class="background-image">
            <div class="background-image-title-bar">
              <h2>Weather Today</h2>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'WeatherPage',
    computed: {
      ...mapGetters('weather', ['weatherData', 'backgroundImage']),
      defaultWeather() {
        return this.$store.state.weather.weatherData['Srinagar'] || null; // Ensure defaultWeather is not null
      },
      showDefaultWeather() {
        return this.cityInput === '' || this.cityInput.toLowerCase() === 'srinagar';
      }
    },
    data() {
      return {
        cityInput: '' // Initialize a data property to hold the user input
      };
    },
    watch: {
      cityInput(newValue) {
        if (newValue && newValue.trim().toLowerCase() !== 'srinagar') {
          this.clearDefaultWeather();
        }
      }
    },
    mounted() {
      this.fetchDefaultWeather(); // Fetch default weather data on component mount
    },
    methods: {
      ...mapActions('weather', ['fetchWeather']),
      async fetchDefaultWeather() {
        try {
          await this.$store.dispatch('weather/fetchWeather', 'Srinagar'); // Fetch weather for 'Srinagar'
        } catch (error) {
          console.error('Error fetching default weather data:', error);
        }
      },
      async fetchWeather() {
        if (this.cityInput.trim() !== '') {
          try {
            await this.$store.dispatch('weather/fetchWeather', this.cityInput.trim()); // Fetch weather for user input city
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        } else {
          console.warn('City name is required.');
        }
      },
      clearDefaultWeather() {
        // Clear default weather data (Srinagar) from Vuex state
        this.$store.commit('weather/setWeatherData', { ...this.$store.state.weather.weatherData, Srinagar: null });
      }
    }
  };
  </script>
  
  <style scoped>
  .weather-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ensure at least full viewport height */
    text-align: center;
    background-color: #d3dcf3; /* Light gray background */
  }
  
  .title-bar {
    background-color: #032d3d; /* Blue title bar */
    color: #fff;
    padding: 10px 0;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed; /* Fixed position to stay at the top */
    top: 0; /* Stick to the top */
    z-index: 1000; /* Ensure it's above other content */
    transition: background-color 0.3s ease-in-out; /* Example transition for the title bar */
  }
  
  .title-bar h1 {
    margin: 0;
    font-size: 2em;
  }
  
  .default-city-weather {
    margin-top: 80px; /* Ensure space below fixed title bar */
  }
  
  .input-container {
    margin: 20px 0; /* Adds space above and below */
  }
  
  .input-container input {
    padding: 12px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
    margin-right: 10px;
  }
  
  .input-container button {
    padding: 12px 24px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1em;
  }
  
  .input-container button:hover {
    background-color: #2980b9;
  }
  
  .weather-data {
    margin-bottom: 20px;
  }
  
  .weather-data h2 {
    font-size: 2.5em;
    color: #333;
    margin-bottom: 10px;
  }
  
  .weather-data p {
    font-size: 1.2em;
    color: #555;
  }
  
  .background-image-container {
    width: 80%; /* Adjust width as needed */
    max-width: 600px; /* Limit maximum width */
    margin: 0 auto;
  }
  
  .background-image {
    height: 300px; /* Adjust height as needed */
    width: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden; /* Ensure content doesn't overflow */
    position: relative; /* Ensure position context for title bar */
    transition: background-image 0.5s ease-in-out; /* Example transition for background image */
  }
  
  .background-image-title-bar {
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
    padding: 10px 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .background-image-title-bar h2 {
    margin: 0;
    font-size: 1.5em;
    color: #333;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  
  