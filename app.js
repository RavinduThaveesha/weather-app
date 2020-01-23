const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const dailySummary = document.querySelector('.daily-summary');
const temperatureSection = document.querySelector('.temperature-section');
const temperatureUnit = document.querySelector('.temperature-unit');

//get location 
window.addEventListener('load', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            //this API enables cross-origin requests to anywhere.
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/a605ac3c91ed634d1f319daf0111c88c/${latitude},${longitude}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                //set dom elements from the API
                const {temperature, icon} = data.currently;
                const {summary} = data.daily;
                temperatureDegree.textContent = temperature;
                dailySummary.textContent = summary;
                setIcon(icon, document.querySelector('.icon'));
            });
        });
    } else {
        alert('premission deinied application cannot work without location.') 
    }
});

temperatureSection.addEventListener('click', () => {
    if(temperatureUnit.textContent === 'F') {
        temperatureUnit.textContent = 'C';
        temperatureDegree.textContent = toCelcius(temperatureDegree.textContent);
    } else {
        temperatureUnit.textContent = 'F';
    }
});

const setIcon = (icon, iconId) => {
    const skycons = new Skycons({color: 'white'});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
}

const toCelcius = (temperature) => {
    return Math.floor((temperature - 32) * (5/9));
}