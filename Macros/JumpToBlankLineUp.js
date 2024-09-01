// ----------------------------------------
// 空行までジャンプ（上）
// ----------------------------------------

const wholeLines = document.text.split(/\r?\n/);
const blank = new RegExp("^ *$");

function isBlankLine(logicalY) {
  const logicalLine = wholeLines[logicalY-1];
  return blank.test(logicalLine);
}

function cursorUp(n) {
  const y = document.selection.GetActivePointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, 1, y-n, false);
}

function toPreviousBlankLine() {
  const y = document.selection.GetActivePointY(mePosLogical);
  let up = y - 1;
  for (let i = 1; i < y; i++) {
    if (isBlankLine(y-i) && !isBlankLine(y-i-1)) {
      up = i;
      break;
    }
  }
  cursorUp(up);
}


function main() {

  if (document.selection.Mode != meModeStream) {
    return;
  }

  const y = document.selection.GetActivePointY(mePosLogical);

  if (y == 1) {
    document.selection.StartOfLine(false, mePosLogical)
    return;
  }

  toPreviousBlankLine();

}


main();
