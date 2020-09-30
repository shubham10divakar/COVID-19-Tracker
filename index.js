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

$.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function(location) {
    $('#country').html(location.country_name);
    $('#state').html(location.state);
    $('#city').html(location.city);
    $('#latitude').html(location.latitude);
    $('#longitude').html(location.longitude);
    $('#ip').html(location.IPv4);
  }
});


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
    init();
  },
  false
);
