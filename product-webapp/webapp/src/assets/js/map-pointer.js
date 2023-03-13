
var source, destination;
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  google.maps.event.addDomListener(window, 'load', function () {
   
      new google.maps.places.SearchBox(document.getElementById('txtSource'));
      new google.maps.places.SearchBox(document.getElementById('txtDestination'));
      directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
  });
   
  function GetRoute() {
    var bangalore = new google.maps.LatLng(12.9716, 77.5946);
    var mapOptions = {
        zoom:15,
        center: bangalore
    };
      map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('dvPanel'));
   
      // //*********DIRECTIONS AND ROUTE**********************//
      source = document.getElementById("txtSource").value;
      destination = document.getElementById("txtDestination").value;
   
      var request = {
          origin: source,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
          }
      });
   
      //*********DISTANCE AND DURATION**********************//
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
          origins: [source],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
      }, function (response, status) {
          if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
              var distance = response.rows[0].elements[0].distance.text;
              var duration = response.rows[0].elements[0].duration.text;
              var dvDistance = document.getElementById("dvDistance");
              var price = document.getElementById("price");

             dvDistance.innerHTML = "";
              dvDistance.innerHTML += "Distance : " + distance + " ";
              dvDistance.innerHTML += "      Duration : " + duration + "<br />";
              dvDistance.innerHTML += "Average Price : " +Number(distance.split(' ')[0])*6 + " Rs";
          } else {
              alert("Unable to find the distance via road.");
          }
      });
      
  }


  $(document).ready(function(){
    GetRoute();
  })

//   function myStopFunction() {
//     clearTimeout(myTimeout);
//   }