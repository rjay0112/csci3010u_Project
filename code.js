var names=["archie.jpg","betty.jpg","cheryl.jpg",
"jughead.jpg","toni.jpg","veronica.jpg"];
var spaces=[];
var options = ["a","b","c","d","e","f"]
var first;
var second;
var toDelete=[];

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
        moveCheck()
        first=null;
        second=null;

      }

    },false);
    image.setAttribute("src",names[Math.floor(Math.random()*6)]);
    spaces[i].appendChild(image)
    document.getElementById("game").appendChild(spaces[i]);
  }


}


function moveCheck(){
  for(i=0;i<8;i++){
    for(j=0;j<6;j++){
      firsts = spaces[i*8+j].children[0].getAttribute("src")
      seconds = spaces[i*8+j+1].children[0].getAttribute("src")
      thirds = spaces[i*8+j+2].children[0].getAttribute("src")
      //console.log(spaces[i*8+j].children[0].getAttribute("src"))
      //console.log(firsts)
      if(firsts==seconds && firsts == thirds){
        console.log("pair")
        toDelete.push(spaces[i*8+j].value)
        toDelete.push(spaces[i*8+j+1].value)
        toDelete.push(spaces[i*8+j+2].value)
      }
    }
  }
  for(i=0;i<6;i++){
    for(j=0;j<8;j++){
      firsts = spaces[i*8+j].children[0].getAttribute("src")
      seconds = spaces[(i+1)*8+j].children[0].getAttribute("src")
      thirds = spaces[(i+2)*8+j].children[0].getAttribute("src")
      if(firsts==seconds && firsts == thirds){
        console.log("pair")
        toDelete.push(spaces[i*8+j].value)
        toDelete.push(spaces[(i+1)*8+j].value)
        toDelete.push(spaces[(i+2)*8+j].value)
      }
    }
  }
  console.log(toDelete)
  let tmp = [... new Set(toDelete)]
  for(i=0;i<tmp.length;i++){
    console.log(tmp[i])
    console.log(spaces[Number(tmp[i])])
    spaces[Number(tmp[i])].children[0].setAttribute("src","blank.jpg");
  }

  for(i=7;i>0;i--){
    for(j=7;j>=0;j--){
      if(spaces[i*8+j].children[0].getAttribute("src")=="blank.jpg"){
        count=1;
        while(i-count>=0&&spaces[(i-count)*8+j].children[0].getAttribute("src")=="blank.jpg"){
          count++;
        }
        if(i-count>=0){
          tmp = spaces[(i-count)*8+j].children[0].getAttribute("src")
          tmp2 = spaces[i*8+j].children[0].getAttribute("src")
          spaces[(i-count)*8+j].children[0].setAttribute("src",tmp2)
          spaces[i*8+j].children[0].setAttribute("src",tmp)
        }

        console.log(i*8+j)
      }
    }
  }
  toDelete=[];
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
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
