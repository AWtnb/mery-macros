// ------------------------------------------------------------
// 段落選択
// ------------------------------------------------------------

const wholeLines = document.text.split(/\r?\n/);
const max = wholeLines.length;
const blank = new RegExp("^ *$");

function isBlankLine(logicalY) {
  const logicalLine = wholeLines[logicalY-1];
  return blank.test(logicalLine);
}

function cursorUp(n) {
  const y = document.selection.GetActivePointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, 1, y-n, false);
}

function selectDown(n) {
  const y = document.selection.GetActivePointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, 1, y+n, true);
}

function moveToParagraphBeginning() {
  const y = document.selection.GetActivePointY(mePosLogical);
  let up = 0;
  for (let i = 1; i < y; i++) {
    if (isBlankLine(y-i)) {
      break;
    }
    up++
  }
  cursorUp(up);
}

function selectParagraphToEnd() {
  const y = document.selection.GetActivePointY(mePosLogical);
  let down = 0;
  for (let i = 1; i <= max-y; i++) {
    if (isBlankLine(y+i)) {
      break;
    }
    down++
  }
  selectDown(down);
  document.selection.EndOfLine(true, mePosLogical);
}

function expandSelection() {
  const y = document.selection.GetActivePointY(mePosLogical);
  if (isBlankLine(y)) {
    return;
  }
  if(document.selection.IsEmpty){
    moveToParagraphBeginning();
  }
  selectParagraphToEnd();
}


function main() {

  if (document.selection.Mode != meModeStream) {
    return;
  }
  Redraw = false;
  const sX = ScrollX
  const sY = ScrollY;
  expandSelection();
  ScrollX = sX;
  ScrollY = sY;
  Redraw = true;
}


main();
