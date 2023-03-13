window.onload=function(){
var hamburger = document.getElementById("nav-icon");

       if(hamburger){
        hamburger.addEventListener("click", function(){
            document.querySelector(".side-nav-list").classList.toggle("slide-in");
            document.querySelector(".hamburger").classList.toggle("close");
        });        
       }
    }