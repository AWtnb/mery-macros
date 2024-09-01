// ----------------------------------------
// 空行までジャンプ（下）
// ----------------------------------------

const wholeLines = document.text.split(/\r?\n/);
const max = wholeLines.length;
const blank = new RegExp("^ *$");

function isBlankLine(logicalY) {
  const logicalLine = wholeLines[logicalY-1];
  return blank.test(logicalLine);
}

function cursorDown(n) {
  const y = document.selection.GetActivePointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, 1, y+n, false);
}

function toNextBlankLine() {
  const y = document.selection.GetActivePointY(mePosLogical);
  let down = max - y;
  for (let i = 1; i <= max-y; i++) {
    if (isBlankLine(y+i) && !isBlankLine(y+i+1)) {
      down = i;
      break;
    }
  }
  cursorDown(down);
}


function main() {

  if (document.selection.Mode != meModeStream) {
    return;
  }

  const y = document.selection.GetActivePointY(mePosLogical);

  if (y == max) {
    document.selection.EndOfLine(false, mePosLogical)
    return;
  }

  toNextBlankLine();

}


main();
