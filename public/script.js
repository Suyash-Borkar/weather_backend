document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherInfo = document.querySelector(".weather-info");
  const notFoundMessage = document.querySelector(".not-found");

  if (!searchButton || !cityInput) {
    console.error("Required DOM elements not found.");
    return;
  }

  // Handle search button click
  searchButton.addEventListener("click", () => {
    handleSearch();
  });

  // Handle Enter key press in input field
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    fetchWeatherData(city);
  }

  async function fetchWeatherData(city) {
    const apiUrl = `https://weather-app-1opd.onrender.com/weather?city=${encodeURIComponent(city)}`;

    resetDisplay();

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      updateWeatherInfo(data);
    } catch (error) {
      console.error(error);
      notFoundMessage.style.display = "block";
    }
  }

  function resetDisplay() {
    weatherInfo.style.display = "none";
    notFoundMessage.style.display = "none";
  }

  function updateWeatherInfo(data) {
    document.querySelector(".country-txt").textContent = data.city;
    document.querySelector(".temp-txt").textContent = `${data.temperature}°C`;
    document.querySelector(".condition-txt").textContent = data.weather;
    weatherInfo.style.display = "block";
  }
});
