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
            console.log(results[0].geometry.location.lat())
            console.log(results[0].geometry.location.lng())
            document.getElementById('location').innerHTML = results[0].geometry.location;
            map.setCenter(results[0].geometry.location);
            map.setZoom(17);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

    
}

document.querySelector('#doit').addEventListener('click', doItButtonClicked);