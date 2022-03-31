let unitData, data;

$.ajax({
    type: 'GET',
    url: '/getGame',
    data,
    success: function(data) {
        for(var i = 0; i < data.length; i++){
            console.log(data[i].email);
            if(data[i].email == getCookie('email')){
               unitData = data[i].units;
            }
        }
    },
    error: function(xhr) {
    console.log(xhr);
    }
});


function unlock(linkNo){
    console.log(linkNo + "sfn")
    for(let d = 0; d<unitData.length; d++){
        if (d == linkNo){
            unitData[linkNo-1] = 1;
        }


    }
    var data = {
      user: getCookie('email'),
      key: linkNo,
      value: document.getElementById(linkNo).value,
      units : JSON.stringify(unitData)
    }
    if (data.value.includes("linkedin"))
    {
        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/submitbadge',
            data,
            success: function (data) {
                document.getElementById("errmsg").innerHTML = "Succesfully Unlocked Badge";
            },
            error: function (xhr) {
              document.getElementById("errmsg").innerHTML = "Server Error"
            }});
       
    }
    else{
        document.getElementById("errmsg").innerHTML = "Invalid Link";
    }
    
  }


function checkunlocks(){

   
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