import {idArr, fullnameArr, nameArr, surnameArr, streetArr, numberArr, cityArr, phoneArr, fullAddressArr} from "./employees.js";

var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 32, lng: 35},
      zoom: 9,
      styles: [{
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]  // Turn off points of interest.
      }, {
        featureType: 'transit.station',
        stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
      }],
      disableDoubleClickZoom: true,
      streetViewControl: false
    });

function doItButtonClicked() {
    
    var selectElement = document.querySelector('#employees_array');
    var outputIndex = selectElement.selectedIndex;
    document.getElementById('output').innerHTML = outputIndex;

    console.log(nameArr[outputIndex]);
    console.log(idArr[outputIndex]);
    document.getElementById('worker_id').innerHTML = idArr[outputIndex];
    document.getElementById('name').innerHTML = nameArr[outputIndex];
    document.getElementById('surname').innerHTML = surnameArr[outputIndex];
    document.getElementById('street_name').innerHTML = streetArr[outputIndex];
    document.getElementById('street_code').innerHTML = numberArr[outputIndex];
    document.getElementById('city_name').innerHTML = cityArr[outputIndex];
    document.getElementById('tel').innerHTML = phoneArr[outputIndex];

    document.getElementById('resultFullname').innerHTML = fullnameArr[outputIndex];
    document.getElementById('resultAddress').innerHTML = fullAddressArr[outputIndex];
    
    var geocoder = new google.maps.Geocoder();
    var address = fullAddressArr[outputIndex];
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("Lat: " + results[0].geometry.location.lat())
            console.log("Long: " + results[0].geometry.location.lng())
            console.log(results[0].place_id);

            document.getElementById('location').innerHTML = results[0].geometry.location;
            document.getElementById('placeID').innerHTML = results[0].place_id;


            var wazeUrl = "https://waze.com/ul?q=" + results[0].geometry.location.lat() + "," + results[0].geometry.location.lng() + "&navigate=yes&zoom=17";
            console.log(wazeUrl);
            // document.getElementById("wazeLink").src = wazeUrl;
            var a = document.getElementById('wazeLink');
            a.href = wazeUrl;

            map.setCenter(results[0].geometry.location);
            map.setZoom(17);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                clickable: true,
                title: fullAddressArr[outputIndex] + "\nלחץ לניווט ליעד",
                draggable: false,
                url: "https://www.google.com/maps/dir/?api=1&destination=המייסדים%201%20שואבה&destination_place_id=" + results[0].place_id + "&travelmode=driving"
            });

        google.maps.event.addListener(marker, "click", () => {
        window.open(marker.url, '_blank');
        });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

document.querySelector('#doit').addEventListener('click', doItButtonClicked);