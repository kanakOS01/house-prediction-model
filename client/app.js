function getBathValue() {
  var bathroomOptions = document.getElementsByName("bathroomOptions");
  for(var i in bathroomOptions) {
    if(bathroomOptions[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var bhkOptions = document.getElementsByName("bhkOptions");
  for(var i in bhkOptions) {
    if(bhkOptions[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("area");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("locationSelect");
  var output = document.getElementById("output");

  // var url = "http://127.0.0.1:5000/get_prediction";
  var url = "/api/get_prediction";
  event.preventDefault();
  console.log("Sending request to server...");
  console.log("Total Sqft:", parseFloat(sqft.value));
  console.log("BHK:", bhk);
  console.log("Bathrooms:", bathrooms);
  console.log("Location:", location.value);

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  }, function(data, status) {
      console.log("Received response from server");
      console.log("Estimated Price:", data.price);
      output.innerHTML = "<h2>" + data.price.toString() + " Lakh</h2>";
      console.log("Status:", status);
  });
}

function onPageLoad() {
    console.log("document loaded");

    // var url = "http://127.0.0.1:5000/get_loc_names";
    var url = "/api/get_loc_names";
    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var locationSelect = document.getElementById("locationSelect");
            $('#locationSelect').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#locationSelect').append(opt);
            }
        }
    });

    getBathValue();
}

window.onload = onPageLoad;