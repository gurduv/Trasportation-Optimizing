import {idArr, fullnameArr, nameArr, surnameArr, streetArr, numberArr, cityArr, phoneArr, fullAddressArr, jumboAddressArr} from "./addresses.js";


function doItButtonClicked() {
    
    var selectElement = document.querySelector('#bus_array');
    var outputIndex = selectElement.selectedIndex;
 

    var geocoder = new google.maps.Geocoder();
    var placeidArr = new Array();
    var urlString;
    
    for (let i = 0; i < jumboAddressArr[0][outputIndex].length; i ++) {
        
        setTimeout( function () {
                var j=i+1;

        var address = jumboAddressArr[0][outputIndex][i];
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // console.log(results[0].geometry.location.lat())
                // console.log(results[0].geometry.location.lng())
                // console.log(results[0].place_id);
                placeidArr.push(results[0].place_id);

            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
                console.log('Cannot find Geocode for:' + address);
            }
        });
         },1500);
    }
    
    console.log(placeidArr);

    //try to optimize arrays of addresses - placeidArr
    // ??
    var optimizeWaypoints='';
            setTimeout( function () {
            // console.log(placeidArr.length);
            for (var i = 1; i < placeidArr.length; i++) {
                optimizeWaypoints += placeidArr[i-1] + "%7Cplace_id%3A";
            }
            optimizeWaypoints = optimizeWaypoints.concat(placeidArr[placeidArr.length-1]);
            // console.log(optimizeWaypoints);
                
            var urlOptimize = "https://maps.googleapis.com/maps/api/directions/json?destination=place_id%3AChIJwyldiQg2HRURx-FEiADtZPA&origin=place_id%3AChIJ41SEZPhJHRUR7snt28fabB0&waypoints=optimize%3Atrue%7Cplace_id%3A" + optimizeWaypoints + "&key=AIzaSyAHYcspx40UvnTRuW0YvgVMjBsHrQ9h-aM";
            console.log(urlOptimize);

                // const myList = document.querySelector('ul');
                // const myRequest = new Request(urlOptimize);

                // fetch(myRequest , { mode: 'no-cors'})
                // .then((response) => response.text())
                // .then((data) => {
                //     console.log(data);
                //     // for (const product of data.routes) {
                //     // const listItem = document.createElement('li');
                //     // listItem.appendChild(
                //     //     document.createElement('strong')
                //     // ).textContent = routes.waypoint_order;
                //     // }
                // })
                // .catch(console.error);


            fetch(urlOptimize,  { mode: 'no-cors'}, { 
            method: 'GET'
            })
            .then(function(response) { 
                console.log(response.json);
                return response.json(); })
            .then(function(json) {
                
                var obj = response.routes[0].waypoint_order;
                console.log(obj);
            });




    },4500);

}

document.querySelector('#doit').addEventListener('click', doItButtonClicked);