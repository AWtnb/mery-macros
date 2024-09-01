// ------------------------------------------------------------
// 行頭に移動する
// ・折り返し状態での表示行頭で実行すると論理行頭に移動。
// ・インデント無しの行頭で実行すると段落先頭に移動。
// ------------------------------------------------------------

const selecting = true;

function getIndentDepth(s) {
  return s.length - s.replace(/^\s+/, "").length;
}

function toBOL () {

  const logicalX = document.selection.GetActivePointX(mePosLogical);
  const logicalY = document.selection.GetActivePointY(mePosLogical);
  const viewX = document.selection.GetActivePointX(mePosView);
  const viewY = document.selection.GetActivePointY(mePosView);
  const logicalLine = document.GetLine(logicalY, 1);
  const indentDepth = getIndentDepth(logicalLine);

  if (viewY == 1) {
    document.Selection.StartOfLine(selecting, mePosView);
    return;
  }

  document.Selection.StartOfLine(selecting, mePosView);
  if (logicalX == indentDepth+1) {
    return;
  }

  document.Selection.CharLeft(selecting, 1);
  const inSecondLine = document.Selection.GetActivePointY(mePosLogical) == logicalY;
  document.Selection.CharRight(selecting, 2);
  document.Selection.CharLeft(selecting, 1);

  if (inSecondLine) {
    if (viewX > 1) {
      return;
    }
    document.Selection.StartOfLine(selecting, mePosLogical);
  }

  if (indentDepth < 1) {
    return;
  }

  document.Selection.SetActivePoint(mePosLogical, indentDepth+1, logicalY, selecting);

}

function main() {
  if (document.Selection.Mode != meModeStream) {
    document.Selection.StartOfLine(selecting, mePosView);
    return;
  }
  // Redraw = false;
  toBOL();
  // Redraw = true;
}

main();
