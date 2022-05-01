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
  for (var i=0;i<boardH;i++){
    var curRow = document.createElement("tr")
    vLabels[i] = document.createElement("td")
    vLabels[i].innerHTML = i
    vLabels[i].style.width=(boardW/1.1)+"vh"
    vLabels[i].style.textAlign="right"
    curRow.appendChild(vLabels[i])
    spaces[i]=new Array(boardW)
    for (var j=0;j<boardW;j++){
      spaces[i][j]=[]
      spaces[i][j][0]=document.createElement("BUTTON");
      spaces[i][j][0].classList.add('gameButton');
      spaces[i][j][1]=Math.floor(Math.random()+0.5)
      spaces[i][j][2]=i+","+j
      spaces[i][j][0].id=i+","+j
      spaces[i][j][0].innerHTML=" "//spaces[i][j][1]
      spaces[i][j][0].style.width=(50/boardW)+"vh"
      spaces[i][j][0].style.height=(50/boardW)+"vh"
      spaces[i][j][0].style.background='#000000'
      spaces[i][j][0].style.border="3px solid #DDDDDD"
      spaces[i][j][0].style.borderRadius="8px"
      spaces[i][j][0].addEventListener("mouseover",function(){
        this.style.background = "#DDDDDD";
        this.style.border ="3px solid #22EEEE"
        height = this.id.split(",")[0]
        width = this.id.split(",")[1]
        console.log(height)
        for (i=0;i<boardW;i++){
          if (!(spaces[height][i][0].disabled)){
            spaces[height][i][0].style.border ="3px solid #22BBBB"
          }
        }
        for (i=0;i<boardH;i++){
          if (!(spaces[i][width][0].disabled)){
            spaces[i][width][0].style.border ="3px solid #22BBBB"
          }
        }

    });
    spaces[i][j][0].addEventListener("mouseout",function(){
        this.style.background = "#000000";
        this.style.border ="3px solid DDDDDD"
        height = this.id.split(",")[0]
        width = this.id.split(",")[1]
        console.log(height)
        for (i=0;i<boardW;i++){
          if (!(spaces[height][i][0].disabled)){
            spaces[height][i][0].style.border ="3px solid #DDDDDD"
          }
        }
        for (i=0;i<boardH;i++){
          if (!(spaces[i][width][0].disabled)){
            spaces[i][width][0].style.border ="3px solid #DDDDDD"
          }
        }
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
    height = clickedID.split(",")[0]
    width = clickedID.split(",")[1]
    for (i=0;i<boardW;i++){
      if (!(spaces[height][i][0].disabled)){
        spaces[height][i][0].style.border ="3px solid #DDDDDD"
      }
    }
    for (i=0;i<boardH;i++){
      if (!(spaces[i][width][0].disabled)){
        spaces[i][width][0].style.border ="3px solid #DDDDDD"
      }
    }
    if(spaces[height][width][1]==1 && event.which==3){
      spaces[height][width][0].innerHTML="X"
      errors+=1
    }else if (spaces[height][width][1]==0 && event.which==1){
      spaces[height][width][0].innerHTML="X"
      errors+=1
    }else if(spaces[height][width][1]==1 && event.which==1){
      spaces[height][width][0].innerHTML=""
    }else if (spaces[height][width][1]==0 && event.which==3){
      spaces[height][width][0].innerHTML=""
    }
    if (spaces[height][width][1]==1){
      spaces[height][width][0].style.background='#22EEEE'
      spaces[height][width][0].style.border ="3px solid #22EEEE"
      spaces[height][width][0].disabled=true
      numClicked+=1
    }else if (spaces[height][width][1]==0){
      spaces[height][width][0].style.background='#BBBBBB'
      spaces[height][width][0].style.border ="3px solid #BBBBBB"
      spaces[height][width][0].disabled=true
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
  for (var i=0;i<boardW;i++){
    counts = ""
    for (var j=0;j<boardH;j++){
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
  for (var i=0;i<boardH;i++){
    var counts = ""
    for (var j=0;j<boardW;j++){
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