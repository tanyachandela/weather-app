const apiKey = `e3df0d419a3348f747fa773ba4c9317d`;
//const city = "Mumbai";

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("Unable to fetch the data");
        }

        const data = await response.json();
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const $cityElement = $(".city");
const $temperature = $(".temp");
const $windSpeed = $(".wind-speed");
const $humidity = $(".humidity");
const $visibility = $(".visibility-distance");

const $description = $(".description-text");
const $date = $(".date");
const $descriptionIcon = $(".description i");

// fetchWeatherData();

function updateWeatherUI(data) {
    $cityElement.text(data.name);
    $temperature.text(`${data.main.temp} °C`);
    $windSpeed.text(`${data.wind.speed} km/h`);
    $humidity.text(`${data.main.humidity}%`);
    $visibility.text(`${data.visibility / 1000} Km`);
    $description.text(data.weather[0].description);

    const currentDate = new Date();
    $date.text(currentDate.toDateString());
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    $descriptionIcon.html(`<i class="material-icons">${weatherIconName}</i>`);
}

const $formElement = $(".search-form");
const $inputElement = $('.city-input');

$formElement.on('submit', function(e) {
    e.preventDefault();

    const city = $inputElement.val();
    if (city !== '')
        fetchWeatherData(city);
    $inputElement.val('');
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Fog: "cloud",
        Drizzle: "grain"
    };
    return iconMap[weatherCondition];
}
