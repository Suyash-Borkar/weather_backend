// document.addEventListener("DOMContentLoaded", () => {
//   const searchButton = document.getElementById("search-btn");

//   if (searchButton) {
//     searchButton.addEventListener("click", async () => {
//       const city = document.getElementById("city-input").value;

//       if (!city) {
//         alert("Please enter a city name.");
//         return;
//       }

//       // Clear previous results
//       const weatherInfo = document.querySelector(".weather-info");
//       weatherInfo.style.display = "none";  // Hide the weather info initially
//       const notFoundMessage = document.querySelector(".not-found");
//       notFoundMessage.style.display = "none";  // Hide not found message

//       const apiUrl = `https://weather-app-1opd.onrender.com/weather?city=${city}`;  // Backend URL on Render

//       try {
//         const response = await fetch(apiUrl);

//         if (response.ok) {
//           const data = await response.json();
//           // Update weather information
//           document.querySelector(".weather-info").style.display = "block"; // Show weather info
//           document.querySelector(".country-txt").textContent = data.city;
//           document.querySelector(".temp-txt").textContent = `${data.temperature}°C`;
//           document.querySelector(".condition-txt").textContent = data.weather;
          
//         } else {
//           throw new Error("City not found");
//         }
//       } catch (error) {
//         document.querySelector(".not-found").style.display = "block";  // Show not found message
//         console.error(error);
//       }
//     });
//   } else {
//     console.error("Search button not found");
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const weatherInfo = document.querySelector(".weather-info");
  const notFoundMessage = document.querySelector(".not-found");

  if (!searchButton || !cityInput) {
    console.error("Required DOM elements not found.");
    return;
  }

  searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    fetchWeatherData(city);
  });

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
