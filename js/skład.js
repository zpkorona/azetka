//MENU
// zmienne globalne dla czasu bezczynności i bieżącego menu
var menuTimerOn=false;
var currentMenu;

function initMenu () {
   liItems=document.getElementsByTagName("LI");
   for (i=0; i<liItems.length; i++) {
      if (liItems[i].className=="mainmenu") {
        obj=findChild(liItems[i], "A");// funkcje obsługi zdarzeń
        obj.onmouseover=showMenu;
        obj.onmouseout=startMenuTimer;
        if (ulItem=findChild(liItems[i], "UL")) {//jeśli jest podmenu
           ulItem.style.display="none";
           for (j=0; j<ulItem.childNodes.length; j++) {
              ulItem.childNodes[j].onmouseover=resetMenuTimer;
              ulItem.childNodes[j].onmouseout=startMenuTimer;
           }//for
        }//if
      }//if
   }//for
}//initMenu

function findChild (obj, tag) {// znajduje pierwszy obiekt potomny określonego typu
  cn=obj.childNodes;
  for (k=0; k<cn.length; k++) {
    if (cn[k].nodeName==tag)
      return cn[k];
  }//for
  return false;
}//findChild

function showMenu (e) {
  if (!e) e=window.event;
  obj=(e.target) ? e.target: e.srcElement; //kliknięte łącze
  resetMenuTimer();
  if (currentMenu) // ukryj poprzednie menu, jeśli było
    hideMenu(currentMenu);
  currentMenu=obj.parentNode;//element LI od łącze
  if (obj=findChild(currentMenu, "UL"))// znajdź podmenu, jeśli jest
    obj.style.display="block";//wyświetl podmenu
}//showMenu

function hideMenu (obj) {
  if (obj=findChild(obj, "UL")) // znajdź podmenu, jeśli jest
    obj.style.display="none";//wyłącz podmenu
}//hideMenu

function resetMenuTimer () {
  if (menuTimerOn)
    window.clearTimeout(menuTimerOn);
}//resetMenuTimerTimer

function startMenuTimer () {
  menuTimerOn = window.setTimeout("hideMenu(currentMenu);", 500);
}//startMenuTimer


//IWENTY
function mouseMonitoring (e) {
  if (!e) e=window.event;
  document.getElementById("monitorM").innerHTML="łup" + mouseCnt++ + " ==>> [" + e.clientX + "," + e.clientX + "]";
  obj=(e.target) ? e.target: e.srcElement;
  wipeTile(obj, 0, 0.1);
}//mouseMonitoring

function keyboardMonitoring (e) {
  if (!e) e=window.event;
//
//    tendiv=document.getElementById("takidiv");
//  tendiv.innerHTML=tendiv.innerHTML + String.fromCharCode(e.keyCode? e.keyCode : e.which);
//  document.takidiv.innerHTML=document.takidiv.innerHTML + String.fromCharCode(e.keyCode? e.keyCode : e.which);
  }//keyboardMonitoring


function dispONas () {
  obj1=document.getElementById("display-board");
  obj2=document.getElementById("co-robimy-text");
  obj1.innerHTML=obj2.innerHTML;
}//dispONas


function initAll () {
  initMenu();
//  tileWall();
  myAlert("NIE DZIAŁA?");
}//initAll

window.onload=initAll;



function objectParams (obj) {
  var tt = "<br>";
  tt += obj.id + "<br>";
  tt += "clientHeight=" + obj.clientHeight + "<br>";
  tt += "clientLeft=" + obj.clientLeft + "<br>";
  tt += "clientTop=" + obj.clientTop + "<br>";
  tt += "clientWidth=" + obj.clientWidth + "<br>";
  tt += "offsetHeight=" + obj.offsetHeight + "<br>";
  tt += "offsetWidth=" + obj.offsetWidth + "<br>";
  tt += "offsetLeft=" + obj.offsetLeft + "<br>";
  tt += "offsetParent=" + obj.offsetParent + "<br>";
  tt += "offsetTop=" + obj.offsetTop + "<br>";
  tt += "scrollHeight=" + obj.scrollHeight + "<br>";
  tt += "scrollLeft=" + obj.scrollLeft + "<br>";
  tt += "scrollTop=" + obj.scrollTop + "<br>";
  tt += "scrollWidth=" + obj.scrollWidth + "<br>";

  tt += "style.alignContent=" + obj.style.alignContent + "<br>";
  tt += "style.alignItems=" + obj.style.alignItems + "<br>";
  tt += "style.alignSelf=" + obj.style.alignSelf + "<br>";
  tt += "style.animation=" + obj.style.animation + "<br>";
  tt += "style.animationDelay=" + obj.style.animationDelay + "<br>";
  tt += "style.animationDirection=" + obj.style.animationDirection + "<br>";
  tt += "style.animationDuration=" + obj.style.animationDuration + "<br>";
  tt += "style.animationFillMode=" + obj.style.animationFillMode + "<br>";
  tt += "style.animationIterationCount=" + obj.style.animationIterationCount + "<br>";

  tt += "style.animationName=" + obj.style.animationName + "<br>";
  tt += "style.animationTimingFunction=" + obj.style.animationTimingFunction + "<br>";
  tt += "style.animationPlayState=" + obj.style.animationPlayState + "<br>";
  tt += "style.background=" + obj.style.background + "<br>";
  tt += "style.backgroundAttachment=" + obj.style.backgroundAttachment + "<br>";
  tt += "style.backgroundColor=" + obj.style.backgroundColor + "<br>";
  tt += "style.backgroundImage=" + obj.style.backgroundImage + "<br>";
  tt += "style.backgroundPosition=" + obj.style.backgroundPosition + "<br>";
  tt += "style.backgroundRepeat=" + obj.style.backgroundRepeat + "<br>";

  tt += "style.backgroundClip=" + obj.style.backgroundClip + "<br>";
  tt += "style.backgroundOrigin=" + obj.style.backgroundOrigin + "<br>";
  tt += "style.backgroundSize=" + obj.style.backgroundSize + "<br>";
  tt += "style.backfaceVisibility=" + obj.style.backfaceVisibility + "<br>";
  tt += "style.border=" + obj.style.border + "<br>";
  tt += "style.borderBottom=" + obj.style.borderBottom + "<br>";
  tt += "style.borderBottomColor=" + obj.style.borderBottomColor + "<br>";
  tt += "style.borderBottomLeftRadius=" + obj.style.borderBottomLeftRadius + "<br>";
  tt += "style.borderBottomRightRadius=" + obj.style.borderBottomRightRadius + "<br>";
  tt += "style.borderBottomStyle=" + obj.style.borderBottomStyle + "<br>";
  tt += "style.borderBottomWidth=" + obj.style.borderBottomWidth + "<br>";
  tt += "style.borderCollapse=" + obj.style.borderCollapse + "<br>";

  tt += "style.borderColor=" + obj.style.borderColor + "<br>";
  tt += "style.borderImage=" + obj.style.borderImage + "<br>";
  tt += "style.borderImageOutset=" + obj.style.borderImageOutset + "<br>";
  tt += "style.borderImageRepeat=" + obj.style.borderImageRepeat + "<br>";
  tt += "style.borderImageSlice=" + obj.style.borderImageSlice + "<br>";
  tt += "style.borderImageSource=" + obj.style.borderImageSource + "<br>";
  tt += "style.borderImageWidth=" + obj.style.borderImageWidth + "<br>";
  tt += "style.borderLeft=" + obj.style.borderLeft + "<br>";
  tt += "style.borderLeftColor=" + obj.style.borderLeftColor + "<br>";
  tt += "style.borderLeftStyle=" + obj.style.borderLeftStyle + "<br>";
  tt += "style.borderLeftWidth=" + obj.style.borderLeftWidth + "<br>";

  tt += "style.borderRadius=" + obj.style.borderRadius + "<br>";
  tt += "style.borderRight=" + obj.style.borderRight + "<br>";
  tt += "style.borderRightColor=" + obj.style.borderRightColor + "<br>";
  tt += "style.borderRightStyle=" + obj.style.borderRightStyle + "<br>";
  tt += "style.borderRightWidth=" + obj.style.borderRightWidth + "<br>";
  tt += "style.borderSpacing=" + obj.style.borderSpacing + "<br>";
  tt += "style.borderStyle=" + obj.style.borderStyle + "<br>";
  tt += "style.borderTop=" + obj.style.borderTop + "<br>";
  tt += "style.borderTopColor=" + obj.style.borderTopColor + "<br>";
  tt += "style.borderTopLeftRadius=" + obj.style.borderTopLeftRadius + "<br>";
  tt += "style.borderTopRightRadius=" + obj.style.borderTopRightRadius + "<br>";
  tt += "style.borderTopStyle=" + obj.style.borderTopStyle + "<br>";
  tt += "style.borderTopWidth=" + obj.style.borderTopWidth + "<br>";
  tt += "style.borderWidth=" + obj.style.borderWidth + "<br>";
  tt += "style.bottom=" + obj.style.bottom + "<br>";

  tt += "style.boxDecorationBreak=" + obj.style.boxDecorationBreak + "<br>";
  tt += "style.boxShadow=" + obj.style.boxShadow + "<br>";
  tt += "style.boxSizing=" + obj.style.boxSizing + "<br>";
  tt += "style.captionSide=" + obj.style.captionSide + "<br>";
  tt += "style.clear=" + obj.style.clear + "<br>";
  tt += "style.clip=" + obj.style.clip + "<br>";
  tt += "style.color=" + obj.style.color + "<br>";
  tt += "style.columnCount=" + obj.style.columnCount + "<br>";
  tt += "style.columnFill=" + obj.style.columnFill + "<br>";
  tt += "style.columnGap=" + obj.style.columnGap + "<br>";
  tt += "style.columnRule=" + obj.style.columnRule + "<br>";
  tt += "style.columnRuleColor=" + obj.style.columnRuleColor + "<br>";
  tt += "style.columnRuleStyle=" + obj.style.columnRuleStyle + "<br>";
  tt += "style.columnRuleWidth=" + obj.style.columnRuleWidth + "<br>";
  tt += "style.columns=" + obj.style.columns + "<br>";
  tt += "style.columnSpan=" + obj.style.columnSpan + "<br>";
  tt += "style.columnWidth=" + obj.style.columnWidth + "<br>";
  tt += "style.content=" + obj.style.content + "<br>";
  tt += "style.counterIncrement=" + obj.style.counterIncrement + "<br>";
  tt += "style.counterReset=" + obj.style.counterReset + "<br>";
  tt += "style.cursor=" + obj.style.cursor + "<br>";
  tt += "style.direction=" + obj.style.direction + "<br>";
  tt += "style.display=" + obj.style.display + "<br>";
  tt += "style.emptyCells=" + obj.style.emptyCells + "<br>";
  tt += "style.filter=" + obj.style.filter + "<br>";
  tt += "style.flex=" + obj.style.flex + "<br>";
  tt += "style.flexBasis=" + obj.style.flexBasis + "<br>";

  tt += "style.flexDirection=" + obj.style.flexDirection + "<br>";
  tt += "style.flexFlow=" + obj.style.flexFlow + "<br>";
  tt += "style.flexGrow=" + obj.style.flexGrow + "<br>";
  tt += "style.flexShrink=" + obj.style.flexShrink + "<br>";
  tt += "style.flexWrap=" + obj.style.flexWrap + "<br>";
  tt += "style.cssFloat=" + obj.style.cssFloat + "<br>";
  tt += "style.font=" + obj.style.font + "<br>";
  tt += "style.fontFamily=" + obj.style.fontFamily + "<br>";
  tt += "style.fontSize=" + obj.style.fontSize + "<br>";
  tt += "style.fontStyle=" + obj.style.fontStyle + "<br>";
  tt += "style.fontVariant=" + obj.style.fontVariant + "<br>";
  tt += "style.fontWeight=" + obj.style.fontWeight + "<br>";
  tt += "style.fontSizeAdjust=" + obj.style.fontSizeAdjust + "<br>";
  tt += "style.fontStretch=" + obj.style.fontStretch + "<br>";
  tt += "style.hangingPunctuation=" + obj.style.hangingPunctuation + "<br>";
  tt += "style.height=" + obj.style.height + "<br>";
  tt += "style.hyphens=" + obj.style.hyphens + "<br>";
  tt += "style.icon=" + obj.style.icon + "<br>";

  tt += "style.imageOrientation=" + obj.style.imageOrientation + "<br>";
  tt += "style.justifyContent=" + obj.style.justifyContent + "<br>";
  tt += "style.left=" + obj.style.left + "<br>";
  tt += "style.letterSpacing=" + obj.style.letterSpacing + "<br>";
  tt += "style.lineHeight=" + obj.style.lineHeight + "<br>";
  tt += "style.listStyle=" + obj.style.listStyle + "<br>";
  tt += "style.listStyleImage=" + obj.style.listStyleImage + "<br>";
  tt += "style.listStylePosition=" + obj.style.listStylePosition + "<br>";
  tt += "style.listStyleType=" + obj.style.listStyleType + "<br>";
  tt += "style.margin=" + obj.style.margin + "<br>";
  tt += "style.marginBottom=" + obj.style.marginBottom + "<br>";
  tt += "style.marginLeft=" + obj.style.marginLeft + "<br>";
  tt += "style.marginRight=" + obj.style.marginRight + "<br>";
  tt += "style.marginTop=" + obj.style.marginTop + "<br>";
  tt += "style.maxHeight=" + obj.style.maxHeight + "<br>";
  tt += "style.maxWidth=" + obj.style.maxWidth + "<br>";

  tt += "style.minHeight=" + obj.style.minHeight + "<br>";
  tt += "style.minWidth=" + obj.style.minWidth + "<br>";
  tt += "style.navDown=" + obj.style.navDown + "<br>";
  tt += "style.navIndex=" + obj.style.navIndex + "<br>";
  tt += "style.navLeft=" + obj.style.navLeft + "<br>";
  tt += "style.navRight=" + obj.style.navRight + "<br>";
  tt += "style.navUp=" + obj.style.navUp + "<br>";
  tt += "style.opacity=" + obj.style.opacity + "<br>";
  tt += "style.order=" + obj.style.order + "<br>";
  tt += "style.orphans=" + obj.style.orphans + "<br>";
  tt += "style.outline=" + obj.style.outline + "<br>";
  tt += "style.outlineColor=" + obj.style.outlineColor + "<br>";
  tt += "style.outlineOffset=" + obj.style.outlineOffset + "<br>";
  tt += "style.outlineStyle=" + obj.style.outlineStyle + "<br>";
  tt += "style.outlineWidth=" + obj.style.outlineWidth + "<br>";
  tt += "style.overflow=" + obj.style.overflow + "<br>";
  tt += "style.overflowX=" + obj.style.overflowX + "<br>";
  tt += "style.overflowY=" + obj.style.overflowY + "<br>";
  tt += "style.padding=" + obj.style.padding + "<br>";
  tt += "style.paddingBottom=" + obj.style.paddingBottom + "<br>";
  tt += "style.paddingLeft=" + obj.style.paddingLeft + "<br>";
  tt += "style.paddingRight=" + obj.style.paddingRight + "<br>";
  tt += "style.paddingTop=" + obj.style.paddingTop + "<br>";

  tt += "style.pageBreakAfter=" + obj.style.pageBreakAfter + "<br>";
  tt += "style.pageBreakBefore=" + obj.style.pageBreakBefore + "<br>";
  tt += "style.pageBreakInside=" + obj.style.pageBreakInside + "<br>";
  tt += "style.perspective=" + obj.style.perspective + "<br>";
  tt += "style.perspectiveOrigin=" + obj.style.perspectiveOrigin + "<br>";
  tt += "style.position=" + obj.style.position + "<br>";
  tt += "style.quotes=" + obj.style.quotes + "<br>";
  tt += "style.resize=" + obj.style.resize + "<br>";
  tt += "style.right=" + obj.style.right + "<br>";
  tt += "style.tableLayout=" + obj.style.tableLayout + "<br>";
  tt += "style.tabSize=" + obj.style.tabSize + "<br>";
  tt += "style.textAlign=" + obj.style.textAlign + "<br>";
  tt += "style.textAlignLast=" + obj.style.textAlignLast + "<br>";
  tt += "style.textDecoration=" + obj.style.textDecoration + "<br>";
  tt += "style.textDecorationColor=" + obj.style.textDecorationColor + "<br>";
  tt += "style.textDecorationLine=" + obj.style.textDecorationLine + "<br>";
  tt += "style.textDecorationStyle=" + obj.style.textDecorationStyle + "<br>";
  tt += "style.textIndent=" + obj.style.textIndent + "<br>";
  tt += "style.textJustify=" + obj.style.textJustify + "<br>";
  tt += "style.textOverflow=" + obj.style.textOverflow + "<br>";
  tt += "style.textShadow=" + obj.style.textShadow + "<br>";
  tt += "style.textTransform=" + obj.style.textTransform + "<br>";

  tt += "style.top=" + obj.style.top + "<br>";
  tt += "style.transform=" + obj.style.transform + "<br>";
  tt += "style.transformOrigin=" + obj.style.transformOrigin + "<br>";
  tt += "style.transformStyle=" + obj.style.transformStyle + "<br>";
  tt += "style.transition=" + obj.style.transition + "<br>";
  tt += "style.transitionProperty=" + obj.style.transitionProperty + "<br>";
  tt += "style.transitionDuration=" + obj.style.transitionDuration + "<br>";
  tt += "style.transitionTimingFunction=" + obj.style.transitionTimingFunction + "<br>";
  tt += "style.transitionDelay=" + obj.style.transitionDelay + "<br>";
  tt += "style.unicodeBidi=" + obj.style.unicodeBidi + "<br>";
  tt += "style.userSelect=" + obj.style.userSelect + "<br>";
  tt += "style.verticalAlign=" + obj.style.verticalAlign + "<br>";
  tt += "style.visibility=" + obj.style.visibility + "<br>";
  tt += "style.whiteSpace=" + obj.style.whiteSpace + "<br>";
  tt += "style.width=" + obj.style.width + "<br>";
  tt += "style.wordBreak=" + obj.style.wordBreak + "<br>";
  tt += "style.wordSpacing=" + obj.style.wordSpacing + "<br>";
  tt += "style.wordWrap=" + obj.style.wordWrap + "<br>";
  tt += "style.widows=" + obj.style.widows + "<br>";
  tt += "style.zIndex=" + obj.style.zIndex + "<br>";

  return tt;
}//objectParams