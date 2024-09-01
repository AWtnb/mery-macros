// ------------------------------------------------------------
// 直後の句読点の後ろに移動する
// ------------------------------------------------------------

const wholeLines = document.text.split(/\r?\n/);
const max = wholeLines.length;

const zen = "、，。；：「」『』【】（）〔〕《》〈〉［］・！？←↓↑→○●▲△▼▽◆◇■□★☆～／…―　";
const han = "[]().,=<>:;`'\" #/";
const punc = zen + han;

function getLogicalLine(y) {
  return wholeLines[y-1];
}

function hasPunctuation(logicalY) {
  const logicalLine = wholeLines[logicalY-1];
  for (let i = 0; i < logicalLine.length; i++) {
    const c = logicalLine[i];
    if (punc.indexOf(c) != -1) {
      return true;
    }
  }
  return false;
}

function setCursorPos(xLogical, yLogical, selecting) {
  document.selection.SetActivePoint(mePosLogical, xLogical, yLogical, selecting);
}

function jumpToLine(startY, selecting) {
  let down = max - startY;
  for (let i = 1; i <= max-startY; i++) {
    if (hasPunctuation(startY+i)) {
      down = i;
      break;
    }
  }
  setCursorPos(1, startY+down, selecting);
}

function moveCursor(selecting) {

  let cursorX = document.selection.GetActivePointX(mePosLogical);
  let cursorY = document.selection.GetActivePointY(mePosLogical);

  if (cursorX == getLogicalLine(cursorY).length + 1) {
    if (cursorY == max) {
      return;
    }
    jumpToLine(cursorY, selecting);
    cursorX = 1;
    cursorY = document.selection.GetActivePointY(mePosLogical);
  }

  const currentLine = getLogicalLine(cursorY);
  const strAfterCursor = currentLine.slice(cursorX - 1);

  let delta = -1;
  for (let i = 0; i < strAfterCursor.length; i++) {
    const c = strAfterCursor[i];
    const next = strAfterCursor[i+1];
    if (punc.indexOf(c) != -1 && punc.indexOf(next) == -1) {
      delta = i;
      break;
    }
  }
  if (delta < 0) {
    delta = strAfterCursor.length;
  }
  setCursorPos(cursorX+delta+1, cursorY, selecting);

}

function main() {

  if (document.selection.Mode != meModeStream) {
    return
  }

  if (!document.selection.IsEmpty) {
    document.selection.Collapse(meCollapseEnd);
    return
  }

  // Redraw = false;
  moveCursor(false);
  // Redraw = true;

}

main();