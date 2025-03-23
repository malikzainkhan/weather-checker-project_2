const apiKey = '6f179cbcacd633d649b9f72c4ab23784'; // API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    alert('Please enter a city name');
    return;
  }
  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === '404') {
      weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
      weatherInfo.style.display = 'block';
      return;
    }

    const { name, sys, main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const weatherHTML = `
      <h2>${name}, ${sys.country}</h2>
      <div class="icon">
        <img src="${iconUrl}" alt="${weather[0].description}">
      </div>
      <p class="temperature">${main.temp}°C</p>
      <p class="description">${weather[0].description}</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = weatherHTML;
    weatherInfo.style.display = 'block';
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
    weatherInfo.style.display = 'block';
  }
}