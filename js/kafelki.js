var tileWallOn = false,
    tilesWindowWidth  = 100,
    tilesWindowHeight = 100,
    tilesVnum = 25,
    tilesHnum = 25,
    allTiles = 0,
    tileWidth  = 100,
    tileHeight = 100,
    tilesHmargin = 0,
    tilesVmargin = 0,
    currTile,
    tilePref  = "tile",
    tileClass = "tile",
    tilesWipingStatus = 0;

//KAFELKOWA ŚCIANA
function tileWall () {
  var tileXX = document.getElementById("tileXX");
  var prntNode = tileXX.parentNode;
  var i, j,
      tendiv;
  if (!tileWallOn) {
    tileWallOn = true;
    tileWidth = Math.floor((tilesWindowWidth - 2 * tilesHmargin) / tilesHnum);
    tileHeight = Math.floor((tilesWindowHeight - 2 * tilesVmargin) / tilesVnum);
    allTiles = tilesVnum * tilesHnum;
    //Tworzenie szachownicy div�w
    for (i = 1; i <= tilesVnum; i++) {
      for (j = 1; j <= tilesHnum; j++) {
        tendiv = document.createElement("div");
        tendiv.className = tileClass;
        if (j < 10) {
          tendiv.id = tilePref + i + "0" + j;
        }//if
        else {
          tendiv.id = tilePref + i + j;
        }//else
        //tendiv.innerHTML = tendiv.id;
        tendiv.onclick = tilesWiping;
        prntNode.insertBefore(tendiv, tileXX);
      }//for
    }//for
    //Ustawianie szachownicy div�w
    tileXX.style.position = "fixed";
    tileXX.style.width = "1%";
    tileXX.style.height = "1%";
    tileXX.style.right = tilesHmargin + "%";
    tileXX.style.top = tilesVmargin + "%";
    tileXX.innerHTML = allTiles;
    tileXX.onclick = removeTiles;
    tileXX.style.display = "block";
    for (i = 1; i <= tilesVnum; i++) {
      for (j = 1; j <= tilesHnum; j++) {
        if (j < 10) {
          tendiv = document.getElementById(tilePref + i + "0" + j);
        }//if
        else {
          tendiv = document.getElementById(tilePref + i + j);
        }//else
        tendiv.style.position = "fixed";
        tendiv.style.width = tileWidth + "%";
        tendiv.style.height = tileHeight + "%";
        tendiv.style.left = (tilesHmargin + (j-1)*tileWidth) + "%";
        tendiv.style.top = (tilesVmargin + (i-1)*tileHeight) + "%";
        //monitor1.innerHTML=monitor1.innerHTML + ", " + tendiv.id;
      }//for
    }//for
    //Malowanie divów
    for (i = 1; i <= tilesVnum; i++) {
      for (j = 1; j <= tilesHnum; j++) {
        if (j < 10) {
          tendiv = document.getElementById(tilePref + i + "0" + j);
        }//if
        else {
          tendiv = document.getElementById(tilePref + i + j);
        }//else
        if (i < j) {
          r = Math.round(255*(2*(j-i)/(tilesHnum+tilesVnum-2)));
        }//if
        else {
          r = 0;
        }//else
        if (j < i) {
          g = Math.round(255*(2*(i-j)/(tilesHnum+tilesVnum-2)));//TO DZIA�A TYLKO JAK tilesHnum == tilesVnum
        }//if
        else {
          g = 0;
        }//else
        b = Math.round(255*(i+j-2-Math.abs(i-j))/(tilesHnum+tilesVnum-2));
        tendiv.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        tendiv.style.color = "white";
      }//for
    }//for
    currTile=tendiv;
    tilesWipingStatus=1;
    window.setTimeout("wipeTiles();", 3000);
  }//if
}//function tileWall
function removeTiles () {
  if (tileWallOn) {
    tiles = document.getElementsByClassName(tileClass);
    if (allTiles == tiles.length) {
      while (allTiles) {
        allTiles--;
        tileXX.parentNode.removeChild(tiles[allTiles]);
      }//while
      tileXX.style.display = "none";
      tileWallOn = false;
    }//if
  }//if
}//function removeTiles
function wipeTile (tile, force, grad) {
  if (tileWallOn) {
    if (!tile) {
      tile = currTile;
    }//if
    if (!force) {
      force = 0;
    }//if
    if (!grad) {
      grad = 0.1;
    }//if
    if (tile.className == "tile" && (tile != currTile || force == 1) && grad != 0) {
      currTile = tile;
      if (!currTile.style.opacity) {
        currTile.style.opacity = 1 - grad;
      }//if
      else {
        if (grad < currTile.style.opacity) {
          currTile.style.opacity -= grad;
        }//if
        else {
          currTile.parentNode.removeChild(currTile);
          currTile = tileXX;
          tileXX.innerHTML = --allTiles;
          if (!allTiles) {
            tileXX.style.display = "none";
            tileWallOn = false;
          }//if
        }//else
      }//else
    }//if
  }//if
}//function wipeTile
function wipeTiles () {
  if (tileWallOn) {
    var i, j;
    if (allTiles && tilesWipingStatus == 1 && currTile && currTile.className == "tile") {
      wipeTile(currTile, 1, 0.5);
      if (allTiles) {
        do {
          i = Math.ceil(tilesVnum*Math.random());
          if (i == 0) i = 1;
          j = Math.ceil(tilesHnum*Math.random());
          if (j == 0) j = 1;
          if (j < 10) {
            currTile = document.getElementById(tilePref+i+"0"+j);
          }//if
          else {
            currTile = document.getElementById(tilePref+i+j);
          }//else
        } while (!currTile);
        window.setTimeout("wipeTiles();", 100);
      }//if allTiles
      else {
        tilesWipingStatus = 0;
      }//else
    }//if
    else {
      tilesWipingStatus = 0;
    }//else
  }//if
}//function wieTiles
function tilesWiping () {
  if (tilesWipingStatus == 1) {
    tilesWipingStatus = 0;
  }//if
  else {
    tilesWipingStatus = 1;
    wipeTiles();
  }//else
}//function tilesWiping


//WANDERING TILE
var wanderingTile = undefined,
    wanderingTileOn = false,
    wanderingTileTimer = 0;
var wanderingTileSize = 50,
    wtX, wtY,
    wtXdir, wtYdir,
    wTmaxDist,
    wTcentre;
function startWanderingTile () {
  window.console.log("startWanderingTile(" + wanderingTileOn + ")");
  if (wanderingTileOn) {
    wanderingTile.parentNode.removeChild(wanderingTile);
    if (wanderingTileTimer) {
      window.clearInterval(wanderingTileTimer);
      wanderingTileTimer = 0;
    }//if
  }//if
  else {
    if (wanderingTile == undefined) {
      wanderingTile = document.createElement("div");

      wanderingTile.className = "wandering-tile";
      wanderingTile.onclick = stopWanderingTile;
      wanderingTile.ondblclick = function () {return false;};
    }//if
    //document.getElementById("tileXX").parentNode.insertBefore(wanderingTile, tileXX);
    document.getElementsByTagName("BODY")[0].appendChild(wanderingTile);
    wTmaxDist = wanderingTileSize;
    wtX = wTmaxDist;
    wtY = wTmaxDist;
    wtXdir = -1;
    wtYdir = 0;
    wTcentre = Math.round(wTmaxDist/2);
    wanderingTile.style.left = (mouseX + wtX - wTcentre).toString() + "px";
    wanderingTile.style.top = (mouseY + wtY - wTcentre).toString() + "px";
    wanderingTile.style.width = wanderingTileSize.toString() + "px";
    wanderingTile.style.height = wanderingTileSize.toString() + "px";
    if (wanderingTileTimer == 0) {
      wanderingTileTimer = window.setInterval(goAroundWanderingTile, 10);
    }//if
  }//else
  wanderingTileOn = !wanderingTileOn;
  return false;
}//function startWanderingTile
function stopWanderingTile () {
  window.console.console.log("stopWanderingTile");
  wanderingTile.parentNode.removeChild(wanderingTile);
  if (wanderingTileTimer) {
    window.clearInterval(wanderingTileTimer);
    wanderingTileTimer = 0;
  }//if
  wanderingTileOn = false;
}//function stopWanderingTile
function moveWanderingTile () {
  wanderingTile.style.left = (mouseX + wtX - wTcentre).toString() + "px";
  wanderingTile.style.top = (mouseY + wtY - wTcentre).toString() + "px";
  return false;
}//function moveWanderingTile
function goAroundWanderingTile () {
//window.alert("wtX=" + wtX + ", wtY=" + wtY);
  if (wtYdir < 0) {
    if (-wTmaxDist < wtY) {
      wtY--;
    }//if
    else {
      wtYdir = 0;
      wtXdir = -1;
    }//else
  }//if
  if (0 < wtYdir) {
    if (wtY < wTmaxDist) {
      wtY++;
    }//if
    else {
      wtYdir = 0;
      wtXdir = 1;
    }//else
  }//if
  if (wtXdir < 0) {
    if (-wTmaxDist < wtX) {
      wtX--;
    }//if
    else {
      wtXdir = 0;
      wtYdir = 1;
    }//else
  }//if
  if (0 < wtXdir) {
    if (wtX < wTmaxDist) {
      wtX++;
    }//if
    else {
      wtXdir = 0;
      wtYdir = -1;
    }//else
  }//if
  wanderingTile.style.left = (mouseX + wtX - wTcentre).toString() + "px";
  wanderingTile.style.top = (mouseY + wtY - wTcentre).toString() + "px";
//wanderingTile.innerHTML = wtX + ":" + wtY
  return false;
}//function goAroundWanderingTile


//BLOCKING TILE

var blockingTile = undefined,
    blockingTileOn = false,
    blockingTileSize = 50,
    blockingTileOffset = 25;
function startBlockingTile () {
  window.console.log("startBlockingTile(" + blockingTileOn + ")");
  if (!blockingTileOn) {
    blockingTileOn = true;
    if (blockingTile == undefined) {
      blockingTile = document.createElement("div");
      blockingTile.className = "blocking-tile";
      blockingTile.onclick = function () {return false;};
      blockingTile.ondblclick = function () {blockingTile.parentNode.removeChild(blockingTile); blockingTileOn = false;};
      blockingTile.style.height = blockingTileSize.toString() + "px";
      blockingTile.style.width = blockingTileSize.toString() + "px";
    }//if
    document.getElementsByTagName("BODY")[0].appendChild(blockingTile);
    blockingTile.style.left = (mouseX - blockingTileOffset).toString() + "px";
    blockingTile.style.top = (mouseY - blockingTileOffset).toString() + "px";
  }//
  return false;
}//startBlockingTile
function moveBlockingTile() {
  blockingTile.style.left = (mouseX - blockingTileOffset).toString() + "px";
  blockingTile.style.top = (mouseY - blockingTileOffset).toString() + "px";
  return false;
}//moveBlockingTile




//ROTATING SQUARES ROTATING SQUARES ROTATING SQUARES ROTATING SQUARES ROTATING SQUARES
var leftRttDeg = 0,
    leftRttObj,
    leftRttOn = false,
    leftRttInterval;
function startRotateLeft (obj) {
  leftRttObj = obj;
  leftRttOn = true;
  leftRttInterval = window.setInterval("rotateLeft", 10);
//  window.setTimeout("rotateLeft();", 100);
}//startRotateLeft
function rotateLeft () {
  if (leftRttOn) {
    leftRttDeg--;
    if (leftRttDeg == -360) leftRttDeg=0;
    if (leftRttObj) leftRttObj.style.transform="rotate(" + leftRttDeg + "deg)";
//    window.setTimeout("rotateLeft();", 10);
  }//if
}//rotateRight
function stopRotateLeft () {
  leftRttOn = false;
  window.clearInterval(leftRttInterval);
}//stopRotateLeft


var rightRttDeg = 0,
    rightRttObj,
    rightRttOn = false,
    rightRttInterval;
function startRotateRight (obj) {
//  window.alert("startRotateRight1");
  rightRttObj=obj;
  rightRttOn=true;
//  window.alert("startRotateRight2");
//  window.alert("rightRttObj.className:" + rightRttObj.className);
  rightRttInterval = window.setInterval("rotateRight", 10);
//  window.setTimeout("rotateRight();", 100);//window.alert("obj.className:" + obj.className);//: rotate(-7deg);
}//startRotateRight
function rotateRight () {
  if (rightRttOn) {
    rightRttDeg++;
    if (rightRttDeg == 360) rightRttDeg=0;
    if (rightRttObj) rightRttObj.style.transform="rotate(" + rightRttDeg + "deg)";
//    window.setTimeout("rotateRight();", 10);
  }//if
}//rotateRight
function stopRotateRight (obj) {
  rightRttOn = false;
  window.clearInterval(rightRttInterval);
}//stopRotateRight
