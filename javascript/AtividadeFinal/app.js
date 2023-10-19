httpRequest = new XMLHttpRequest();
const button = document.querySelector("button");
const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        show.innerHTML = "A geolocalização não é suportada por este navegador.";
    }
}
  
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    send(latitude, longitude);
}

function send(latitude, longitude) {
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState = 4 && httpRequest.status == 200) {          
            datas = JSON.parse(httpRequest.responseText);
            place.innerHTML = `${datas.name}, ${datas.sys.country}`;
            degrees.innerHTML = `Temperatura: ${Math.floor(datas.main.temp)}° C`;
        }
    }
    httpRequest.open("GET",`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cf9b5bd4672a429cb1249a318028c859&units=metric&lang=pt`);
    httpRequest.send();
}

button.addEventListener("click", () => {
    getLocation();
});