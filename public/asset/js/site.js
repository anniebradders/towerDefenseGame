window.onload = function() {
    menu();
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
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
    gs = httpGet("/getGame");
    ts = httpGet("/GETGET");
console.log(ts)
console.log(gs)
var currentPlayer = JSON.parse(ts).filter(function (entry) {
    return entry.email === em;
});
var curpl = JSON.parse(gs).filter(function(entrys){
  return entrys.email === em;
});
currentPlayer[0].password = "";
document.getElementById("demo").insertAdjacentHTML("beforeend",(currentPlayer[0].name));

document.getElementById("do").insertAdjacentHTML("beforeend",(curpl[0].high_score));
document.getElementById("win").insertAdjacentHTML("beforeend",(curpl[0].no_wins));


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