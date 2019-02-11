// Foursquare API Info
const clientId = "EXZHFENOPKMNC53M35DICHMKYS1PW4PPJXRQONO4HXZTE5AL";
const clientSecret = "STOMCBNCTLSRD2DHIW5FEUCNWWQ25Y0BGKNT2HR3KSNJ05XM";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// APIXU Info
const apiKey = "7e53027249084f9a8c1104839190702";
const forecastUrl = "https://api.apixu.com/v1/forecast.json";

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
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190207`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      console.log("API connection is successfull");
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(
        item => item.venue
      );
      console.log(venues);
      return venues;
    } else {
      throw new Error("Request failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = `${forecastUrl}?key=${apiKey}&q=${city}&days=4&hour=10`;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      console.log("API connection is successfull");
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const days = jsonResponse.forecast.forecastday;
      console.log(days);
      return days;
    } else {
      throw new Error("Request failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Render functions
const renderVenues = venues => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];

    const venueIcon = venue.categories[0].icon;

    const venueImgSrc = venueIcon.prefix + "bg_64" + venueIcon.suffix;

    let venueContent =
      "<h2>" +
      venue.name +
      "</h2>" +
      '<img class="venueimage" src=' +
      venueImgSrc +
      ">" +
      "<h3>Address:</h3>" +
      "<p>" +
      venue.location.address +
      "</p>" +
      "<p>" +
      venue.location.city +
      "</p>" +
      "<p>" +
      venue.location.country +
      "</p>";

    $venue.append(venueContent);
  });

  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = days => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
    const currentDay = days[index];

    const humidity = currentDay.day.avghumidity;

    var d = new Date(currentDay.date);

    var weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wedneday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
    weekDay[7] = "Sunday";

    var n = weekDay[d.getDay()];

    let weatherContent =
      "<h2> High: " +
      +currentDay.day.maxtemp_c +
      " C</h2>" +
      "<h2> Low: " +
      currentDay.day.mintemp_c +
      " C</h2>" +
      "<img src=http://" +
      currentDay.day.condition.icon +
      ' class="weathericon" />' +
      "<h2>" +
      n +
      "</h2>" +
      "<h2>Humidity: " +
      humidity +
      "%</h2";

    $day.append(weatherContent);
  });
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(days => renderForecast(days));
  return false;
};

$submit.click(executeSearch);
