//BOOKSTANDS  BOOKSTANDS  BOOKSTANDS
var bookstandsStatus = "hidden";
var stepDelay = 5;
var stepStep  = 10;

function initBookstands () {
  var obj, objs;
  window.console.log("initBookstands");

  obj = document.getElementById("bookstand-left1");
  obj.style.visibility = bookstandsStatus;
  //objs = obj.getElementsByClassName("drawer-title");
  obj.getElementsByClassName("bookstand-handle")[0].onclick = moveLeftBookstand;

  obj = document.getElementById("bookstand-right1");
  obj.style.width = "0px";
  obj.style.maxWidth = "240px";
  obj.style.visibility = bookstandsStatus;
  obj.getElementsByClassName("bookstand-handle")[0].onclick = resizeRightBookstand;

  obj = document.getElementById("bookstand-right2");
  obj.style.visibility = bookstandsStatus;
  obj = obj.getElementsByClassName("bookstand-handle")[0];
  obj.onmousedown = startDragBookstand;
  obj.onmousemove = doDragBookstand;
  obj.onmouseup   = endDragBookstand;
  obj.onmouseout  = endDragBookstand;
  obj.ondblclick  = moveRightBookstand;
}//function initBookstands

function toggleBookstands (bookstandsOn) {
  var bookstands = document.getElementsByClassName("bookstand");
  window.console.log("toggleBookstands (" + bookstandsOn + ")");
  bookstandsStatus = bookstandsOn? "visible" : "hidden";
  for (var i = 0; i < bookstands.length; i++) {
    bookstands[i].style.visibility = bookstandsStatus;
    bookstands[i].style.zIndex = 12;
  }//for
}//function toggleBookstands

var bsLlMoveTimer = 0;
function moveLeftBs (bookstand, bookstandWidth, moveStep) {
  var leftSide = parseInt(bookstand.style.left);
  if (moveStep < 0 && 0 < bookstandWidth + leftSide || 0 < moveStep && leftSide < 0) {
//document.getElementById("tupisz").innerHTML += "l";
    leftSide += moveStep;
    bookstand.style.left = leftSide + "px";
  }//if
  else {
    bookstand.style.left = (0 < moveStep ? 0 : -bookstandWidth) + "px";
    window.clearInterval(bsLlMoveTimer);
    bsLlMoveTimer = 0;
  }//else
}//function moveLeftBs
function moveLeftBookstand (e) {
  window.console.log("moveLeftBookstand()");
  if (!e) e = window.event;
  var bsHandle = (e.target) ? e.target : e.srcElement; //kliknięte
  var bookstand = bsHandle.parentNode;
  var bookstandWidth = bookstand.offsetWidth;
  bookstand.style.left = bookstand.offsetLeft + "px";
  var moveStep = 0 <= bookstand.offsetLeft ? -stepStep : stepStep;
//window.alert("oW=" + bookstand.offsetWidth + ", oL=" + bookstand.offsetLeft + ", mS" + moveStep);
  if (bsLlMoveTimer == 0) {
    bsLlMoveTimer = window.setInterval(moveLeftBs, stepDelay, bookstand, bookstandWidth, moveStep);
  }//if
  return false;
}//function moveLeftBookstand


var bsR1ResizeTimer = 0;
function expandRightBs (bookstand, bsMaxWidth, moveStep) {
  var bsWidth = parseInt(bookstand.style.width);
  if (moveStep < 0 && 0 < bsWidth || 0 < moveStep && bsWidth < bsMaxWidth) {
//document.getElementById("tupisz").innerHTML += "R";
    bsWidth += moveStep;
    bookstand.style.width = bsWidth + "px";
  }//if
  else {
    bookstand.style.width = (0 < moveStep ? bsMaxWidth : 0) + "px";
    window.clearInterval(bsR1ResizeTimer);
    bsR1ResizeTimer = 0;
  }//else
}//expandRightBs
function resizeRightBookstand (e) {
  if (!e) e = window.event;
  window.console.log("resizeRightBookstand()");
  var bsHandle = (e.target) ? e.target : e.srcElement; //kliknię
  var bookstand = bsHandle.parentNode;
  var bsMaxWidth = parseInt(bookstand.style.maxWidth);
  var moveStep = (parseInt(bookstand.style.width) == 0) ? stepStep : -stepStep;
//window.alert("mW=" + bookstand.style.maxWidth + ", sw=" + bookstand.style.width + ", mS=" + moveStep);
  if (bsR1ResizeTimer == 0) {
    bsR1ResizeTimer = window.setInterval(expandRightBs, stepDelay, bookstand, bsMaxWidth, moveStep);
  }//if
  return false;
}//resizeRightBookstand


var bsR2MoveTimer = 0;
function moveRightBs (bookstand, bookstandWidth, moveStep, windowWidth) {
  var leftSide = parseInt(bookstand.style.left);
  if (moveStep < 0 && windowWidth - bookstandWidth < leftSide || 0 < moveStep && leftSide < windowWidth) {
//document.getElementById("tupisz").innerHTML += "r";
    leftSide += moveStep;
    bookstand.style.left = leftSide + "px";
  }//if
  else {
    bookstand.style.left = (windowWidth - (0 < moveStep ? 0 : bookstandWidth)) + "px";
    window.clearInterval(bsR2MoveTimer);
    bsR2MoveTimer = 0;
  }//else
}//moveRightBs
function moveRightBookstand (e) {
  if (!e) e = window.event;
  window.console.log("moveRightBookstand()");
  var bsHandle = (e.target) ? e.target : e.srcElement;
  var bookstand = bsHandle.parentNode;
  var bookstandWidth = bookstand.offsetWidth;
  bookstand.style.left = bookstand.offsetLeft + "px";
  var windowWidth = window.innerWidth;
  var moveStep = (bookstand.offsetLeft <= windowWidth - bookstandWidth) ? stepStep : -stepStep;
//document.getElementById("tupisz").innerHTML += "<br>" + bookstand.id + "<br>" +
//        "w.iW=" + windowWidth + ", oW=" + bookstand.offsetWidth + ", oL=" + bookstand.offsetLeft + ", sl=" + bookstand.style.left + ", mS=" + moveStep + "<br>";
  if (bsR2MoveTimer == 0) {
    bsR2MoveTimer = window.setInterval(moveRightBs, stepDelay, bookstand, bookstandWidth, moveStep, windowWidth);
  }//if
  return false;
}//moveRightBookstand


var mdragX;
var mdragY;
var draggedBsHandle = 0;
var stdBsColour;
var draggedBs = 0;
var draggedBsWidth = 0;
var dragOn = false;
function startDragBookstand (e) {
  window.console.log("startDragBookstand");
  if (bsR2MoveTimer == 0) {
    if (!e)
      e = window.event;
    mdragX = e.clientX;
    mdragY = e.clientY;
    draggedBsHandle = e.target ? e.target: e.srcElement;
    stdBsColour = draggedBsHandle.style.borderColor;
    draggedBsHandle.style.borderColor = "green";
    draggedBs = draggedBsHandle.parentNode;
    draggedBs.style.left = draggedBs.offsetLeft + "px";
    draggedBs.style.top = draggedBs.offsetTop + "px";
    draggedBsWidth = parseInt(draggedBs.offsetWidth);
    dragOn = true;
  }//if
}//function startDragBookstand
function doDragBookstand (e) {
  var x, y;
  if (dragOn) {
    if (!e) e = window.event;
    x = e.clientX;
    y = e.clientY;
    if (draggedBs) {
      draggedBs.style.left = (draggedBs.offsetLeft + x - mdragX) + "px";
      mdragX = x;
      draggedBs.style.top = (draggedBs.offsetTop + y - mdragY) + "px";
      mdragY = y;
    }//if
    e.preventDefault();
    return false;
  }//if
}//function doDragBookstand
function endDragBookstand (e) {
  if (dragOn && draggedBsHandle) {
    draggedBsHandle.style.borderColor = stdBsColour;
    draggedBsHandle = 0;
    draggedBs = 0;
    dragOn = false;
    return false;
  }//if
}//function endDragBookstand




//window.onload = initAllBookstands;
