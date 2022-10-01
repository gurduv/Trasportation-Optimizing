
var map; // var for maps element
var markers = []; //store the location markers we add tinyurl.com/gmproj5
var directionsDisplay; // var for showing or hiding directions
var directionsService; // var for calling directions services

var start;         // start place id
var end;           // end place id
var waypoint = []; // array for holding place id's objects of each travel stopping point (between start and stop)

var MAX_WAYPOINTS = 25; // max number of waypoints allowed by API (25 max as of Jan 27, 2020)

document.getElementById("loc2").placeholder = "Enter up to " + MAX_WAYPOINTS + " waypoints"; // placeholder text for input filed for waypoints

//called after the google maps api is loaded - this runs first
function initMap() {
    //create map object
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32, lng: 35},
        zoom: 9
    });
    
    
    // attempt to get user location with W3C Geolocation (Preferred). see: tinyurl.com/gmproj3
    var initialLocation; // then this runs
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
            map.setZoom(11);
        });
    }
    
    
    directionsService = new google.maps.DirectionsService
    directionsDisplay = new google.maps.DirectionsRenderer(); // var calling the directions display
    directionsDisplay.setMap(map); //shows the route on the map
    directionsDisplay.setPanel(document.getElementById('directionsPanel')); // sends the route to the directionspanel
    
    var searchBox0 = new google.maps.places.SearchBox(document.getElementById('loc1'));
    var searchBox1 = new google.maps.places.SearchBox(document.getElementById('loc2'));
    var searchBox2 = new google.maps.places.SearchBox(document.getElementById('loc3'));
    
    map.addListener('bounds_changed', function () {
        searchBox0.setBounds(map.getBounds());
        searchBox1.setBounds(map.getBounds());    
        searchBox2.setBounds(map.getBounds());
    });
    
    searchBox0.addListener('places_changed', function () {
        document.getElementById("loc1").value = "";
        addPoint(searchBox0.getPlaces()[0], 'start');
    });
    
    searchBox1.addListener('places_changed', function () {
        document.getElementById("loc2").value = "";
        addPoint(searchBox1.getPlaces()[0], 'waypoint');
    });
    
    searchBox2.addListener('places_changed', function () {
        addPoint(searchBox2.getPlaces()[0], 'end');
    });
    toggleSearchBoxes(true);
    
    const geocoder = new google.maps.Geocoder();
    loadFromUrl(geocoder);
    
}

function calcRoute(routeStart) {
    updateUrl();
    console.log(start);
    console.log(end);
    console.log(waypoint);

    if(typeof start == 'undefined' || typeof end == 'undefined' || typeof waypoint[0] == 'undefined') {
        var pan = document.getElementById('directionsPanel');
        if((' ' + pan.className + ' ').indexOf(' disabled ') == -1) {
            pan.className += " disabled";
            document.getElementById("ham").src='images/grey-hamburger.png';
        }
        
        directionsDisplay.setMap(null);
        for(var i=0; i<markers.length; i++)
            if(typeof markers[i] != 'undefined')
                markers[i].setMap(map);
        return;
    }
//    printLocations();
    directionsDisplay.setMap(map);
    const actualWaypoints = waypoint.map(w => ({
        location: w.geometry.location,
        stopover: true
    }));
    
    const request = {
        origin: start.geometry.location,
        destination: end.geometry.location,
        waypoints: actualWaypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }
    
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            clearMarkers();
            directionsDisplay.setDirections(result);
        }
    });
    
    var pan = document.getElementById('directionsPanel');
    if((' ' + pan.className + ' ').indexOf(' disabled ') != -1) {
        pan.className = ""; //make panel visible
        document.getElementById("ham").src='images/hamburger.png';
    }

}

function clearMarkers() {
    for(var i=0; i<markers.length; i++)
        if(typeof markers[i] != 'undefined')
            markers[i].setMap(null); //turn markers off but don't delete in case directionsDisplay is turned off
    // console.log("***markers cleared");
}

/**
 * disable or enable all searchboxes.
 */
function toggleSearchBoxes(enabled) {
  document.getElementById('loc1').disabled = !enabled;
  document.getElementById('loc2').disabled = !enabled;
  document.getElementById('loc3').disabled = !enabled;
  if (enabled) {
    document.getElementById('loading-info').className = 'hidden';
  } else {
    document.getElementById('loading-info').className = '';
  }
}

async function loadFromUrl(geocoder) {
    console.log('loading from url geocoder');
    toggleSearchBoxes(false);
    const queryParams = new URLSearchParams(window.location.search);
    let request;

    const startPlaceId = 'ChIJ41SEZPhJHRUR7snt28fabB0'; 
    const endPlaceId = 'ChIJwyldiQg2HRURx-FEiADtZPA';
    const waypointIds = queryParams.get('waypoint') ? queryParams.get('waypoint').split(',') : [];

    console.log('startPlaceId = '); console.log(startPlaceId);
    console.log('endPlaceId = '); console.log(endPlaceId);
    console.log('waypointIds = '); console.log(waypointIds);

    let promises = [];

    if (startPlaceId) {
      promises.push(expandPlaceId(geocoder, startPlaceId, place => {
        addPoint(place, 'start', false);
      }));

    }
    if (endPlaceId) {
      promises.push(expandPlaceId(geocoder, endPlaceId, place => {
        addPoint(place, 'end', false);
      }));
    }

    for (const waypointId of waypointIds) {
      promises.push(expandPlaceId(geocoder, waypointId, place => {
        addPoint(place, 'waypoint', false);
      }));
    }

    console.log(`waiting for ${promises.length} promises...`);
    await Promise.all(promises);
    if (promises.length > 0) {
      console.log('recalculating route');
      calcRoute();
    }

    toggleSearchBoxes(true);
    
}

  
function expandPlaceId(geocoder, placeId, callback) {
    return geocoder
      .geocode({ placeId: placeId })
      .then(({ results }) => {
          if (!results[0]) {
              console.warn(`unable to find result for place_id '${placeId}'`);
              return;
          }
          const res = results[0]; //should have fields res.geometry.location and res.formatted_address;
          callback(res);
      })
      .catch((e) => console.error("Geocoder failed due to: " + e));

}

function updateUrl() {
    console.log('updating url');
    let params = { waypoint: waypoint.map(p => p.place_id) };
    if (start) params.start = start.place_id;
    if (end) params.end = end.place_id;

    params = new URLSearchParams(params);
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);

}

/**
 * add a place as the start, end, or a waypoint on the route.
 *
 * @param place the place to be added
 * @param pointType (str) 'start' | 'end' | 'waypoint'
 * @param computeDirections (bool) whether to call calcRoute() after adding the point (default true)
 */
function addPoint(place, pointType, computeDirections=true) {
    if(exists(place, false)) return; // prevent adding a duplicate place
    // if this place came from geocode lookup, it won't have a 'name' field:
    const placeName = place['name'] || place['formatted_address'];

    if (pointType === 'start') {
        start = place; //add the first place from the search
        //console.log("start place = "); console.log(start);
        //setMarker(0, start);
        document.getElementById("startInfo").innerHTML = "<br>" + placeName; //shortened name
        document.getElementById("startInfo").title = start['formatted_address'];
        //document.getElementById("startInfo").innerHTML = "<br>" + start['formatted_address'];
        calcRoute();

    } else if (pointType === 'end') {
        end = place;
        document.getElementById("loc3").value = "";
        //setMarker(1, end);
        document.getElementById("endInfo").innerHTML = "<br>" + placeName;
        document.getElementById("endInfo").title = end['formatted_address'];
        calcRoute();

    } else if (pointType === 'waypoint') {
          if(waypoint.length >= MAX_WAYPOINTS) { // check against max number of waypoints
              alert("Only " + MAX_WAYPOINTS + "  waypoints are allowed. Please remove a waypoint before adding a new one.");
              return;
          }
          waypoint.push(place); // add place to end of array
          //console.log('added new waypoint, markers = '); console.log(markers);
          const i = waypoint.length-1;
          //setMarker(i+2, waypoint[i]);
          document.getElementById("waypointsInfo").innerHTML += "<li id='point" + i + "'>" + "<t class='tooltip' title='" + place['formatted_address'] + "'>" +
          placeName +
              "</t><a href='javascript:void(0)' onclick='deletePoint(this)'></a>\
              <a href='javascript:void(0)'>"; // [X]
//            console.log("waypoint=" + waypoint + '\n');
          calcRoute();
          

    } else {
      console.error(`invalid pointType '${pointType}' for addPoint()`);
      return;
    }

  if (computeDirections) {
    calcRoute();
  }
}


function deletePoint(elem) { //tinyurl.com/gmproj8
    elem = elem.parentNode; //a ul element with id="pointn" where n is sum number. elem started as the <a> element that was clicked
    var i = parseInt(elem.id.substring(5));
                
    waypoint.splice(i,1); //location i, remove 1 element
    markers[i+2].setMap(null);
    markers.splice(i+2, 1); //i is offset by 2 bc start and end are in front
    
    elem.parentNode.removeChild(document.getElementById("point" + i)); //delete element
    
    for(var t=i+1; document.getElementById("point" + t) != null; t++) { //fix ids of the others
        document.getElementById("point" + t).id = "point" + (t-1);
    }
    
//    console.log("***removed waypoint[" + i + "]");
//    console.log("waypoint=" + waypoint);
    calcRoute();
}

function printLocations() {
    console.log("Printing geometry.location of all locations");
    if(typeof start != 'undefined')
        console.log("start=" + start.geometry.location);
    else
        console.log("start=UNDEFINED");
    if(typeof end != 'undefined')
        console.log("end=" + end.geometry.location);
    else
        console.log("end=UNDEFINED");
    
    console.log("waypoint.length=" + waypoint.length);
    for(var i=0; i<waypoint.length; i++)
        console.log("waypoint[" + i + "].geometry.location=" + waypoint[i].geometry.location);
}

/**
 * check if a place is already in use (as a start/end spot or waypoint) to prevent duplicates.
 * @param plc: place
 * @param isEndpoint: boolean indicator if this place will be the start or stop.
 */
function exists(plc, isEndpoint) {
    for(var i=0; i<waypoint.length; i++) { //loop through waypoints
        if(waypoint[i]['formatted_address'] == plc['formatted_address']) {
            alert("Address:\n" + "'" + waypoint[i]['formatted_address'] + "'\nis already a waypoint!\n");
            return true;
           }
    }
    
    //check that the potential waypoint isn't the same as the start or end
    if(!isEndpoint && ((typeof start !='undefined' && start['formatted_address'] == plc['formatted_address'])
      || (typeof end !='undefined' && end['formatted_address'] == plc['formatted_address']))) {
        alert("Address:\n" + "'" + plc['formatted_address'] + "'\nis your start or end point!\n");
        return true;
    }
    return false; //working :D!
    
}

//:::JQUERY:::
$(document).ready(function() {
    console.log('jquery ready');
    $('#ham').click(function(){
        var panel = $("#directionsPanel");
        console.log("ham button click");
        
        if(!panel.hasClass('disabled')) {//if not disabled
            panel.toggleClass('hidden');
        }
        
//        $("#directionsPanel").animate({
//            left: '0px'
//        }, 200);
    });
});