var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=a8902e6d6ae5f8d8bfbe53e78707c643";
var city = $(".cityName").val()

$.ajax({
  url: queryUrl,
  method:"get"
})

.then(function(response){
console.log (response)
})