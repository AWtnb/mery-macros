// ------------------------------------------------------------
// 対応するカッコ内を入力
// ------------------------------------------------------------

const bracePairs = {
  "（": "）",
  "「": "」",
  "［": "］",
  "〔": "〕",
  "『": "』",
  "【": "】",
  "〈": "〉",
  "《": "》",
};
const openBraces = Object.keys(bracePairs).map(function (key) {
  return String(key);
});
const closeBraces = Object.keys(bracePairs).map(function (key) {
  const closeBrc = bracePairs[key];
  return String(closeBrc);
});

function findBraceToInsert(line) {
  let closeBrace = "";
  for (let i = 0; i < line.length; i++) {
    const c = line.charAt(line.length - i - 1);
    if (openBraces.indexOf(c) != -1) {
      closeBrace = bracePairs[c];
      break;
    }
  }
  return closeBrace;
}

function main() {
  if (document.selection.Mode != meModeStream) {
    return;
  }

  const logicalX = document.selection.GetActivePointX(mePosLogical);
  const logicalY = document.selection.GetActivePointY(mePosLogical);
  const logicalLine = document.GetLine(logicalY, 1);

  const strFromBOL = logicalLine.slice(0, logicalX - 1);
  const b = findBraceToInsert(strFromBOL);
  if (b.length < 1) {
    return;
  }

  document.selection.text = b;
}
main();
