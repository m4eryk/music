var today= new Date;


var options = {
    month: 'long',
    day: 'numeric',
  };

var el = document.getElementById("day"); 
    el.innerHTML =" "+ today.toLocaleString("ru", options);