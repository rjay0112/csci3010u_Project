var names=["archie.jpg","betty.jpg","cheryl.jpg",
"jughead.jpg","toni.jpg","veronica.jpg"];
var spaces=[];
var borderColors = ["orange","magenta","red","blue","purple","green"]
var first;
var second;
var toDelete=[];
var locations=[];

function loadGame() {
  document.getElementById("start").disabled=true;
  for (i=0;i<8;i++){
    for (j=0;j<8;j++){
      locations.push([j*80,100+i*80]);
    }
  }
  console.log(locations)
  for (i=0;i<64;i++){
    spaces[i] = document.createElement("IMG");
    spaces[i].value=i;
    spaces[i].addEventListener("touchstart", function(e){
      first=[this.value,e.touches[0].screenX,e.touches[0].screenY];
      //console.log(first)
    },false);
    spaces[i].addEventListener("touchmove", function(e){
      if(first!=null){
        second=[this.value,e.touches[0].screenX,e.touches[0].screenY];
        //console.log(second)
        var secondSquare=chooseSecond(first,second)
        var img = this.getAttribute("src");
        var back = this.style.borderColor;
        this.setAttribute("src",spaces[secondSquare].getAttribute("src"));
        this.style.borderColor=spaces[secondSquare].style.borderColor
        spaces[secondSquare].setAttribute("src",img);
        spaces[secondSquare].style.borderColor=back;
        let change = moveCheck()
        if(change==0){
          setTimeout(() => {
            img = this.getAttribute("src")
            back = this.style.borderColor
            this.setAttribute("src",spaces[secondSquare].getAttribute("src"));
            this.style.borderColor=spaces[secondSquare].style.borderColor
            spaces[secondSquare].setAttribute("src",img);
            spaces[secondSquare].style.borderColor=back
          }, 300);
        }else{
          while(change>0){
            //setTimeout(() => {
              console.log("hiii")
              change=moveCheck();
            //}, 300);
          }
        }
        first=null;
        second=null;

      }

    },false);
    let rand = Math.floor(Math.random()*6);
    spaces[i].setAttribute("src",names[rand]);
    spaces[i].style.borderColor=borderColors[rand];
    document.getElementById("game").appendChild(spaces[i]);
    spaces[i].style.position="absolute"
    spaces[i].style.left=locations[i][0]+"px"
    spaces[i].style.top=locations[i][1]+"px"
  }
  let counts=0;
  counts = moveCheck();
  //while(counts>0){
    //counts=moveCheck();
  //}


}


function moveCheck(){
  for(i=0;i<8;i++){
    for(j=0;j<6;j++){
      firsts = spaces[i*8+j].getAttribute("src")
      seconds = spaces[i*8+j+1].getAttribute("src")
      thirds = spaces[i*8+j+2].getAttribute("src")
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
      firsts = spaces[i*8+j].getAttribute("src")
      seconds = spaces[(i+1)*8+j].getAttribute("src")
      thirds = spaces[(i+2)*8+j].getAttribute("src")
      if(firsts==seconds && firsts == thirds){
        console.log("pair")
        toDelete.push(spaces[i*8+j].value)
        toDelete.push(spaces[(i+1)*8+j].value)
        toDelete.push(spaces[(i+2)*8+j].value)
      }
    }
  }
  //console.log(toDelete)
  let tmp = [... new Set(toDelete)]
  for(i=0;i<tmp.length;i++){
    //console.log(tmp[i])
    //console.log(spaces[Number(tmp[i])])
    spaces[Number(tmp[i])].setAttribute("src","blank.jpg");
    spaces[Number(tmp[i])].style.borderColor="white"
  }
console.log("THIS IS NEW")
  for(i=7;i>0;i--){
    for(j=7;j>=0;j--){
      if(spaces[i*8+j].getAttribute("src")=="blank.jpg"){
        count=1;
        while(i-count>=0&&spaces[(i-count)*8+j].getAttribute("src")=="blank.jpg"){
          count++;
        }
        if(i-count>=0){
          //paces[i*8+j].style.transitionProperty="top"
          //spaces[i*8+j].style.transitionDuration="0s"
          tmps = spaces[(i-count)*8+j].getAttribute("src");
          tmp2 = spaces[(i-count)*8+j].style.borderColor;
          spaces[(i-count)*8+j].style.top=locations[i*8+j][1]+"px"
          /*spaces[(i-count)*8+j].setAttribute("src",spaces[i*8+j].getAttribute("src"));
          spaces[(i-count)*8+j].style.borderColor=spaces[i*8+j].style.borderColor;
          spaces[i*8+j].style.top=locations[(i-count)*8+j][1]+"px"
          spaces[i*8+j].style.transitionDuration="2.5s"
          console.log(spaces[i*8+j].style.top,i*8+j)
          spaces[i*8+j].setAttribute("src",tmps);
          spaces[i*8+j].style.borderColor=tmp2;
          spaces[i*8+j].style.top=locations[i*8+j][1]+10+"px"*/
          console.log(spaces[i*8+j].style.top)


        }

        //console.log(i*8+j)
      }
    }
  }


  for(i=0;i<64;i++){
    if(spaces[i].getAttribute("src")=="blank.jpg"){
      let rand = Math.floor(Math.random()*6);
      spaces[i].setAttribute("src",names[rand])
      spaces[i].style.borderColor=borderColors[rand];
    }
  }
  let valStore = toDelete.length;
  toDelete=[];
  return valStore;
}



function chooseSecond(firstLoc,secondLoc){
  var difX = first[1]-second[1]
  var difY = first[2]-second[2]
  //console.log(difX)
  //console.log(difY)
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
/*
make ar

tiles flipping
pair checking
movements





*/
