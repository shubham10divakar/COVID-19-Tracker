const KEY_DATA = "data";

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

function init() {
  const json = getObject(KEY_DATA);
  changeCases(json.data.summary.total);
  changeSuspects(json.data.summary.deaths);
  changeDeaths(json.data.summary.discharged);
  changeDate(json.lastRefreshed)
}

document.addEventListener(
  "DOMContentLoaded",
  function() {
    init();
  },
  false
);
