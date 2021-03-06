// This fetches the game data from the backend upon loading of the skill tree page
window.onload = function() {
    var unitData, emailData, data = loadin();
    function loadin(){
        $.ajax({
            type: 'GET',
            url: '/getGame',
            data,
            success: function(data) {
                // loops through the array of game data for each user
                for(var i = 0; i < data.length; i++){
                   var emme = ('"' + getCookie('email') +'"');
                    var emem = JSON.stringify(data[i].email);
                    //compares the email stored in cookie with each game data document
                    if(emme == emem){
                        // assigns values to the required parts of the document
                       unitData = data[i].units;
                       emailData = data[i].email;
                       linkedinLinks = data[i].links;
                    unitArr = Object.values(unitData);
                    }
                    
                }
                //loops through each unit in the units array of the gamedata document
                for(var b = 0; b<unitArr.length; b++){
                    //checks unlock staus of unit
                    if(unitArr[b] == 1){
                        let c = b+1;
                        var d =  c.toString();
                        //formats unit number into two formats for changing elements by class and id
                        var ids = ("1." + d);
                        var idsMessage = ("11." + d);
                        // changes skilltree box bg colour
                        document.getElementById(ids).style.backgroundColor = "#89baff";
                        // shows 'unlocked' message
                        document.getElementById(idsMessage).style.display = "inline";
                        // hides link submission form
                        element = document.getElementsByClassName(ids);
                        for (var i = 0; i < element.length; i ++) {
                            element[i].style.visibility = 'hidden';
                        }
                    } 
                }
                return unitData, emailData, data;
            },
            error: function(xhr) {
            }
        });
    }
}
var unitData, emailData, data;

$.ajax({
    type: 'GET',
    url: '/getGame',
    data,
    success: function(data) {
        for(var i = 0; i < data.length; i++){
           var emme = ('"' + getCookie('email') +'"');
            var emem = JSON.stringify(data[i].email);
            if(emme == emem){
               unitData = data[i].units;
               emailData = data[i].email;
               linkedinLinks = data[i].links;
            unitArr = Object.values(unitData);
            }
            
        }
        for(var b = 0; b<unitArr.length; b++){
            if(unitArr[b] == 1){
                let c = b+1;
                var d =  c.toString();
                var ids = ("1." + d);
                var idsMessage = ("11." + d);
                document.getElementById(ids).style.backgroundColor = "#89baff";
                document.getElementById(idsMessage).style.display = "inline";
                element = document.getElementsByClassName(ids);
                for (var i = 0; i < element.length; i ++) {
                    element[i].style.visibility = 'hidden';
                }
            } 
        }

    },
    error: function(xhr) {
    }
});



function unlock(linkNo){
    linkval = linkNo-1;
    //assigns value to corresponding array location of unit that is being unlocked
    unitData[linkval] = 1
    //packages up user details and posted link for post function
    var data = {
      user: getCookie('email'),
      key: linkval,
      value: document.getElementById(linkNo).value,
      units : unitData
    }
   // checks through list of user posted links to discount duplicates
    auth = true;
    for(let i=0; i<linkedinLinks.length; i++){
        if (data.value == linkedinLinks[i]){
            auth = false;
        }
    }
    if (auth)
    {
        $.ajax({
            type: 'POST',
            url: '/submitbadge',
            data: {data:JSON.stringify(data)},
            success: function (data) {
                // reads response from server operation which checks validity of link
                var response = JSON.stringify(data.message);
                
                if (response.includes('Invalid')){
                    document.getElementById("errmsg").innerHTML = "Link is invalid";
                    setTimeout(() => {location.reload(); }, 1000);
                }
                else{
                    console.log("oops");
                    setTimeout(() => {location.reload(); }, 1000);
                }
                
                
                
                
            },
            error: function (xhr) {
              document.getElementById("errmsg").innerHTML = "Server Error"
            }});
       
    }
    else{
        document.getElementById("errmsg").innerHTML = "Invalid Link";
        setTimeout(() => {location.reload(); }, 1000);
    }
    
  }


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