// read csv file
d3.csv('Migrant_Inflow_Outflow_2.csv', function(data) {
  console.log(data);

  var country90 = [];
  var country95 = [];
  var country00 = [];
  var country05 = [];
  var country10 = [];
  var country15 = [];
  var country17 = [];

  // marker size function
  function markerSize(netMigrants) {
    return Math.abs(netMigrants) / 10;
  };
  
  // marker color function
  function markerColor(migrants) {
    if (migrants >= 0) {
      return 'blue'
    }
    else {
      return 'red'
    }
  };

  // convert raw migration data to numbers with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // loop function on migration data
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].year) == 1990) {
      country90.push(
        L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
          stroke: false,
          fillOpacity: 0.5,
          color: markerColor(data[i].net_migrants),
          radius: markerSize(data[i].net_migrants)
        })
        .on('mouseover', function(e) {
          this.openPopup();
        })
        .bindPopup("<h3>" + data[i].country +
          "</h3><hr><p>" + data[i].year + " Net Migration: " + numberWithCommas(data[i].net_migrants))
      )
    }
    else if (parseInt(data[i].year) == 1995) {
      country95.push(
        L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
          stroke: false,
          fillOpacity: 0.5,
          color: markerColor(data[i].net_migrants),
          radius: markerSize(data[i].net_migrants)
        })
        .on('mouseover', function(e) {
          this.openPopup();
        })
        .bindPopup("<h3>" + data[i].country +
          "</h3><hr><p>" + data[i].year + " Net Migration: " + numberWithCommas(data[i].net_migrants))
      )
    }
    else if (parseInt(data[i].year) == 2000) {
      country00.push(
        L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
          stroke: false,
          fillOpacity: 0.5,
          color: markerColor(data[i].net_migrants),
          radius: markerSize(data[i].net_migrants)
        })
        .on('mouseover', function(e) {
          this.openPopup();
        })
        .bindPopup("<h3>" + data[i].country +
          "</h3><hr><p>" + data[i].year + " Net Migration: " + numberWithCommas(data[i].net_migrants))
      )
    }
    else if (parseInt(data[i].year) == 2005) {
      country05.push(
        L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
          stroke: false,
          fillOpacity: 0.5,
          color: markerColor(data[i].net_migrants),
          radius: markerSize(data[i].net_migrants)
        })
        .on('mouseover', function(e) {
          this.openPopup();
        })
        .bindPopup("<h3>" + data[i].country +
          "</h3><hr><p>" + data[i].year + " Net Migration: " + numberWithCommas(data[i].net_migrants))
      )
    }
    else if (parseInt(data[i].year) == 2010) {
      country10.push(
        L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
          stroke: false,
          fillOpacity: 0.5,
          color: markerColor(data[i].net_migrants),
          radius: markerSize(data[i].net_migrants)
        })
        .on('mouseover', function(e) {
          this.openPopup();
        })
        .bindPopup("<h3>" + data[i].country +
          "</h3><hr><p>" + data[i].year + " Net Migration: " + numberWithCommas(data[i].net_migrants))
      )
    }
    else if (parseInt(data[i].year) == 2015) {
      country15.push(
        L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
          stroke: false,
          fillOpacity: 0.5,
          color: markerColor(data[i].net_migrants),
          radius: markerSize(data[i].net_migrants)
        })
        .on('mouseover', function(e) {
          this.openPopup();
        })
        .bindPopup("<h3>" + data[i].country +
          "</h3><hr><p>" + data[i].year + " Net Migration: " + numberWithCommas(data[i].net_migrants))
      )
    }
    else if (parseInt(data[i].year) == 2017) {
      country17.push(
        L.circle([parseInt(data[i].latitude), parseInt(data[i].longitude)], {
          stroke: false,
          fillOpacity: 0.5,
          color: markerColor(data[i].net_migrants),
          radius: markerSize(data[i].net_migrants)
        })
        .on('mouseover', function(e) {
          this.openPopup();
        })
        .bindPopup("<h3>" + data[i].country +
          "</h3><hr><p>" + data[i].year + " Net Migration: " + numberWithCommas(data[i].net_migrants))
      )
    }
  }

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

  // variables holding migration data every 5 years starting 1990
  var marker90 = L.layerGroup(country90)
  var marker95 = L.layerGroup(country95)
  var marker00 = L.layerGroup(country00)
  var marker05 = L.layerGroup(country05)
  var marker10 = L.layerGroup(country10)
  var marker15 = L.layerGroup(country15)
  var marker17 = L.layerGroup(country17)

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Night Map": darkMap
  };
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    '1990': marker90,
    '1995': marker95,
    '2000': marker00,
    '2005': marker05,
    '2010': marker10,
    '2015': marker15,
    '2017': marker17
  };

  // Modify the map so that it will have the streetmap, states, and cities layers
  var myMap = L.map("map", {
    center: [37.09, -5.71],
    zoom: 3,
    layers: [darkMap, marker90]
  });

  L.control.layers(baseMaps).addTo(myMap)
  L.control.layers(overlayMaps).addTo(myMap)

  // legend set up
  var legend = L.control({position: "bottomleft"});

  legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "info legend");

    // insert legend title
    div.innerHTML += '<h3>Migration Marker</h3>'
    div.innerHTML += '<i style="background:red"></i>Net Outflow<br>'
    div.innerHTML += '<i style="background:blue"></i>Net Inflow' 
    return div;
  };
  legend.addTo(myMap);

  // GeoJSON link mapping countries
  // var coordinates = 'world-countries.json';
  // var geojson;

  // // get request to json url
  // d3.json(coordinates, function(globeData) {
  //   console.log(globeData)
  //   geojson = L.choropleth(globeData, {
  //     valueProperty: 'csv',
  //     scale: ['white', 'red'],
  //     steps: 10,
  //     mode:'q',
  //     style: {
  //       color: '#fff',
  //       weight: 1,
  //       fillOpacity: 0.4
  //     }
  //   }).addTo(myMap)
  // })

  // Set up the legend
  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = geojson.options.limits;
  //   var colors = geojson.options.colors;
  //   var labels = [];

  //   // Add min & max
  //   var legendInfo = "<h1>Consumer Price Index</h1>" +
  //     "<div class=\"labels\">" +
  //       "<div class=\"min\">" + limits[0] + "</div>" +
  //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function(limit, index) {
  //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // // Adding legend to the map
  // legend.addTo(myMap);
});