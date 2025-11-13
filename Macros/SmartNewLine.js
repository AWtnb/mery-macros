// ------------------------------------------------------------
// 約物を補完して改行
// ------------------------------------------------------------

const wholeLines = document.text.split(/\r?\n/);

function getIndentDepth(s) {
  return s.length - s.replace(/^ +/, "").length;
}

function getLogicalLine(y) {
  return wholeLines[y - 1];
}

function main() {
  if (document.Selection.Mode != meModeStream || document.selection.GetActivePointX(mePosLogical) == 1 || !document.Selection.IsEmpty) {
    document.selection.NewLine();
    return;
  }
  let cursorY = document.selection.GetActivePointY(mePosLogical);
  const currentLine = getLogicalLine(cursorY);
  const nonIndent = currentLine.replace(/^ +/, "");
  let symbol = "";
  if (["+ ", "* ", "- ", "> "].indexOf(nonIndent.slice(0, 2)) != -1) {
    if (nonIndent.length == 2 && nonIndent != "> ") {
      document.selection.CharLeft(true, 2);
      document.selection.Delete();
      return;
    }
    symbol = nonIndent[0] + " ";
  }
  else if (nonIndent.indexOf("1. ") == 0) {
    symbol = "1. "
  }
  document.selection.NewLine();
  document.selection.text = symbol;
}

main();
