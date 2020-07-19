var names=["archie.jpg","betty.jpg","cheryl.jpg",
"jughead.jpg","toni.jpg","veronica.jpg"];
var spaces=[];
var options = ["a","b","c","d","e","f"]
var first;
var second;

function loadGame() {
  document.getElementById("start").disabled=true;

  for (i=0;i<64;i++){
    spaces[i] = document.createElement("BUTTON");
    spaces[i].value=i;
    var image = document.createElement("IMG");
    spaces[i].onmouseout = function(){
      first=this.value;
    }
    spaces[i].onmouseover = function(){
      if(first!=null){
        second=this.value
        var img = this.innerHTML;
        this.innerHTML = spaces[first].innerHTML;
        spaces[first].innerHTML=img;
        first=null;
        second=null;
      }

    }
    image.setAttribute("src",names[Math.floor(Math.random()*6)]);
    image.setAttribute("draggable","false");
    spaces[i].appendChild(image)
    document.getElementById("game").appendChild(spaces[i]);
  }


}
