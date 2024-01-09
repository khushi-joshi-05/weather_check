const apiKey = 'e916fb2b75a20d09eacea443cf1c220b';

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherByCoordinates(latitude, longitude);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    function searchWeather() {
      const city = document.getElementById('search-input').value;
      if (city.trim() !== '') {
        fetchWeatherByCity(city);
      }
    }

    async function fetchWeatherByCoordinates(latitude, longitude) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      await fetchWeather(apiUrl);
    }

    async function fetchWeatherByCity(city) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      await fetchWeather(apiUrl);
    }

    async function fetchWeather(apiUrl) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          updateWeatherInfo(data);
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        alert('Error fetching weather data');
        console.error('Error fetching weather data:', error);
      }
    }

    function updateWeatherInfo(data) {
      document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" >`;

      document.getElementById('temperature').innerText = ` ${((data.main.temp - 273.15).toFixed(2))}°C`;
      document.getElementById('description').innerText = ` ${data.weather[0].description}`;
      document.getElementById('precipitation').innerText = `Precipitation: ${data.weather[0].main}`;
      document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;

      document.getElementById('weather-info').style.display = 'block';
    }