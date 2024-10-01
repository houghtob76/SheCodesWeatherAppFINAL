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

