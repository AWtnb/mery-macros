// ------------------------------------------------------------
// インデント直後では逆インデント、それ以外は直前の1字を削除
// ------------------------------------------------------------

function selectLine() {
  document.selection.EndOfLine(false, mePosLogical);
  document.selection.StartOfLine(true, mePosLogical);
}

function getIndentDepth(s) {
  return s.length - s.replace(/^ +/, "").length;
}

function outdent() {
  const slct = document.selection;

  if (!slct.IsEmpty || slct.Mode != meModeStream) {
    slct.DeleteLeft(1);
    return;
  }

  const cursorX = slct.GetActivePointX(mePosLogical);
  const cursorY = slct.GetActivePointY(mePosLogical);
  const line = document.GetLine(cursorY, 1);
  const depth = getIndentDepth(line);

  if (!depth || depth != cursorX - 1) {
    slct.DeleteLeft(1);
    return;
  }

  selectLine();
  slct.UnIndent();

  const outdented = document.GetLine(cursorY, 1);
  document.selection.SetActivePoint(mePosLogical, getIndentDepth(outdented) + 1, cursorY);
}

function main() {
  // Redraw = false;
  outdent();
  // Redraw = true;
}

main();
