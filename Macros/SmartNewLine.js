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
  const trimmed = currentLine.replace(/^ +/, "");
  let symbol = "";
  if (["+", "*", "-", ">"].indexOf(trimmed.charAt(0)) != -1 && trimmed.charAt(1) == " ") {
    if (trimmed.length == 2) {
      document.selection.CharLeft(true, 2);
      document.selection.Delete();
      return;
    }
    symbol = trimmed[0] + " ";
  }
  else if (trimmed.indexOf("1. ") == 0) {
    symbol = "1. "
  }
  document.selection.NewLine();
  document.selection.text = symbol;
}

main();
