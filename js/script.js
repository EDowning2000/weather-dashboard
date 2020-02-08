
function saveToStorage(){
  var city = $(".cityName").val().trim()
localStorage.setItem("city", city)
previousCities()
}

function previousCities(){
  var searchedCities = localStorage.getItem("city")
   var htmlSearchedCities = $("<p>").text(searchedCities)
  $('.sideBar').append(htmlSearchedCities)
}

$(".searchBtn").click(function(event){
  event.preventDefault();
  saveToStorage()
  $(".city").empty()
  $('.temp').empty()
  $('.humidity').empty()
  $(".wind").empty()
  $('.uv').empty()
  var city = $(".cityName").val().trim()
  getWeather(city)
  fiveDayForecast(city)
  $(".badge").empty()
  $(".dailyForecast").empty()
$(".display-4").text(moment().format("MMM Do YY"));
})


function getUVIndex(latitude, longitude){
  var UVqueryUrl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=a8902e6d6ae5f8d8bfbe53e78707c643&lat=" + latitude + "&lon=" + longitude + "&cnt=1"

  $.ajax({
    url: UVqueryUrl, 
    method : "GET"
  })
  .then(function(response){
    console.log(response)
    console.log(response[0].value)
    var UVIndex =response[0].value
    var UVHTML = $(".uv")
    UVHTML.removeClass("badge-success badge-warning badge-danger")

    $('.uv').text("UV Index : "+ UVIndex)

    if (UVIndex <= 2){
      UVHTML.addClass("badge-success");
      $(".uv").append(UVHTML);
  }
  else if (UVIndex > 2&& UVIndex <= 7) {
      UVHTML.addClass("badge-warning");
      $(".uv").append(UVHTML);
  }
  else if (UVIndex >= 8) {
    UVHTML.addClass("badge-danger");
      $(".uv").append(UVHTML);
  }
})}




function getWeather(city){
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +city +"&units=imperial&appid=a8902e6d6ae5f8d8bfbe53e78707c643";

$.ajax({
  url: queryUrl,
  method:"GET"
})
.then(function(response){
  // console.log (response.name)
  // console.log(response)
  $(".city").text(response.name)
  $(".temp").text("Temperature :" +response.main.temp + " degrees");
  $('.humidity').text("Humidity :"+response.main.humidity + " percent");
  $('.wind').text("Wind :"+response.wind.speed + " mph");
  $(".uv").text("UV index :" )
  var latitude = response.coord.lat
  var longitude = response.coord.lon

  getUVIndex(latitude,longitude)
  })
}



function fiveDayForecast (city){
  var fiveDayQueryUrl ="http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=f97dc0c76838152ccccbda66f22dabd4" ;

$.ajax({
  url: fiveDayQueryUrl, 
  method : "GET"
})
.then(function (response){
  console.log(response.list[0]);
  console.log(response);
  
  for (var i = 0; i < response.list.length;i++) {
      
      if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {

        var realTime = response.list[i].dt;
        // date= new Date(realTime *1000 )
          var initialDiv = $("<div>")
          var dayDiv = $("<div>")
          var currentDay = $('<h5>')
          var humidityP = $('<p>')
          var tempP =$('<p>')
          var icon =$("<img>")
                initialDiv.addClass ("card")
                dayDiv.addClass("card-body")
                currentDay.addClass("card-title")
                currentDay.text (moment(realTime, "X").format("MMM Do YY"))
                humidityP.text("Humidity :" + response.list[i].main.humidity + " %")
                tempP.text("Temperature :" + response.list[i].main.temp)
                icon.attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon +".png")

                

                dayDiv.append(currentDay,tempP, humidityP, icon)
                initialDiv.append(dayDiv)
                $(".dailyForecast").prepend(initialDiv)
        
      }   
  }
});
}


