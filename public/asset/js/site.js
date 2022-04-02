
window.onload = function() {
    menu();
          // fetches current player's email 
    function menu() {

    em = getCookie('email')
      function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    
   
}
// fetches player data 
function httpGet(theUrl)
{
  // get request
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
// gs is game data
    gs = httpGet("/getGame");
// ts is player data
    ts = httpGet("/GETGET");
    //grabs specific player's data (without password)
var currentPlayer = JSON.parse(ts).filter(function (entry) {
    return entry.email === em;
});
//grabs specific players game data
var curpl = JSON.parse(gs).filter(function(entr){
  return entr.email === em;
});
// adds player name to welcome message
document.getElementById("demo").insertAdjacentHTML("beforeend",(currentPlayer[0].name));
// adds high score and win count to page
document.getElementById("do").insertAdjacentHTML("beforeend",(curpl[0].high_score));
document.getElementById("win").insertAdjacentHTML("beforeend",(curpl[0].no_wins));

// fetches some fun motivational quotes
fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  var item = data[Math.floor(Math.random()*data.length)];
  document.getElementById('quotes').innerHTML = ("Quote Of The Day:" + "<br><br>" + JSON.stringify(item.text) + "<br>" + " - " + JSON.stringify(item.author)) ;
  });
  
 
}}
// calls the login function
function signIn() {
  var data = {
    email: document.forms[0].elements[0].value,
    password: document.forms[0].elements[1].value
  };
  $.ajax({
    type: 'POST',
    url: '/login',
    data,
    success: function (data) {
      window.location.replace('/menu.html');
    },
    error: function (xhr) {
      document.getElementById("errmsg").innerHTML = "Login failed: please check your details"
    }
  });

}
// calls logout
function logout(){
  $.ajax({
    type: 'POST',
    url: '/logout',
    success: function (data) {
      window.location.replace('/index.html');
    },
    error: function (xhr) {
    }
  });
}
// calls signup
function signUp() {
  var data = {
    email: document.forms[0].elements[0].value,
    password: document.forms[0].elements[1].value,
    name: document.forms[0].elements[2].value
  };
  $.ajax({
    type: 'POST',
    url: '/signup',
    data,
    success: function (data) {
      window.location.replace('/index.html');
    },
    error: function (xhr) {
     
      document.getElementById("errmsg").innerHTML = "Sign Up failed: please check your details"
  
    }
  });
}


