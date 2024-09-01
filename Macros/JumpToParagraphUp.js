// ------------------------------------------------------------
// 前の段落までジャンプ
// ------------------------------------------------------------

const wholeLines = document.text.split(/\r?\n/);
const blank = new RegExp("^ *$");

function isBlankLine(logicalY) {
  const logicalLine = wholeLines[logicalY - 1];
  return blank.test(logicalLine);
}

function setCursorPos(x, y, selecting) {
  document.selection.SetActivePoint(mePosLogical, x, y, selecting);
}

function toParagraphBeginning(selecting) {
  const y = document.selection.GetActivePointY(mePosLogical);
  let up = y - 1;
  for (let i = 1; i < y; i++) {
    if (isBlankLine(y - i)) {
      up = i - 1;
      break;
    }
  }
  setCursorPos(1, y - up, selecting);
}

function toPreviousParagraphEnd(selecting) {
  const y = document.selection.GetActivePointY(mePosLogical);
  let up = y - 1;
  for (let i = 1; i < y; i++) {
    if (!isBlankLine(y - i)) {
      up = i;
      break;
    }
  }
  setCursorPos(1, y - up, selecting);
  document.selection.EndOfLine(selecting, mePosLogical);
}

function main(selecting) {
  if (document.selection.Mode != meModeStream) {
    return;
  }
  const x = document.selection.GetActivePointX(mePosLogical);
  const y = document.selection.GetActivePointY(mePosLogical);

  if (y == 1) {
    document.selection.StartOfLine(selecting, mePosLogical);
    return;
  }

  if (isBlankLine(y)) {
    toPreviousParagraphEnd(selecting);
    return;
  }

  if (isBlankLine(y - 1) && x == 1) {
    toPreviousParagraphEnd(selecting);
    return;
  }

  toParagraphBeginning(selecting);
}

main(false);
