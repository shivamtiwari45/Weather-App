const API_KEY = "bfdba708db9994fed61c6862c81847ee";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const card = document.getElementById("weatherCard");
    const error = document.getElementById("error");

    if (!city) {
        error.innerText = "Please enter a valid city!";
        card.style.display = "none";
        return;
    }

    error.innerText = "";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(url);

        if (res.status === 404) {
            error.innerText = "City not found!";
            card.style.display = "none";
            return;
        }

        const data = await res.json();

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = data.main.temp + "°C";
        document.getElementById("desc").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";

        const icon = data.weather[0].icon;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${icon}@4x.png`;

        card.style.display = "block";

    } catch (e) {
        error.innerText = "Network Error!";
        card.style.display = "none";
    }
}
