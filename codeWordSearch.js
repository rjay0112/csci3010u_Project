var spaces = []
var boardH=30;
var boardW=30;
var numClicked;
var errors;
var hasStarted=false
var word = ["S", "H", "A", "T", "H", "A"]
var wordLen = word.length

window.onload = function() {
  var correctBoard = false;
  var failCount = 0;
  while (!correctBoard && failCount<=50){
    createSearch();
    correctBoard = validateBoard();
    failCount++;
  }
  if (failCount>50){
    document.getElementById("game").innerHTML = "Failed"
  }
}


function createSearch(){
  var masterTag = document.getElementById("game");
  while (masterTag.firstChild) {
    masterTag.removeChild(masterTag.lastChild);
  }
  for (var i=0;i<boardW;i++){
    var curRow = document.createElement("tr")
    spaces[i]=new Array(boardH)
    for (var j=0;j<boardH;j++){
      spaces[i][j]=[]
      spaces[i][j][0]=document.createElement("BUTTON");
      spaces[i][j][0].classList.add('gameButton');
      spaces[i][j][1]=word[Math.floor(Math.random()*wordLen)]
      spaces[i][j][2]=i+","+j
      spaces[i][j][0].id=i+","+j
      spaces[i][j][0].innerHTML=spaces[i][j][1]
      spaces[i][j][0].style.width=(3.5)+"vh"
      spaces[i][j][0].style.height=(3.5)+"vh"
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
}

function validateBoard(){
  var wordsFound = 0;
  //right
  for (var i=0;i<boardW;i++){
    for (var j=0;j<boardH-(wordLen-1);j++){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i][j+k][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found right",i,j,k,checkCount,spaces[i][j+k][1])
            wordsFound++;
          }
        }
      }
    }
  }
  //left
  for (var i=0;i<boardW;i++){
    for (var j=boardH-1;j>(wordLen-2);j--){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i][j-k][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found left",i,j,k,checkCount,spaces[i][j-k][1])
            wordsFound++;
          }
        }
      }
    }
  }
  //top
  for (var i=0;i<boardW-(wordLen-1);i++){
    for (var j=0;j<boardH;j++){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i+k][j][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found top",i,j,k,checkCount,spaces[i+k][j][1])
            wordsFound++;
          }
        }
      }
    }
  }
  //bottom
  for (var i=boardW-1;i>(wordLen-2);i--){
    for (var j=0;j<boardH;j++){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i-k][j][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found bottom",i,j,k,checkCount,spaces[i-k][j][1])
            wordsFound++;
          }
        }
      }
    }
  }
  //diagonal top left
  for (var i=0;i<boardW-(wordLen-1);i++){
    for (var j=0;j<boardH-(wordLen-1);j++){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i+k][j+k][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found d tl",i,j,k,checkCount,spaces[i+k][j+k][1])
            wordsFound++;
          }
        }
      }
    }
  }
  //diagonal top right
  for (var i=0;i<boardW-(wordLen-1);i++){
    for (var j=boardH-1;j>(wordLen-2);j--){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i+k][j-k][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found d tr",i,j,k,checkCount,spaces[i+k][j-k][1])
            wordsFound++;
          }
        }
      }
    }
  }
  //diagonal bottom left
  for (var i=boardW-1;i>(wordLen-2);i--){
    for (var j=0;j<boardH-(wordLen-1);j++){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i-k][j+k][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found d bl",i,j,k,checkCount,spaces[i-k][j+k][1])
            wordsFound++;
          }
        }
      }
    }
  }
  //diagonal bottom right
  for (var i=boardW-1;i>(wordLen-2);i--){
    for (var j=boardH-1;j>(wordLen-2);j--){
      var checkCount = 0;
      for (var k=0;k<wordLen;k++){
        if (spaces[i-k][j-k][1]!=word[k]){
          break
        }else{
          checkCount++;
          if (checkCount==wordLen){
            console.log("Found d br",i,j,k,checkCount,spaces[i-k][j-k][1])
            wordsFound++;
          }
        }
      }
    }
  }



  if (wordsFound==1){
    return true;
  }else{
    console.log("Failed: ",wordsFound)
    return false;
  }
}
