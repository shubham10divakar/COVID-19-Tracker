const apiUrl = "https://pomber.github.io/covid19/timeseries.json";
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
  console.log("schedule refresh alarm to 60 minutes...");
  chrome.alarms.create("refresh", { periodInMinutes: 60 });
}

// fetch data and save to local storage
async function startRequest() {
  const data = await fetch(apiUrl);
  const parsed = await data.json()
  const new_data=parsed.India
  const ln=new_data.length-1
  const deaths=	new_data[ln].death
  const confirmed=	new_data[ln].confirmed
  const recovered=	new_data[ln].recovered
  const date=	new_data[ln].date
  //console.log(new_data[ln].date)
  //console.log(new_data[ln].deaths)
  //console.log(new_data[ln].confirmed)
  //console.log(new_data[ln].recovered)
  const total = sumData(parsed.values);
  setBadgeText(confirmed);
  setObject(KEY_DATA, new_data[ln]);
}

function sumData(values = []) {
  return (
    values.length &&
    values.reduce((a, b) => {
      const cases = a.cases + b.cases;
      const deaths = a.deaths + b.deaths;
      const suspects = a.suspects + b.suspects;
      return { cases, deaths, suspects };
    })
  );
}

function setObject(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setBadgeText(text) {
  chrome.browserAction.setBadgeText({ text: text.toString() });
}


