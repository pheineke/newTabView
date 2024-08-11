document.addEventListener("DOMContentLoaded", () => {

    var latitude = 52.52;
    var longitude = 13.41;
    var city = "";

    function showPosition(position) {
        latitude = Math.round(position.coords.latitude * 100) / 100;
        longitude = Math.round(position.coords.longitude * 100) / 100;
    }

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
        
    }

    // setTimeout(() => {
    //     const city_url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

    //     fetch(city_url)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.address && data.address.city) {
    //                 console.log("Stadt:", data.address.city);
    //                 document.getElementById("wetter_loc").textContent = "Aktuelles Wetter in "+ data.address.city;
    //             } else if (data.address && data.address.town) {
    //                 console.log("Stadt:", data.address.town);
    //                 document.getElementById("wetter_loc").textContent = "Aktuelles Wetter in "+ data.address.town;
    //             } else if (data.address && data.address.village) {
    //                 console.log("Stadt:", data.address.village);
    //                 document.getElementById("wetter_loc").textContent = "Aktuelles Wetter in "+ data.address.village;
    //             } else {
    //                 document.getElementById("wetter_loc").textContent = "Standort konnte nicht zugeordnet werden";
    //             }
    //         })
    //         .catch(error => console.error('Fehler:', error));
    // }, 1000);

    //console.log(city)
    setTimeout(() => {
        //https://open-meteo.com/en/docs#hourly=temperature_2m,relative_humidity_2m,rain,showers,weather_code,cloud_cover&past_days=1
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,rain,showers,weather_code,cloud_cover&past_days=1`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                var latestDataIndex = data.hourly.time.length - 1;

                var temperature = data.hourly.temperature_2m[latestDataIndex];
                var humidity = data.hourly.relative_humidity_2m[latestDataIndex];
                var rain = data.hourly.rain[latestDataIndex];
                var cloud_cover = data.hourly.cloud_cover[latestDataIndex];

                document.getElementById("temperature").textContent = temperature;
                document.getElementById("humidity").textContent = humidity;
                document.getElementById("rain").textContent = rain;
                document.getElementById("cloud_cover").textContent = cloud_cover;
                //document.getElementById("weather-code").textContent = weatherCode;

                
            })
            .catch(error => {
                console.error("Fehler beim Abrufen der Wetterdaten:", error);
                document.getElementById("wetter_loc").textContent = "Fehler beim Abrufen der Wetterdaten";

            });

            const x = document.getElementById("demo");
    }, 1000);  // Eine Sekunde warten
    
});

