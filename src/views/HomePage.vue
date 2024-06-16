<template>
    <div class="home-page">
      <h1>Welcome to Weather App</h1>
      <router-link to="/weather" class="weather-link">Go to Weather</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage'
  };
  </script>
  
  <style scoped>
  /* Styles for the home page */
  .home-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    background-color: #f0f0f0; /* Light gray background */
    background-image: url('~@/assets/background.jpg'); /* Reference image from assets folder */
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
    padding: 20px;
    text-align: center;
  }
  
  .home-page h1 {
    font-size: 3em; /* Larger font size */
    color: #0f0f0f;
    margin-bottom: 20px;
  }
  
  .weather-link {
    display: inline-block;
    background-color: #3498db;
    color: #fff;
    text-decoration: none;
    padding: 15px 30px; /* Increased padding */
    border-radius: 5px;
    transition: background-color 0.3s;
    font-size: 1.5em; /* Larger font size */
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 2px solid transparent;
  }
  
  .weather-link:hover,
  .weather-link:focus {
    background-color: #2980b9;
    outline: none; /* Remove default focus outline */
  }
  
  .weather-link:active {
    transform: translateY(1px); /* Add a slight press effect */
  }
  
  @media (max-width: 768px) {
    .home-page {
      padding: 10px;
    }
  
    .home-page h1 {
      font-size: 2.5em; /* Adjusted font size for smaller screens */
    }
  
    .weather-link {
      padding: 12px 24px; /* Adjusted padding for smaller screens */
      font-size: 1.2em; /* Adjusted font size for smaller screens */
    }
  }
  </style>
  
  