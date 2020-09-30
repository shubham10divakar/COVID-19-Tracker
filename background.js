//const apiUrl = "https://pomber.github.io/covid19/timeseries.json";
//const apiUrl = "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
const apiUrl="https://api.rootnet.in/covid19-in/stats/latest";
const KEY_DATA = "data";

// create alarm for fresh on installed/updated, and start fetch data
chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  scheduleRequest();
  startRequest();
});

// fetch and save data when chrome restarted, alarm will continue running when chrome is restarted
chrome.runtime.onStartup.addListener(() => {
  console.log("onStartup...");
  startRequest();
});

// alarm listener
chrome.alarms.onAlarm.addListener(alarm => {
  startRequest();
});

// schedule a new fetch every 60 minutes
function scheduleRequest() {
  console.log("schedule refresh alarm to 5 minutes...");
  chrome.alarms.create("refresh", { periodInMinutes: 5 });
}

// fetch data and save to local storage
async function startRequest() {
  const data = await fetch(apiUrl);
  const parsed = await data.json()
  //console.log(parsed.data.summary)
  //const new_data=parsed.India
  //const ln=new_data.length-1
  //const deaths=	parsed.deaths
  //const confirmed=	parsed.totalCases
  //const recovered=	parsed.recovered
  //const date=	parsed.lastUpdatedAtApify
  //console.log(new_data[ln].date)
  //console.log(new_data[ln].deaths)
  //console.log(parsed.data.regional.length)
  //console.log(parsed.lastRefreshed)
  
  //const total = sumData(parsed.values);
  setBadgeText(parsed.data.summary.total);
  setObject(KEY_DATA, parsed);
}

function setObject(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setBadgeText(text) {
  chrome.browserAction.setBadgeText({ text: text.toString() });
}


