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
  const data = getObject(KEY_DATA);
  //console.log('new')
	//console.log(data)
  changeCases(data.confirmed);
  changeSuspects(data.deaths);
  changeDeaths(data.recovered);
  changeDate(data.date)
}

document.addEventListener(
  "DOMContentLoaded",
  function() {
    init();
  },
  false
);
