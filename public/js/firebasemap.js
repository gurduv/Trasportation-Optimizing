function initMap() {
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
  }