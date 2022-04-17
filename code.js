var names=["archie.jpg","betty.jpg","cheryl.jpg",
"jughead.jpg","toni.jpg","veronica.jpg"];
var spaces = []
var vLabels = []
var hLabels = []
var boardH;
var boardW;
var numClicked;
var errors;
var hasStarted=false

function createBoard(){
  if(hasStarted){
    location.reload()
  }else{
    hasStarted=true
  }
  document.getElementById("start").innerHTML="Restart"
  boardW = document.getElementById("width").value
  boardH = document.getElementById("height").value
  numClicked=0
  errors=0
  var statsElement = document.getElementById("stats")
  var progressStat = document.createElement("h2")
  progressStat.innerHTML="0% Complete"
  var errorStat = document.createElement("h2")
  errorStat.innerHTML = "0 Error(s)"
  statsElement.appendChild(progressStat)
  statsElement.appendChild(errorStat)
  var gameTable = document.getElementById("game")
  var headerRow = document.createElement("tr")
  var topLeftcell = document.createElement("td")
  topLeftcell.style.width=(boardW/1.1)+"vh"
  topLeftcell.style.textAlign="right"
  headerRow.appendChild(topLeftcell)
  for (i=0;i<boardW;i++){
    hLabels[i] = document.createElement("td")
    hLabels[i].innerHTML = i
    headerRow.appendChild(hLabels[i])
  }

  document.getElementById("game").appendChild(headerRow)
  for (var i=0;i<boardW;i++){
    var curRow = document.createElement("tr")
    vLabels[i] = document.createElement("td")
    vLabels[i].innerHTML = i
    vLabels[i].style.width=(boardW/1.1)+"vh"
    vLabels[i].style.textAlign="right"
    curRow.appendChild(vLabels[i])
    spaces[i]=new Array(boardH)
    for (var j=0;j<boardH;j++){
      spaces[i][j]=[]
      spaces[i][j][0]=document.createElement("BUTTON");
      spaces[i][j][0].classList.add('gameButton');
      spaces[i][j][1]=Math.floor(Math.random()+0.5)
      spaces[i][j][2]=i+","+j
      spaces[i][j][0].id=i+","+j
      spaces[i][j][0].innerHTML=" "//spaces[i][j][1]
      spaces[i][j][0].style.width=(50/boardW)+"vh"
      spaces[i][j][0].style.height=(50/boardW)+"vh"
      spaces[i][j][0].style.background='#FFFFFF'
      spaces[i][j][0].addEventListener("mouseover",function(){
        this.style.background = "#DDDDDD";
    });
    spaces[i][j][0].addEventListener("mouseout",function(){
        this.style.background = "#ffFFFF";
    });
      var tableData = document.createElement("td")
      tableData.appendChild(spaces[i][j][0])
      curRow.appendChild(tableData)
      //document.getElementById("game").appendChild(spaces[i][0])
    }
    document.getElementById("game").appendChild(curRow)
  }

  setHvalues()
  setVvalues()

  console.log($('.gamebutton'))
  console.log($('.gameButton'))

  $('.gameButton').on("mousedown", function(event){
    console.log(event.which)
    var clickedID = event.target.id
    for (i=0;i<boardW;i++){
      for (j=0;j<boardH;j++){
        if(clickedID==spaces[i][j][2]){
          if(spaces[i][j][1]==1 && event.which==3){
            spaces[i][j][0].innerHTML="X"
            errors+=1
          }else if (spaces[i][j][1]==0 && event.which==1){
            spaces[i][j][0].innerHTML="X"
            errors+=1
          }else if(spaces[i][j][1]==1 && event.which==1){
            spaces[i][j][0].innerHTML=""
          }else if (spaces[i][j][1]==0 && event.which==3){
            spaces[i][j][0].innerHTML=""
          }
          if (spaces[i][j][1]==1){
            spaces[i][j][0].style.background='#22EEEE'
            spaces[i][j][0].disabled=true
            numClicked+=1
          }else if (spaces[i][j][1]==0){
            spaces[i][j][0].style.background='#EEEEEE'
            spaces[i][j][0].disabled=true
            numClicked+=1
          }
          progressStat.innerHTML=Math.round((numClicked*100)/(boardW*boardH))+"% Complete"
          errorStat.innerHTML = errors+" Error(s)"
          if (numClicked==boardH*boardW){
            document.getElementById("Title").innerHTML="CONGRATULATIONS!"
            setTimeout(function() {
              document.getElementById("Title").innerHTML="YOU"
              setTimeout(function() {
                document.getElementById("Title").innerHTML="YOU ARE"
                setTimeout(function() {
                  document.getElementById("Title").innerHTML="YOU ARE A"
                  setTimeout(function() {
                    document.getElementById("Title").innerHTML="YOU ARE A WINNER"
                    setTimeout(function() {
                      document.getElementById("Title").innerHTML="YOU ARE A WINNER!!!!!!!!!!"
                    }, 1000);
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1250);
          }
        }
      }
    }
    console.log(event.target.id)
    if (event.which==1){
      console.log("left")
      document.getElementById(event.target.id)
    }else if (event.which==3){
      console.log("right")
    }
  });

}

function setHvalues(){
  curCount=0
  for (var i=0;i<boardH;i++){
    counts = ""
    for (var j=0;j<boardW;j++){
      if (spaces[j][i][1]>0){
        curCount+=1
      }else{
        if(curCount>0){
          counts+=curCount + "<br> "
          curCount=0
        }
      }
    }
    if(curCount>0){
      counts+=curCount + "<br>"
        curCount=0
    }
    hLabels[i].innerHTML=counts
  }
}
function setVvalues(){
  var curCount=0
  for (var i=0;i<boardW;i++){
    var counts = ""
    for (var j=0;j<boardH;j++){
      if (spaces[i][j][1]>0){
        curCount+=1
      }else{
        if(curCount>0){
          counts+=curCount + "  "
          curCount=0
        }
      }
    }
    if(curCount>0){
      counts+=curCount + "  "
        curCount=0
    }
    vLabels[i].innerHTML=counts
  }
}