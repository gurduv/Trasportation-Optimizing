import {idArr, fullnameArr, nameArr, surnameArr, streetArr, numberArr, cityArr, phoneArr, fullAddressArr, jumboAddressArr} from "./addresses.js";

// var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: 32, lng: 35},
//       zoom: 9,
//       styles: [{
//         featureType: 'poi',
//         stylers: [{ visibility: 'off' }]  // Turn off points of interest.
//       }, {
//         featureType: 'transit.station',
//         stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
//       }],
//       disableDoubleClickZoom: true,
//       streetViewControl: false
//     });


function doItButtonClicked() {
    
    var selectElement = document.querySelector('#bus_array');
    var outputIndex = selectElement.selectedIndex;
    //document.getElementById('output').innerHTML = outputIndex;



    //console.log(jumboAddressArr[0][outputIndex].length);
    for (let i = 0; i < jumboAddressArr[0][outputIndex].length; i ++) {
        var j=i+1;
        document.getElementById('address'+j).innerHTML = jumboAddressArr[0][outputIndex][i];
        //console.log(jumboAddressArr[0][outputIndex][i]);
    }

    var geocoder = new google.maps.Geocoder();
    //placeidArr = [];
    var placeidArr = new Array();
    var urlString;

    for (let i = 0; i < jumboAddressArr[0][outputIndex].length; i ++) {
        setTimeout( function () {

        var address = jumboAddressArr[0][outputIndex][i];
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //console.log(results[0].geometry.location.lat())
                //console.log(results[0].geometry.location.lng())
                //console.log(results[0].place_id);

                placeidArr.push(results[0].place_id);
                //document.getElementById('location').innerHTML = results[0].geometry.location;
                //document.getElementById('placeID'+i).innerHTML = results[0].place_id;

            } else {
                //alert('Geocode was not successful for the following reason: ' + status);
                console.log('Geocode was not successful for the following reason: ' + status);
                console.log('Cannot find Geocode for:' + address);
            }
        });
         },1000);
    }
    
    console.log(placeidArr);

    var urlString='';
        setTimeout( function () {
            console.log(placeidArr.length);
            for (var i = 1; i < placeidArr.length; i++) {
                urlString += placeidArr[i-1] +"%2C";
            }
            urlString = urlString.concat(placeidArr[placeidArr.length-1]);
            console.log(urlString);
                
            var url = "https://transportation-optimizing.web.app/optRoute/index.html?waypoint=" + urlString;
            console.log(url);
                
                // (C) WHATEVER COMES NEXT...
                // REDIRECT OR AJAX CALL OR FETCH
                // window.location.href = url;
                var a = document.getElementById('resultroute');
                a.href = url;


    },3500);

    //console.log(urlString);

    // setTimeout( function () {
    //             // (A) URL SEARCH PARAMS OBJECT TO QUICKLY BUILD QUERY STRING
    //             var query = new URLSearchParams({
    //             waypoint : placeidArr[3], 
    //             });
    //             query.append("KEY", "VALUE"); // To append more data
                
    //             // (B) CONVERT TO STRING, APPEND TO URL
    //             var url = "http://127.0.0.1:5500/public/optRoute/index.html?" + query.toString();
    //             console.log(url);
                
    //             // (C) WHATEVER COMES NEXT...
    //             // REDIRECT OR AJAX CALL OR FETCH
    //             // window.location.href = url;
    // },2000);




}

document.querySelector('#doit').addEventListener('click', doItButtonClicked);