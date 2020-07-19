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
    spaces[i].addEventListener("touchstart", function(e){
      first=[this.value,e.touches[0].screenX,e.touches[0].screenY];
      console.log(first)

    },false);
    spaces[i].addEventListener("touchmove", function(e){
      if(first!=null){
        second=[this.value,e.touches[0].screenX,e.touches[0].screenY];
        console.log(second)
        var secondSquare=chooseSecond(first,second)
        var img = this.innerHTML;
        this.innerHTML = spaces[secondSquare].innerHTML;
        spaces[secondSquare].innerHTML=img;
        first=null;
        second=null;
      }

    },false);
    image.setAttribute("src",names[Math.floor(Math.random()*6)]);
    spaces[i].appendChild(image)
    document.getElementById("game").appendChild(spaces[i]);
  }


}
function chooseSecond(firstLoc,secondLoc){
  var difX = first[1]-second[1]
  var difY = first[2]-second[2]
  console.log(difX)
  console.log(difY)
  if(Math.abs(difX)>Math.abs(difY)){
    if (first[1]>second[1]){
      return Number(first[0])-1;
    }else{
      return Number(first[0])+1;
    }
  }else{
    if(first[2]>second[2]){
      return Number(first[0])-8;
    }else{
      return Number(first[0])+8;
    }
  }
}
