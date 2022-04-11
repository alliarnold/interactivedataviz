
// FIRST Set up initial map center and zoom level
// relatively central coordinates for NYC: 40.70748615030739, -73.92744598608154
// zoom levels get closer the higher the number - try 11 or 12 or 13 to start

const map = L.map('map', {
    center: [40.70748615030739, -73.92744598608154],
    zoom: 12
});

let controlLayers;

controlLayers  = L.control.layers(null, null, {
    position: "topright", 
    collapsed: false
}).addTo(map);



/*
Later in process: Add a legend (checkboxes) to the upper-right corner.
At first, baselayers and overlays are set to `null` (empty legend).
We will be adding items to the legend as we load each layer.
*/  

    
// display basemap tiles 


// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/


// read data from data files

const wataerAvg2020 = $.getJSON('../data/2020s-Mean-Monthly-High-Water.geojson', function(data){
    let overlay2020 = L.geoJson(data)
    overlay2020.addTo(map);
    controlLayers.addOverlay(overlay2020, "Water High Average 2020")
});

const wataerAvg2050 = $.getJSON('../data/2050s-Mean-Monthly-High-Water.geojson', function(data){
    let overlay2050 = L.geoJson(data)
    overlay2050.addTo(map);
    controlLayers.addOverlay(overlay2050, "Water High Average 2050")
});

const wataerAvg2080 = $.getJSON('../data/2050s-Mean-Monthly-High-Water.geojson', function(data){
    let overlay2080 = L.geoJson(data)
    overlay2080.addTo(map);
    controlLayers.addOverlay(overlay2080, "Water High Average 2080")
});

let accessPlans = $.getJSON('../data/Waterfront-Access-Plans.geojson', function(data){
    let overlayPlans = L.geoJson(data, {
        style: function (feature) {
            return {color: "orange"}
        },
        onEachFeature: function (feature, layer) {layer.bindPopup(feature.properties.name);
        }
    })
    overlayPlans.addTo(map);
    controlLayers.addOverlay(overlayPlans, "Waterfront Access Plan");
});

const myCircle01 = L.circle([40.70748615030739, -73.92744598608154], {
    color: 'magenta',
    fillColor: 'oragne',
    radius: 500,
}).addTo(map);

myCircle01.bindPopup("area of interest")

// add data overlay layers
