function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let mood = document.querySelector("#current-mood");
    let humidity = document.querySelector("#current-humidity");
    let wind = document.querySelector("#current-wind");
    let icon = document.querySelector("#icon-image");
    
    
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    mood.innerHTML = ` ${response.data.condition.description} `;
    humidity.innerHTML = ` ${response.data.temperature.humidity}%,`;
    wind.innerHTML = ` ${response.data.wind.speed}`;
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

    getForecast(response.data.city);

}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
    let apiKey = "234aebbda877t7f1bcab0617d23f3o88";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;


    axios.get(apiUrl).then(displayTemperature);


}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;


}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "234aebbda877t7f1bcab0617d23f3o88"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = "";

  
    response.data.daily.forEach(function (day, index) {
      if (index < 2) {
        forecastHtml =
        forecastHtml +
        `
        <div class="current-forecast-weather">
            <div class="current-forecast-date">
                <div class="current-forecast-day">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="current-forecast-icon" />
                    <div class="current-forecast-temperatures">
                        <div class="current-forecast-temperature"><strong>${Math.round(day.temperature.day)}º</strong></div>
                    
                        <div class="current-forecast-temperature”>${Math.round(day.temperature.minimum)}º</div>
                    </div>
                </div>
            </div>
        </div>
      `;
      }
    })
    ;
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
