//OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ OBSŁUGA ZDARZEŃ

var mouseCnt = 0,
    mouseX = 0,
    mouseY = 0,
    mouseTag = "";
function mouseMonitoring (e) {
  var obj;
  if (!e)
    e = window.event;
  obj = (e.target) ? e.target : e.srcElement;
  mouseCnt++;
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseTag = obj.tagName;
  wipeTile(obj, 0, 0.1);
//  if (wanderingTileOn) moveWanderingTile();
  if (blockingTileOn) {
    moveBlockingTile();
  }//if
//document.getElementById("monitor-mouse").innerHTML = "<strong>MYSZA:</strong> " + mouseCnt + " [" + mouseX + "," + mouseY + "]/" + mouseTag;
}//mouseMonitoring


var keyboardChar = "",
    keyboardString = "";
function keyboardMonitoring (e) {
  if (!e)
    e = window.event;
  keyboardChar = String.fromCharCode(e.keyCode? e.keyCode : e.which);
  keyboardString += keyboardChar;
  document.getElementById("keyboardIn").innerHTML = keyboardString;
//document.getElementById("monitor-keyboard").innerHTML += keyboardChar;
}//keyboardMonitoring


var windowWidth = 0,
    windowHeight = 0;
function resizeMonitoring () {
  windowWidth = document.body.clientWidth || document.documentElement.clientWidth;
  windowHeight = document.body.clientHeight || document.documentElement.clientHeight;
  //windowWidth = window.innerWidth;
  //windowHeight = window.innerHeight;
  window.console.log("resizeMonitoring() => wWidth" + windowWidth + ", wHeight" + windowHeight);
//document.getElementById("monitor-mainsize").innerHTML += "[" + windowWidth + ":" + windowHeight + "]<br>";// + "(" + window.innerWidth + ":" + window.innerHeight + ")<br>";
//WYWOWYŁANE AKCJE
  setMenuVisibility();
  setPresentationBoardSideHeight();
  startTopBannerAds();
}//function resizeMonitoring


function visitCounter (newVisit) {
  var xhttp = new XMLHttpRequest();
  window.console.log("visitCounter (" + newVisit + ")");
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("visit-counters").innerHTML = this.responseText;
      }//if
    };//function()
  xhttp.open("GET", "php/visitCounter.php?new_visit=" + newVisit);
  xhttp.send();
}//function visitCounter


function setVisitSiteCookie () {
  var expDate = new Date();
  expDate.setTime(expDate.getTime() + (365*24*60*60*1000));
  var expiresTxt = "expires=" + expDate.toUTCString();
  var visitNo = 0;
  var cookiesTab = document.cookie.split(';');
  window.console.log("setVisitSiteCookie()");
  for (var i = 0; i < cookiesTab.length && visitNo == 0; i++) {
    cookiesTab[i] = cookiesTab[i].trim();
    if (cookiesTab[i].substr(0, cookiesTab[i].indexOf("=")) == "VisitNo")
      visitNo = cookiesTab[i].substr(cookiesTab[i].indexOf("=") + 1, cookiesTab[i].length);
  }//for
  visitNo++;
  document.cookie = "VisitNo=" + visitNo + ";" + expiresTxt;
  if (1 < visitNo)
    document.getElementById("cookies-alert").style.display = "none";
  visitCounter(visitNo == 1);
}//function setVisitSiteCookie


//USTAWIENIE ELEMENTÓW STRONY USTAWIENIE ELEMENTÓW STRONY USTAWIENIE ELEMENTÓW STRONY USTAWIENIE ELEMENTÓW STRONY
var vertPosOffset   = 0,
    borderSizeExt   = 0;//thanx to box-sizing: border-box;
var banrekHeightDef = 80,
    banrekHeight    = banrekHeightDef;
var banlogHeightDef = 100,
    banlogHeight    = banlogHeightDef,
    logoHeightDecr  = 8;
var glmenuHeightDef = 40,
    glmenuHeight    = glmenuHeightDef;
var menuSwitchWidth = 768;
var leftPanelWidth  = 120,
    minLeftPanelWidth = 20;

function initMainBodyDivs () {
  var obj, objs;

  window.console.log("initMainBodyDivs()");

  obj = document.getElementById("adverts-bar");
  obj.style.top    = vertPosOffset.toString + "px";
  obj.style.height = banrekHeight.toString + "px";

  vertPosOffset += banrekHeight + borderSizeExt;

  obj = document.getElementById("logo-banner");
  obj.style.top     = vertPosOffset.toString + "px";
  obj.style.height  = banlogHeight.toString + "px";

  document.getElementById("logo-banner-left").style.height = banlogHeight.toString + "px";
  document.getElementById("logo-banner-middle").style.height = banlogHeight.toString + "px";
  document.getElementById("logo-banner-right").style.height = banlogHeight.toString + "px";
  document.getElementById("company-logo").style.height = (banlogHeight - logoHeightDecr).toString + "px";

  vertPosOffset += banlogHeight + borderSizeExt;

  obj = document.getElementById("top-banner");
  obj.style.height = vertPosOffset.toString + "px";

  obj = document.getElementById("menu-bar-1");
  obj.style.top    = vertPosOffset.toString + "px";
  obj.style.height = glmenuHeight.toString + "px";

  vertPosOffset += glmenuHeight + borderSizeExt;

  /*
  obj = document.getElementById("menu-vert-icon-1");
  if (obj) {
    objs = document.getElementById("menu-bar-1").getElementsByClassName("menu-horiz-li1");
    if (0 < objs.length && 0 < objs[0].offsetWidth) {
      menuSwitchWidth = obj.offsetWidth + 10;
      if (0 < objs.length) menuSwitchWidth += objs[0].offsetWidth + 10;
      if (1 < objs.length) menuSwitchWidth += objs[1].offsetWidth + 10;
      if (2 < objs.length) menuSwitchWidth += objs[2].offsetWidth + 5;
    }//if
  }//if
  */
  window.console.log("menuSwitchWidth=" + menuSwitchWidth);

  obj = document.getElementById("left-pannel");
  obj.style.top     = vertPosOffset.toString + "px";
  obj.style.width   = leftPanelWidth.toString + "px";

  obj = document.getElementById("main-pannel");
  obj.style.top     = vertPosOffset.toString + "px";
  obj.style.left    = (leftPanelWidth + borderSizeExt).toString + "px";
  //obj.style.border  = "1px solid yellowgreen";

  setPresentationBoardSideHeight();

  document.getElementById("goto-top-box").style.display = "none";

  document.getElementById("drawer-left1").style.top = vertPosOffset.toString + "px";
  document.getElementById("drawer-left2").style.top = (vertPosOffset - 10 + document.getElementById("drawer-left1").clientHeight).toString + "px";
  document.getElementById("drawer-right1").style.top = (vertPosOffset + glmenuHeight).toString + "px";
}//function initMainBodyDivs


var vertCorrection = 4;
function setPresentationBoardSideHeight () {
  document.getElementById("presentation-board-side").style.minHeight = (document.getElementById("main-pannel").clientHeight -//scrollHeight - //document.body.clientHeight -
                                                                        //vertPosOffset -
                                                                        document.getElementById("main-pannel-top").scrollHeight -
                                                                        document.getElementById("main-pannel-bottom").scrollHeight -
                                                                        vertCorrection).toString() + "px";
  window.console.log("setPresentationBoardSideHeight() :" +
                     " body.clH=" + document.body.clientHeight +
                     ", 'main-p'.scrH=" + document.getElementById("main-pannel").scrollHeight +
                     ", 'presentation-board'.minH=" + document.getElementById("presentation-board-side").style.minHeight);
}//function setPresentationBoardSideHeight


var banrekWidth = 0;
var picWidth,
    frmWidth,
    picHeight;
var picNum = 0,
    frmNum = 0;
var slides = [];
var banrekTimer = 0;
var smallLargeRatio = 4;
function startTopBannerAds () {
  var obj,
      adverts;
  window.console.log("startTopBannerAds()");
  picHeight = banrekHeight;
  picWidth = Math.round((banrekHeight*3)/2);
  obj = document.getElementById("adverts-bar");
  banrekWidth = obj.clientWidth;
  frmWidth = (obj.getElementsByClassName("small-advert").length - 1) * picWidth;
  frmWidth = (banrekWidth < frmWidth) ? 0 : Math.round((banrekWidth - frmWidth) / obj.getElementsByClassName("small-advfrm").length);
  adverts = obj.getElementsByTagName("span");// znajdź wszystkie reklamki
  picNum = 0;
  frmNum = 0;
  for (var i = 0; i < adverts.length; i++) {
    if (adverts[i].className == "small-advert" || adverts[i].className == "small-advfrm") {
      obj = adverts[i]; // reklamki do tablicy
      slides[picNum + frmNum] = obj; // reklamki do tablicy
      obj.style.position = "absolute";
      obj.style.left   = (picNum*picWidth + frmNum*frmWidth).toString() + "px";
      obj.style.width  = ((adverts[i].className == "small-advert")? picWidth : frmWidth).toString() + "px";
      obj.style.height = picHeight.toString() + "px";
      if (adverts[i].className == "small-advert") {
        obj.getElementsByTagName("img")[0].style.width  = obj.style.width;
        obj.getElementsByTagName("img")[0].style.height = obj.style.height;
        obj.onmouseover = dispLargeAdvertOn;
        obj.onmouseout = dispLargeAdvertOff;
        picNum++;
      }//if
      else {
        frmNum++;
      }//else
      //window.console.log("=>[" + i + "].lwh=" + obj.style.left + "," + obj.style.width + "," + obj.style.height);
    }//if
  } //for
  if (picNum != 0) {
    if (banrekTimer == 0)
      banrekTimer = window.setInterval(moveBanerReklam, 100);
    obj = document.getElementById("large-advert-window");
    obj.style.top      = banrekHeight.toString() + "px";
    obj.style.left     = ((windowWidth - picWidth * smallLargeRatio) / 2).toString() + "px";
    obj.style.width    = (picWidth * smallLargeRatio).toString() + "px";
    obj.style.height   = (banrekHeight * smallLargeRatio).toString() + "px";
    obj.getElementsByTagName("img")[0].style.width  = obj.style.width;
    obj.getElementsByTagName("img")[0].style.height = obj.style.height;
  }//if
  window.console.log("=> picNum" + picNum + ", frmNum=" + frmNum + ", banrekWidth=" + banrekWidth + ", picWidth=" + picWidth + ", frmWidth=" + frmWidth);
}//function startTopBannerAds


function dispLargeAdvertOn (e) {
  var obj,
      srctxt,
      pos,
      srctxt2;
  if (!e)
    e = window.event;
  obj = (e.target) ? e.target : e.srcElement;
  if (obj.tagName.toUpperCase() == "IMG") {
    srctxt = obj.getAttribute("src");
    pos = srctxt.indexOf("s80.jpg");
    srctxt2 = srctxt.substr(0, pos) + srctxt.substr(pos + 3, srctxt.length);
    document.getElementById("large-advert").setAttribute("src", srctxt2);
    document.getElementById("large-advert").setAttribute("alt", srctxt2);
    document.getElementById("large-advert-window").style.display = "block";
  }//if
}//function dispLargeAdvertOn

function dispLargeAdvertOff () {
  document.getElementById("large-advert-window").style.display = "none";
}//dispLargeAdvertOff

function moveBanerReklam () {
  var x,
      w,
      i;
  for (i = slides.length - 1; 0 <= i; i--) {
    x = parseInt(slides[i].style.left) - 1;
    w = parseInt(slides[i].style.width);
    if (x <= -w)
      slides[i].style.left = ((picNum*picWidth + frmNum*frmWidth) - w).toString() + "px";
    else
      slides[i].style.left = x.toString() + "px";
    }//for
}//function moveBanerReklam


//SETMENUVISIBILITY

function adaptMobileVisiblity (mobile) {
  window.console.log("adaptMobileVisiblity (" + mobile + ")");
  if (mobile) {
    document.getElementById("left-pannel").style.width = minLeftPanelWidth.toString() + "px";
    document.getElementById("main-pannel").style.left  = (minLeftPanelWidth + borderSizeExt).toString() + "px";
    document.getElementById("drawer-left1").style.visibility = "hidden";
    document.getElementById("drawer-left2").style.visibility = "hidden";
    document.getElementById("drawer-right1").style.visibility = "hidden";
  }
  else {
    document.getElementById("left-pannel").style.width = leftPanelWidth.toString() + "px";
    document.getElementById("main-pannel").style.left  = (leftPanelWidth + borderSizeExt).toString() + "px";
    document.getElementById("drawer-left1").style.visibility = "visible";
    document.getElementById("drawer-left2").style.visibility = "visible";
    document.getElementById("drawer-right1").style.visibility = "visible";
  }
}//function adaptMobileVisiblity


function setMenuVisibility () {
  window.console.log("setMenuVisibility() : " + menuSwitchWidth + " < " + windowWidth);
  //document.getElementById("menu-vert-icon-1").style.visibility = (menuSwitchWidth < windowWidth)? "hidden" : "visible";
  //document.getElementById("menu-vert-menu-1").style.display = "none";
  //document.getElementById("menu-horiz-menu-1").style.visibility = "visible";//menu-horiz-ul1
  adaptMobileVisiblity(windowWidth < menuSwitchWidth);
}//function setMenuVisibility


function toggleMenus () {
  window.console.log("toggleMenus()");
  /*
  if (document.getElementById("menu-vert-menu-1").style.display == "none" &&
      document.getElementById("menu-horiz-ul1").style.visibility == "visible") {
    document.getElementById("menu-vert-menu-1").style.display = "block";
    document.getElementById("menu-horiz-ul1").style.visibility = "hidden";
  }//if
  else {
    document.getElementById("menu-vert-menu-1").style.display = "none";
    document.getElementById("menu-horiz-ul1").style.visibility = "visible";
  }//else
  */
}//function toggleMenus


//PRZEWIJANIE PRZEWIJANIE PRZEWIJANIE PRZEWIJANIE PRZEWIJANIE PRZEWIJANIE
var lastScrollTop = 0,
    currScrollTop = 0,
    fullSizeHeader = true,
    tBRcnt = 0;
var headerJustChanged = false;
function topBannerRoll (e) {
  var obj;
  if (!e)
    e = window.event;
  obj = (e.target) ? e.target : e.srcElement;
  window.console.log("topBannerRoll(curr=" + currScrollTop + ", last=" + lastScrollTop + ")");
  tBRcnt++;
  currScrollTop = obj.scrollTop;
//document.getElementById("monitor-mainscroll").innerHTML = "<strong>STRONA: </strong> [" + lastScrollTop + "->" + currScrollTop + "]";
//document.getElementById("monitor-monitor").innerHTML += "[" + lastScrollTop + "," + currScrollTop + "] {" + document.body.scrollHeight + "} ";;

  if (currScrollTop != lastScrollTop) {
//document.getElementById("monitor-mainscroll").innerHTML += "<>";//"&#8596;";

    if (currScrollTop == 0 && !fullSizeHeader && !headerJustChanged) {//windowHeight - banrekHeight < document.body.scrollHeight) {
      fullSizeHeader = true;
//document.getElementById("monitor-mainscroll").innerHTML += "&#8593;";
//document.getElementById("monitor-monitor").innerHTML += "^";
      document.getElementById("top-banner").style.height = (vertPosOffset - glmenuHeight - borderSizeExt) + "px";
      document.getElementById("left-pannel").style.top = vertPosOffset + "px";
      document.getElementById("main-pannel").style.top = vertPosOffset + "px";
//      document.getElementById("page-pannels").style.top = vertPosOffset + "px";
      document.getElementById("menu-bar-1").style.top = (vertPosOffset - glmenuHeight - borderSizeExt) + "px";
      document.getElementById("top-banner").style.height  = (vertPosOffset - glmenuHeight - borderSizeExt) + "px";
      document.getElementById("logo-banner").style.top = (banrekHeight + borderSizeExt) + "px";
      document.getElementById("logo-banner").style.height = banlogHeight + "px";
      document.getElementById("logo-banner-left").style.height = banlogHeight + "px";
      document.getElementById("logo-banner-middle").style.height = banlogHeight + "px";
      document.getElementById("logo-banner-right").style.height = banlogHeight + "px";
      document.getElementById("company-logo").style.height = (banlogHeight - logoHeightDecr) + "px";
      document.getElementById("adverts-bar").style.width = "100%";
      //document.getElementById("adverts-bar").style.right = 0px;
      startTopBannerAds();
      document.getElementById("logo-banner").style.width = "100%";
      //document.getElementById("logo-banner").style.left = 0px;
      //document.getElementById("logo-banner-left").style.width = "30%";
      document.getElementById("logo-banner-left").style.font = "italic 1.0em Verdena, sans-serif";
      //document.getElementById("logo-banner-middle").style.width = "40%";
      //document.getElementById("logo-banner-right").style.width = "30%";
      document.getElementById("company-name").style.font = "italic 1.4em Verdena, sans-serif";

      document.getElementById("goto-top-box").style.display = "none";
    }//if

    if (fullSizeHeader && banrekHeight <= currScrollTop) {
      fullSizeHeader = false;
      headerJustChanged = true;
//document.getElementById("monitor-mainscroll").innerHTML += "^";//"&#8595;";
//document.getElementById("monitor-monitor").innerHTML += "v";
      document.getElementById("adverts-bar").style.width = "50%";
      startTopBannerAds();
      //document.getElementById("adverts-bar").style.right = windowHalfWidth.toString() + "px;
      document.getElementById("logo-banner").style.width = "50%";
      //document.getElementById("logo-banner").style.left = windowHalfWidth.toString() + "px;
      document.getElementById("company-logo").style.height = (banrekHeight - logoHeightDecr).toString() + "px";
      document.getElementById("logo-banner").style.height = banrekHeight.toString() + "px";
      document.getElementById("logo-banner-left").style.height = banrekHeight.toString() + "px";
      document.getElementById("logo-banner-middle").style.height = banrekHeight.toString() + "px";
      document.getElementById("logo-banner-right").style.height = banrekHeight.toString() + "px";
      document.getElementById("logo-banner").style.top = "0px";
      document.getElementById("top-banner").style.height = (banrekHeight + borderSizeExt).toString() + "px";
      document.getElementById("menu-bar-1").style.top = (banrekHeight + borderSizeExt).toString() + "px";
      document.getElementById("left-pannel").style.top = (banrekHeight + glmenuHeight + 2*borderSizeExt).toString() + "px";

      document.getElementById("main-pannel").style.top = (banrekHeight + glmenuHeight + 2*borderSizeExt).toString() + "px";
//      document.getElementById("page-pannels").style.top = banrekHeight + glmenuHeight + 2*borderSizeExt;

      //document.getElementById("logo-banner-left").style.width = "30%";
      document.getElementById("logo-banner-left").style.font = "italic 0.8em Verdena, sans-serif";
      //document.getElementById("logo-banner-middle").style.width = "40%";
      //document.getElementById("logo-banner-right").style.width = "30%";
      document.getElementById("company-name").style.font = "italic 1.0em Verdena, sans-serif";
      //document.body.scrollTop = (banrekHeight + glmenuHeight).toString() + "px";
      obj.scrollTop = (banrekHeight + glmenuHeight).toString() + "px";
//      if (0 < obj.scrollTop)//document.body.scrollTop)
//        document.getElementById("goto-top-box").style.display = "block";
    }//if
    else {
      headerJustChanged = false;
    }//else

    lastScrollTop = currScrollTop;
  }//if

  if (!fullSizeHeader && 0 < obj.scrollTop) {
    document.getElementById("goto-top-box").style.display = "block";
  }//if

  window.console.log("=> top.h=" + document.getElementById("top-banner").style.height +
                     ", adv.w=" + document.getElementById("adverts-bar").style.width +
                     ", log.thw=" + document.getElementById("logo-banner").style.top +
                     "," + document.getElementById("logo-banner").style.height +
                     "," + document.getElementById("logo-banner").style.width);

  return false;
}//function topBannerRoll



// PRESENTATION =========================================================

var bookstandsOn = false;

var currPresentation = "",
    lastPresentation = "",
    parentPresentation = "";


function hidePresentations () {
  var objs,
      i;
  objs = document.getElementsByClassName("presentation-part");
  window.console.log("hidePresentations() " + objs.length);
  for (i = 0; i < objs.length; objs[i++].style.display = "none");
  objs = document.getElementsByClassName("presentation-subpart");
  window.console.log("hidePresentations() " + objs.length);
  for (i = 0; i < objs.length; objs[i++].style.display = "none");
  document.getElementById((currPresentation = "welcome-pres")).style.display = "block";
}//function hidePresentations


function showPresentation (newPresObj) {
  var newPresentation = "";
  var obj,
      objs,
      i;
  obj = newPresObj;
  if (newPresObj.tagName == "LI" && newPresObj.getElementsByTagName("A").length != 0) {
    newPresObj = newPresObj.getElementsByTagName("A")[0];
  }//if
  if (newPresObj.tagName == "A") {
    newPresentation = newPresObj.getAttribute("HREF").slice(1);
  }//if
  window.console.log("showPresentation(" + obj.tagName + ") -> \"" +  newPresentation + "\", cp=\"" + currPresentation + "\"");
  if (newPresentation != "" && (currPresentation != newPresentation || newPresentation == "regaly")) {
    //window.console.log(currPresentation + "->" + newPresentation);
    if ((newPresentation != "regaly" || !bookstandsOn) &&
        currPresentation != newPresentation && (obj = document.getElementById(currPresentation))) {
      obj.style.display = "none";
      objs = obj.getElementsByClassName("presentation-subpart");
      for (i = 0; i < objs.length; objs[i++].style.display = "none");
      if (obj.parentNode.className == "presentation-part") {// || obj.parentNode.className == "presentation-subpart")
        obj.parentNode.style.display = "none";
      }//if
      currPresentation = newPresentation;
      newPresObj = document.getElementById(currPresentation);
      if (!newPresObj) {
        currPresentation = "welcome-pres";
        newPresObj = document.getElementById(currPresentation);
      }//if
      newPresObj.style.display = "block";
      objs = newPresObj.getElementsByClassName("presentation-subpart");
      for (i = 0; i < objs.length; objs[i++].style.display = "block");
      if (newPresObj.parentNode.className == "presentation-part") {// || obj.parentNode.className == "presentation-subpart")
        newPresObj.parentNode.style.display = "block";
      }//if
      setPresentationBoardSideHeight();
    }//if
    if (newPresentation == "regaly") {
      bookstandsOn = !bookstandsOn;
      document.getElementById("a-regaly").innerHTML = "Regały" + (bookstandsOn? "&nbsp;&#10004;" : "");
      toggleBookstands(bookstandsOn);
    }//if
  }//if
  else {
    currPresentation = "welcome-pres";
    document.getElementById(currPresentation).style.display = "block";
    setPresentationBoardSideHeight();
  }//else

  return false;
}//function showPresentation


//AJAX-I-XML AJAX-I-XML AJAX-I-XML AJAX-I-XML AJAX-I-XML AJAX-I-XML
function showXMLinfo (plik, aleCo) {
  var xhttp,
      xmlDoc,
      txt,
      x,
      i;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        xmlDoc = this.responseXML;
        txt = "";
        x = xmlDoc.getElementsByTagName(aleCo);
        for (i = 0; i < x.length; i++) {
          txt = txt + x[i].childNodes[0].nodeValue + "<br>";
        }//for
        document.getElementById("ajax-i-xml-store").innerHTML = txt;
      }//if
    };//function
  xhttp.open("GET", plik, true);
  xhttp.send();
}//showXMLinfo

function showPlyty(plik) {
  var xhttp,
      xmlDoc,
      txt,
      x,y,z,
      i, j;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      txt = "";
      x = xmlDoc.getElementsByTagName("PLYTA");
      for (i = 0; i < x.length; i++) {
        y=x[i].getElementsByTagName("AUTOR");
        txt = txt + y[0].childNodes[0].nodeValue + " ";
        y=x[i].getElementsByTagName("TYTUL");
        txt = txt + "\"" + y[0].childNodes[0].nodeValue + "\"<br>";
        y=x[i].getElementsByTagName("UTWOR");
        for (j=1; j <= y.length; j++) {
          txt = txt + "&nbsp;&nbsp;" + j + ". " + y[j-1].childNodes[0].nodeValue + "<br>";
        }
        txt = txt + "<hr>";
      }//for
      document.getElementById("ajax-i-xml-store").innerHTML = txt;
    }//if
  };//functio()
  xhttp.open("GET", plik, true);
  xhttp.send();
}//showPlyty


//CIASTECZKA
function getData () {
  document.getElementById("get-data4cookies").innerHTML=
    "<form name='daneWpisz'>" +
    "  <textarea name='p1' cols='80' rows='2'></textarea><br>" +
    "  <input type='RADIO' name='p2' value='1'>1<br>" +
    "  <input type='RADIO' name='p2' value='2'>2<br>" +
    "  <input type='RADIO' name='p2' value='3'>3<br>" +
    "  <input type='RADIO' name='p2' value='4'>4<br>" +
    "  <input type='RADIO' name='p2' value='5'>5<br>" +
    "  <textarea name='p3' cols='80' rows='2'></textarea><br>" +
    "</form>";
}// getData

var p1Value,
    p2Value,
    p3Value;
function saveCookies () {
  var expDate = new Date();
  var expDays = 3;
  expDate.setTime(expDate.getTime() + (expDays*24*60*60*1000));
  var expiresTxt = "expires=" + expDate.toUTCString();

  p1Value = document.daneWpisz.p1.value;
  if (document.daneWpisz.p2[0].checked) p2Value=1;
  if (document.daneWpisz.p2[1].checked) p2Value=2;
  if (document.daneWpisz.p2[2].checked) p2Value=3;
  if (document.daneWpisz.p2[3].checked) p2Value=4;
  if (document.daneWpisz.p2[4].checked) p2Value=5;
  p3Value = document.daneWpisz.p3.value;
  document.getElementById("save-cookies").innerHTML=
    "zmienna p1 : daneWpisz_p1=[" + p1Value + "]<br>" +
    "zmienna p2 : daneWpisz_p2=[" + p2Value + "]<br>" +
    "zmienna p3 : daneWpisz_p3=[" + p3Value + "]<br>";
  document.cookie = "daneWpisz_p1=" + p1Value + ";" + expiresTxt;
  document.cookie = "daneWpisz_p2=" + p2Value + ";" + expiresTxt;
  document.cookie = "daneWpisz_p3=" + p3Value + ";" + expiresTxt;
}// saveCookies

function readCookies () {
  var cookiesTab = document.cookie.split(';');
  var txt = "{" + document.cookie + "}<hr>";
  for (var i = 0; i < cookiesTab.length; i++) {
    cookiesTab[i] = cookiesTab[i].trim();
    txt = txt + "cookiesTab[" + i + "]=[" + cookiesTab[i] + "]<br>";
  }//for
  document.getElementById("read-cookies").innerHTML=txt;
}// readCookies

function removeCookies () {
  if (document.cookie.length) {
    var expDate = new Date();
    var cookiesTab = document.cookie.split(';');
    expDate.setTime(expDate.getTime() - (1*24*60*60*1000));
    var expiresTxt = "expires=" + expDate.toUTCString();
    for (var i = 0; i < cookiesTab.length; i++) {
      cookiesTab[i].trim();
      if (cookiesTab[i].substr(0, cookiesTab[i].indexOf("=")) != "VisitNo") {
        cookiesTab[i] = cookiesTab[i].substring(0, cookiesTab[i].indexOf("=")+1);
        document.cookie = cookiesTab[i] + ";" + expiresTxt;
      }//if
    }//for
  }//if
  readCookies();
}// removeCookies


//AJAX I PHP
function showPHPcos (plik, aleCo) {
  var xhttp,
      xmlDoc,
      txt,
      x,
      i;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      txt = this.responseText;
      document.getElementById("ajax-i-php-store").innerHTML = txt;
    }//if
  };//functio()
  xhttp.open("GET", plik + "?wersja=" + aleCo, true);
  xhttp.send();
}//showXMLcos


//SYMBOLS  SYMBOLS  SYMBOLS
function showSymbol (number) {
  if (number.length == 0) {
    document.getElementById("symbol-field").value = "";
  }//if
  else {
    document.getElementById("symbol-field").innerHTML = "&#" + parseInt(number) + ";";
  }//else
}//showSymbol

function printSymbols (fromNum, toNum) {
  for (var number = fromNum; number <= toNum; number++) {
    document.writeln("[" + number +"] &#" + number + ";<br>");
  }//for
}//printSymbols


//BADANIA
function goToSurvey (surveyId) {
  var href = window.location.href;
  href = href.substring(0, href.lastIndexOf("/"));
  href = href.substring(0, href.lastIndexOf("/") + 1) + "badania/";
  href = "http://badania.azetkaankiety.pl/";
  if (surveyId == "")
    window.open(href);
  else
    window.open(href + "?survey_id=" + surveyId + "&user_id=guest");
}//goToSurvey


function toggleAzetka () {
  if (document.getElementById("iframe-display3").style.display == "none") {
//document.getElementById("regaly").style.display = "block";
    document.getElementById("iframe-display3").style.display = "block";
    document.getElementById("a_azetka").innerHTML = "azetka&nbsp;&#10004;";
  }//if
  else {
    document.getElementById("iframe-display3").style.display = "none";
    document.getElementById("a_azetka").innerHTML = "azetka";
  }//else
}//toggleAzetka

function playFilm (filmik) {
  if (document.getElementById("video-display3").style.display == "none") {
//document.getElementById("regaly").style.display = "block";
    document.getElementById("video-display3").style.display = "block";
    document.getElementById(filmik).play();
    document.getElementById("a_filmik").innerHTML = "Jakiś&nbsp;filmik&nbsp;&#10004;";
  }//if
  else{
    document.getElementById("video-display3").style.display = "none";
    document.getElementById(filmik).pause();
    document.getElementById("a_filmik").innerHTML = "Jakiś&nbsp;filmik";
  }//else
}//playFilm

function playAudio (muzyczka) {
  if (document.getElementById("audio-display3").style.display == "none") {
//document.getElementById("regaly").style.display = "block";
    document.getElementById("audio-display3").style.display = "block";
    document.getElementById(muzyczka).play();
    document.getElementById("a_muzyczka").innerHTML = "Jakaś&nbsp;muzyczka&nbsp;&#10004;";
  }//if
  else {
    document.getElementById("audio-display3").style.display = "none";
    document.getElementById(muzyczka).pause();
    document.getElementById("a_muzyczka").innerHTML = "Jakaś&nbsp;muzyczka";
  }//else
}//playFilm

function myAlert (alertBox, text) {
  document.getElementById(alertBox).getElementsByClassName("alert-box-text")[0].innerHTML = text;
  document.getElementById(alertBox).style.display = "block";
}//myAlert

function hideMonitors () {
  document.getElementById("monitor-mouse").style.display = "none";
  document.getElementById("monitor-keyboard").style.display = "none";
  document.getElementById("monitor-mainsize").style.display = "none";
  document.getElementById("monitor-mainscroll").style.display = "none";
  document.getElementById("monitor-monitor").style.display = "none";
}//hideMonitors



function initAll () {
  var scrolledObj = document.getElementById("main-pannel");//zamiast document.body;

  window.console.log("initAll()");

  document.getElementById("iframe-display3").style.display = "none";
  document.getElementById("video-display3").style.display = "none";
  document.getElementById("audio-display3").style.display = "none";

  hidePresentations();

  document.body.onmousemove = mouseMonitoring;
  document.body.onkeypress = keyboardMonitoring;
  document.body.onresize = resizeMonitoring;

  windowWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
  windowHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
  //windowWidth = window.innerWidth;
  //windowHeight = window.innerHeight;
  window.console.log("initAll=>wW=" + windowWidth + ", iW=" + window.innerWidth + ", wH=" + windowHeight + ", iH=" + window.innerHeight);

//if(window.innerWidth <= 800 && window.innerHeight <= 600) {
//if (typeof window.orientation !== 'undefined')

  setVisitSiteCookie();

  initMainBodyDivs();

  scrolledObj.addEventListener("scroll", topBannerRoll);
  document.getElementById("goto-top-box").onclick = function () {headerJustChanged = false; scrolledObj.scrollTop = 0;};
  startTopBannerAds();
  setMenuVisibility();
  scrolledObj.scrollTop = 0;

  initBookstands();

//  hideMonitors();
//  document.getElementById("monitor-mouse").innerHTML = "<strong>MOUSE:</strong>";
//  document.getElementById("monitor-keyboard").innerHTML = "<strong>KBD INPUT:</strong>";
//  document.getElementById("monitor-mainsize").innerHTML = "<strong>SIZE:</strong>";
//  document.getElementById("monitor-mainscroll").innerHTML = "<strong>SCROLL:</strong>";
//  document.getElementById("monitor-monitor").innerHTML = "<strong>MONITOR:</strong>";
}//initAll

window.onload = initAll;
