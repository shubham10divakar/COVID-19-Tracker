//const KEY_DATA = "data";

function getObject(key) {
  return JSON.parse(localStorage.getItem(key));
}

function changeCases(num) {
  document.getElementById("cases").innerHTML = `Cases: ${num}`;
}

function changeSuspects(num) {
  document.getElementById("deaths").innerHTML = `Deaths: ${num}`;
}

function changeDeaths(num) {
  document.getElementById("recovered").innerHTML = `Recovered: ${num}`;
}

function changeDate(num) {
  document.getElementById("date").innerHTML = `Date: ${num}`;
}

function setLocationText(id, value) {
  document.getElementById(id).textContent = value || "Unavailable";
}

function getCurrentPosition() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 15000
    });
  });
}

async function loadLocation() {
  const status = document.getElementById("location-status");

  if (!navigator.geolocation) {
    status.textContent = "This browser does not support device location.";
    return;
  }

  status.textContent = "Getting your device location…";

  try {
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = new URL("https://api.bigdatacloud.net/data/reverse-geocode-client");
    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set("localityLanguage", "en");

    setLocationText("latitude", latitude.toFixed(6));
    setLocationText("longitude", longitude.toFixed(6));
    setLocationText("accuracy", `${Math.round(position.coords.accuracy)} m`);
    status.textContent = "Looking up your area…";

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("The location service could not look up your area.");
    }

    const location = await response.json();
    setLocationText("country", location.countryName);
    setLocationText("state", location.principalSubdivision);
    setLocationText("city", location.city || location.locality);
    status.textContent = "Location detected using your device.";
  } catch (error) {
    status.textContent = error.code === 1
      ? "Location permission was denied. Allow location access to detect your area."
      : error.code === 3
        ? "Device location timed out. Try opening the tracker again."
        : "Unable to detect your location right now.";
  }
}


function clickHandler(element) {
        setTimeout("getState();", 1000);
      }

function getState() {
  // var state = evt.target.value
  // console.log(state)
  const json = getObject("data");
  var z = document.getElementById("states").value;
  document.getElementById("demo").innerHTML = "You selected: " + z;
}

function init() {
  const json = getObject("data");

  changeCases(json.data.summary.total);
  changeSuspects(json.data.summary.deaths);
  changeDeaths(json.data.summary.discharged);
  changeDate(json.lastRefreshed)
}

document.addEventListener(
  "DOMContentLoaded",
  function() {
    document.querySelector('select').addEventListener('click', clickHandler);
    document.getElementById("locate-button").addEventListener("click", loadLocation);
    init();
  },
  false
);
