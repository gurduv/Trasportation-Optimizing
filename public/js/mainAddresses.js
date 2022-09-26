import {idArr, fullnameArr, nameArr, surnameArr, streetArr, numberArr, cityArr, phoneArr, fullAddressArr, jumboAddressArr} from "./addresses.js";


function doItButtonClicked() {
    
    var selectElement = document.querySelector('#bus_array');
    var outputIndex = selectElement.selectedIndex;
    //document.getElementById('output').innerHTML = outputIndex;

    // clear table before adding new addresses
    for (var i = 0; i <10; i++) {
                var j=i+1;
                document.getElementById('address'+j).innerHTML = "";
                document.getElementById('name'+j).innerHTML = "";
                document.getElementById('phone'+j).innerHTML = "";
    }


    var geocoder = new google.maps.Geocoder();
    //placeidArr = [];
    var placeidArr = new Array();
    var urlString;
    
    for (let i = 0; i < jumboAddressArr[0][outputIndex].length; i ++) {
        
        setTimeout( function () {
                var j=i+1;

        var address = jumboAddressArr[0][outputIndex][i];
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //console.log(results[0].geometry.location.lat())
                //console.log(results[0].geometry.location.lng())
                console.log(results[0].place_id);
                var navURL = "https://www.google.com/maps/dir/?api=1&destination=" + jumboAddressArr[0][outputIndex][i] + "&destination_place_id=" + results[0].place_id + "&travelmode=driving";
                console.log(navURL);

                var nav = document.getElementById('nav'+j);
                nav.href = navURL;

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


    console.log(jumboAddressArr[0][outputIndex].length);
    for (let i = 0; i < jumboAddressArr[0][outputIndex].length; i ++) {
        var j=i+1;
        document.getElementById('address'+j).innerHTML = jumboAddressArr[0][outputIndex][i];
        console.log(jumboAddressArr[0][outputIndex][i]);

        for (let k=0; k < idArr.length; k++) {
            
            if (jumboAddressArr[0][outputIndex][i] == fullAddressArr[k]) {
                //console.log("k is " + fullAddressArr[k] + k);
                //console.log("k name is " + fullnameArr[k] + k);
                document.getElementById('name'+j).innerHTML = fullnameArr[k];
                document.getElementById('phone'+j).innerHTML = phoneArr[k];
            }
        }
    }


    //try to optimize arrays of addresses - placeidArr
    // ??
    var optimizeWaypoints='';
            setTimeout( function () {
            console.log(placeidArr.length);
            for (var i = 1; i < placeidArr.length; i++) {
                optimizeWaypoints += placeidArr[i-1] + "%7Cplace_id%3A";
            }
            optimizeWaypoints = optimizeWaypoints.concat(placeidArr[placeidArr.length-1]);
            console.log(optimizeWaypoints);
                
            var urlOptimize = "https://maps.googleapis.com/maps/api/directions/json?destination=place_id%3AChIJwyldiQg2HRURx-FEiADtZPA&origin=place_id%3AChIJ41SEZPhJHRUR7snt28fabB0&waypoints=optimize%3Atrue%7Cplace_id%3A" + optimizeWaypoints + "&key=AIzaSyAHYcspx40UvnTRuW0YvgVMjBsHrQ9h-aM";
            console.log(urlOptimize);

            fetch(urlOptimize, { mode: 'no-cors'});

                

    },2500);



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
                
            // var a = document.getElementById('resultroute');
            // a.href = url;
            document.getElementById("resultroute").src = url;


    },1500);


}

document.querySelector('#doit').addEventListener('click', doItButtonClicked);