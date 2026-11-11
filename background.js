//const apiUrl = "https://pomber.github.io/covid19/timeseries.json";
//const apiUrl = "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
const apiUrl = "https://data.covid19india.org/data.json";
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

// Check for newly published data every five minutes.
function scheduleRequest() {
  console.log("schedule refresh alarm to 5 minutes...");
  chrome.alarms.create("refresh", { periodInMinutes: 5 });
}

// fetch data and save to local storage
async function startRequest() {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`COVID data request failed: ${response.status}`);
  }

  const sourceData = await response.json();
  const summary = sourceData.statewise && sourceData.statewise.find(
    state => state.statecode === "TT" || state.state === "Total"
  );

  if (!summary) {
    throw new Error("COVID data response did not include national totals.");
  }

  // Keep the popup's existing data shape while using the faster India feed.
  const data = {
    data: {
      summary: {
        total: Number(summary.confirmed),
        deaths: Number(summary.deaths),
        discharged: Number(summary.recovered)
      }
    },
    lastRefreshed: summary.lastupdatedtime
  };

  setBadgeText(data.data.summary.total);
  setObject(KEY_DATA, data);
}

function setObject(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setBadgeText(text) {
  chrome.browserAction.setBadgeText({ text: text.toString() });
}
