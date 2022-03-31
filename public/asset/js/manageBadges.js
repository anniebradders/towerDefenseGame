
var unitData, emailData, data;

$.ajax({
    type: 'GET',
    url: '/getGame',
    data,
    success: function(data) {
        console.log(data.length);
        for(var i = 0; i < data.length; i++){
            console.log(data);
           var emme = ('"' + getCookie('email') +'"');
           console.log(emme);
            var emem = JSON.stringify(data[i].email);
            console.log(emem);
            if(emme == emem){
               unitData = data[i].units;
               emailData = data[i].email;
               console.log( "unitFromUUnitGet" + unitData);
            unitArr = Object.values(unitData);
            console.log("arrayoj" + unitArr[0]);
            console.log(typeof(unitData));
            }
            
        }
        for(var b = 0; b<10; b++){
            if(unitArr[b] == 1){
                console.log("True");
                let c = b+1;
                var d =  c.toString();
                var ids = ("1." + d);
                var idsMessage = ("11." + d);
                console.log(ids);
                document.getElementById(ids).style.backgroundColor = "#4b96ff";
                document.getElementById(idsMessage).style.display = "inline";
                element = document.getElementsByClassName(ids);
                for (var i = 0; i < element.length; i ++) {
                    element[i].style.visibility = 'hidden';
                }
                console.log(element);
            } 
        }

    },
    error: function(xhr) {
    console.log(xhr);
    }
});



function unlock(linkNo){
    linkval = linkNo-1;
  //  var tests = JSON.parse(unitData);
    
    for(let d = 0; d<10; d++){
        if (d == linkval){
            console.log(d);
            unitData[d] = 1;
           // tests[d] = 1;
            
    }}
   // console.log(tests)
   console.log(unitData)
    console.log(getCookie('email'));
    var data = {
      user: getCookie('email'),
      key: linkNo,
      value: document.getElementById(linkNo).value,
      units : unitData
    }
    if ((data.value.includes("www.linkedin.com/in")) || (data.value.includes("linkedin") ))
    {
        console.log("before post data " + data.units);
        $.ajax({
            type: 'POST',
            url: '/submitbadge',
            data: {data:JSON.stringify(data)},
            success: function (data) {
                document.getElementById("errmsg").innerHTML = "Succesfully Unlocked Badge";
                location.reload();
            },
            error: function (xhr) {
              document.getElementById("errmsg").innerHTML = "Server Error"
            }});
       
    }
    else{
        document.getElementById("errmsg").innerHTML = "Invalid Link";
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