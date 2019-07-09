// Setting up migration chart

// -----------------------

// Add markers to chart

// Import data from CSV
d3.csv('Migrant_Inflow_Outflow_2.csv', function(data) {
  console.log(data);


// Function to determine marker size based on population
function absoluteValue(number) {
  return Math.abs(number);
};

// Function to round
function round(number) {
  return Math.round(number * 100) / 100;
};

// Function to format numbers with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function to replace empty values
function emptyValues(x) {
  if (x == null || x == "") {
    return "No Results";
  } else {
    return numberWithCommas(round(x));
  }
};

// Set scale for net migrants
var netScale = 25

// Define list of years
var years = ["1990", "1995", "2000", "2005", "2010", "2015", "2017"];

// Create a countries dictionary to hold circle data
var overlays = {};

// Loop through years and add them as keys to the dictionary
for (var k = 0; k < years.length; k++) {
  overlays[years[k]] = [];
}

// Create inlow markers
for (var j = 0; j < years.length; j++) {
  var year = years[j];
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].year) == year)
    overlays[year].push(
      L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
        stroke: false,
        fillOpacity: 0.5,
        // color: markerColor(data[i].net_migrants),
        // radius: absoluteValue(data[i].net_migrants*.5)
        color: "blue",
        radius: absoluteValue(data[i].inflow / netScale)
      })
      // Connect popup to marker with additional details
      .bindPopup(
        "<h3>" + data[i].country + " (" + data[i].year + ")" + "</h3>" +

        "<hr>" + 
        
        "<p>" +
          "<b>Net Migration:</b> " + numberWithCommas(data[i].net_migrants) + "<br>" +
          "<b>GDP per capita:</b> $" + numberWithCommas(round(data[i].gdp_per_capita)) + "<br>" +
          "<b>Consumer Price Index:</b> " + emptyValues(data[i].cpi) +
        "</p>"
      )
      // Display popup on mouseover
      .on('mouseover', function(e) {
        this.openPopup();
      })
      // Hide popup on mouseout
      .on('mouseout', function (e) {
        this.closePopup();
      })
    )
  }
}

// Create outflow markers
for (var j = 0; j < years.length; j++) {
  var year = years[j];
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].year) == year)
    overlays[year].push(
      L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
        stroke: false,
        fillOpacity: 0.4,
        color: "red",
        radius: absoluteValue(data[i].outflow / netScale)
      })
    )
  }
}

// Create flow lines

// Import data from Migrant_Lat&Lng_2.csv
d3.csv('Migrant_Lat&Lng_2.csv', function(line_data) {
  console.log(line_data);

// Create a orig_to_dest dictionary to hold line data
var orig_to_dest = {};

// Loop through years and add them as keys to the dictionary
for (var l = 0; l < years.length; l++) {
  orig_to_dest[years[l]] = [];
}

// // Loop through the countries array and pass in lat and lon to origin variable
for (var m = 0; m < years.length; m++) {
  var year = years[m];
  for (var n = 0; n < line_data.length; n++) {
    if (parseInt(line_data[n].year) == year && line_data[n].numb_migrants > 500000)
    overlays[year].push(
      L.polyline.antPath([
          [parseInt(line_data[n].orig_lat), parseInt(line_data[n].orig_lon)],
          [parseInt(line_data[n].dest_lat), parseInt(line_data[n].dest_lon)]], {
        weight: (line_data[n].numb_migrants * .000002),
        opacity: .3,
        delay: 300,
        dashArray: [
          100,
          100
        ],
        color: "#7E00C7",
        pulseColor: "#FFFFFF",
        paused: false,
        reverse: true,
        hardwareAccelerated: true
      })
      // Connect popup to line with additional details (works)
      .bindPopup(
        "<b>" + numberWithCommas(line_data[n].numb_migrants) + "</b>" + " people migrated from <br>" +
        "<b>" + line_data[n].destination + "</b> to <b>" + line_data[n].origin + "</b>"
      )
      .on('click', function(e) {
        this.openPopup();
      })
    )
  }  
};

// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 100,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 100,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Night Map": darkMap
};


// Create overlay object to hold our overlay layer groups -- we may want to create a for loop for this

var overlayMaps = {
    '1990': L.layerGroup(overlays[1990]),
    '1995': L.layerGroup(overlays[1995]),
    '2000': L.layerGroup(overlays[2000]),
    '2005': L.layerGroup(overlays[2005]),
    '2010': L.layerGroup(overlays[2010]),
    '2015': L.layerGroup(overlays[2015]),
    '2017': L.layerGroup(overlays[2017])
};

// Modify the map so that it will default to the streetmap layer and year 1990
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2.5,
  // layers: [streetmap, L.layerGroup(countries[1990]),L.layerGroup(orig_to_dest[1990])]
  layers: [streetmap, overlayMaps[1990]]
});

L.control.layers(baseMaps).addTo(myMap);
L.control.layers(overlayMaps).addTo(myMap);
});
});