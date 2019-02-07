// Foursquare API Info
const clientId = "EXZHFENOPKMNC53M35DICHMKYS1PW4PPJXRQONO4HXZTE5AL";
const clientSecret = "STOMCBNCTLSRD2DHIW5FEUCNWWQ25Y0BGKNT2HR3KSNJ05XM";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// APIXU Info
const apiKey = "7e53027249084f9a8c1104839190702";
const forecastUrl = "http://api.apixu.com/v1/current.json";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [
  $("#weather1"),
  $("#weather2"),
  $("#weather3"),
  $("#weather4")
];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch =
    url +
    city +
    "&limit=10" +
    "&" +
    clientId +
    "&" +
    clientSecret +
    "&v=20190207";
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      console.log("API connection is successfull");
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = () => {};

// Render functions
const renderVenues = venues => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:

    let venueContent = "";
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = days => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:

    let weatherContent = "";
    $day.append(weatherContent);
  });
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues();
  getForecast();
  return false;
};

$submit.click(executeSearch);
