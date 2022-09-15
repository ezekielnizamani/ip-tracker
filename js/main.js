const isp = document.querySelector(".isp_data");
const time = document.querySelector(".time_data");
const locationDom = document.querySelector(".location_data");
const ipDom = document.querySelector(".ip_data");
const input = document.getElementById("trackIp");
const btn = document.querySelector(".btn");
const form = document.querySelector("form");
// map
var map = L.map('map').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09]).addTo(map);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Geolocation

let geoApi;
const regx = new RegExp(
  "[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:.[a-zA-Z]{2,})+"
);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (regx.test(input.value)) {
    geoApi = `https://geo.ipify.org/api/v2/country,city?apiKey=at_dgOhAU4Y6rLgOTj4ONvGyMLDogk1s&domain=${input.value.trim()}`;

  } else {
    geoApi = `https://geo.ipify.org/api/v2/country,city?apiKey=at_dgOhAU4Y6rLgOTj4ONvGyMLDogk1s&ipAddress=${input.value.trim()}`;
  }
  const res = fetch(geoApi)
    .then((res) => res.json())
    .catch((err) => alert(err.json()));

  res
    .then((data) => {
      console.log(data);
      ipDom.innerHTML = data.ip;
      locationDom.innerHTML = data.location.city + "," + data.location.region;
      time.innerHTML = data.location.timezone;
      isp.innerHTML = data.isp;
      map.setView([data.location.lat, data.location.lng], 13);
      marker._latlng.lng= data.location.lng
      marker._latlng.lat = data.location.lat
    })
    .catch((err) => console.log(err));
});
