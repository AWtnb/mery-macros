// ------------------------------------------------------------
// 直前の句読点の前に移動する
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
  let up = startY - 1;
  for (let i = 1; i < startY; i++) {
    if (hasPunctuation(startY-i)) {
      up = i;
      break;
    }
  }
  setCursorPos(1, startY-up, selecting);
}

function moveCursor(selecting) {

  let cursorX = document.selection.GetActivePointX(mePosLogical);
  let cursorY = document.selection.GetActivePointY(mePosLogical);

  if (cursorX == 1) {
    if (cursorY == 1) {
      return;
    }
    jumpToLine(cursorY, selecting);
    document.selection.EndOfLine(selecting, mePosLogical);
    cursorY = document.selection.GetActivePointY(mePosLogical);
    cursorX = document.selection.GetActivePointX(mePosLogical);
  }

  const currentLine = getLogicalLine(cursorY);
  const strBeforeCursor = currentLine.slice(0, cursorX - 1);

  let delta = -1;
  for (let i = 0; i < strBeforeCursor.length; i++) {
    const c = strBeforeCursor[(strBeforeCursor.length - 1 - i)];
    const previous = strBeforeCursor[(strBeforeCursor.length - 1 - i - 1)];
    if (punc.indexOf(c) != -1 && punc.indexOf(previous) == -1) {
      delta = i;
      break;
    }
  }
  if (delta < 0) {
    delta = strBeforeCursor.length;
  }
  setCursorPos(cursorX-delta-1, cursorY, selecting);

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