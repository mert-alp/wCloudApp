const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const toggleButton = document.getElementById('toggle-button');
const weatherContainer = document.getElementById('weather-container');


search.addEventListener('click', () => {
    const APIKey = 'dd7ab4bfbd12dbe2eb0d7d5e5135fb88'; // OpenWeatherMap API anahtarınızı buraya ekleyin
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') return; // Şehir girilmediyse çıkış yap

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => {
        if (!response.ok) throw new Error('Şehir bulunamadı'); // Hata yönetimi
        return response.json();
    })
    .then(json => {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        // Hava durumuna göre resim değişimi
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;    
            case 'Mist':
                image.src = 'images/mist.png';
                break;
            case 'Haze':
                image.src = 'images/haze.png';
                break;
            default:
                image.src = 'images/cloud.png';
        }

        // Verileri güncelleme
        temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
        description.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} km/h`;
    })
    .catch(err => alert(err.message)); // Hata durumunda kullanıcıya mesaj göster
});
