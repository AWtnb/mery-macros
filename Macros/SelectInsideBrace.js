// ------------------------------------------------------------
// カッコ内を選択
// ------------------------------------------------------------

function getNthChar(s, n) {
  return String(s.charAt(n-1));
}

const bracePairs = {
  "（": "）",
  "「": "」",
  "［": "］",
  "〔": "〕",
  "『": "』",
  "【": "】",
  "〈": "〉",
  "《": "》",
}
const openBraces = Object.keys(bracePairs).map(function(key){
  return String(key);
});
const closeBraces = Object.keys(bracePairs).map(function(key){
  const closeBrc = bracePairs[key];
  return String(closeBrc);
});
function getOpenBrace(closeBrc) {
  const openBrc = Object.keys(bracePairs).filter(function(key){
    return bracePairs[key] === closeBrc
  });
  return String(openBrc);
}

function getOpenBraceX (line) {
  let x = 0;
  const len = line.length;
  const stack = [];
  for (let i = 0; i < len; i++) {
    const c = getNthChar(line, len - i);
    if (closeBraces.indexOf(c) >= 0) {
      stack.push(getOpenBrace(c));
      continue;
    }
    if (openBraces.indexOf(c) >= 0) {
      let idx = stack.indexOf(c);
      if (idx >= 0) {
        stack.splice(idx, 1);
        continue;
      }
      x = len - i;
      break;
    }
  }
  return x;
}

function getCloseBraceX (line, closeBrace) {
  let x = 0;
  const openBrace = getOpenBrace(closeBrace);
  let skipCloseBrace = 0;
  for (let i = 1; i <= line.length; i++) {
    const c = getNthChar(line, i);
    if (c == openBrace) {
      skipCloseBrace += 1;
      continue;
    }
    if (c == closeBrace) {
      if (skipCloseBrace) {
        skipCloseBrace -= 1;
        continue;
      }
      x = i;
      break;
    }
  }
  return x;
}

function expandSelection() {

  const logicalX = document.selection.GetActivePointX(mePosLogical);
  const logicalY = document.selection.GetActivePointY(mePosLogical);
  const logicalLine = document.GetLine(logicalY, 1);

  const strFromBOL = logicalLine.slice(0, logicalX-1);
  const openPosX = getOpenBraceX(strFromBOL);
  if (openPosX < 1) {
    return;
  }
  const openBrc = getNthChar(logicalLine, openPosX);

  const closeBrc = bracePairs[openBrc];
  const strToEOL = logicalLine.slice(openPosX);
  const closePosX = getCloseBraceX(strToEOL, closeBrc);
  if (closePosX < 1) {
    return;
  }

  document.selection.SetActivePoint(mePosLogical, openPosX+1, logicalY, false);
  document.selection.SetActivePoint(mePosLogical, openPosX+closePosX, logicalY, true);

}

function main() {
  if (document.selection.Mode != meModeStream) {
    return
  }
  Redraw = false;
  expandSelection();
  Redraw = true;
}
main();