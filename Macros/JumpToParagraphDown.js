// ------------------------------------------------------------
// 次の段落までジャンプ
// ------------------------------------------------------------

const wholeLines = document.text.split(/\r?\n/);
const max = wholeLines.length;
const blank = new RegExp("^ *$");

function isBlankLine(logicalY) {
  const logicalLine = wholeLines[logicalY - 1];
  return blank.test(logicalLine);
}

function setCursorPos(x, y, selecting) {
  document.selection.SetActivePoint(mePosLogical, x, y, selecting);
}

function toParagraphEnd(selecting) {
  const y = document.selection.GetActivePointY(mePosLogical);
  let down = max - y;
  for (let i = 1; i <= max - y; i++) {
    if (isBlankLine(y + i)) {
      down = i - 1;
      break;
    }
  }
  setCursorPos(1, y + down, selecting);
  document.selection.EndOfLine(selecting, mePosLogical);
}

function toNextParagraphBeginning(selecting) {
  const y = document.selection.GetActivePointY(mePosLogical);
  let down = max - y;
  for (let i = 1; i <= max - y; i++) {
    if (!isBlankLine(y + i)) {
      down = i;
      break;
    }
  }
  setCursorPos(1, y + down, selecting);
}

function main(selecting) {
  if (document.selection.Mode != meModeStream) {
    return;
  }

  const x = document.selection.GetActivePointX(mePosLogical);
  const y = document.selection.GetActivePointY(mePosLogical);
  const line = wholeLines[y - 1];

  if (y == max) {
    document.selection.EndOfLine(selecting, mePosLogical);
    return;
  }

  if (isBlankLine(y)) {
    toNextParagraphBeginning(selecting);
    return;
  }

  if (isBlankLine(y + 1) && x == line.length + 1) {
    toNextParagraphBeginning(selecting);
    return;
  }

  toParagraphEnd(selecting);
}

main(false);
