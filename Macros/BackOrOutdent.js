// ------------------------------------------------------------
// インデント直後では逆インデント、それ以外は直前の1字（or 2字）を削除
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
  const cursorX = slct.GetActivePointX(mePosLogical);
  const cursorY = slct.GetActivePointY(mePosLogical);
  const line = document.GetLine(cursorY, 1);

  if (cursorX == 1 || !slct.IsEmpty || slct.Mode != meModeStream) {
    slct.DeleteLeft(1);
    return;
  }

  const lastChar = line.slice(cursorX - 2, cursorX - 1);
  if ("ゃゅょ".indexOf(lastChar) != -1 || (line.slice(cursorX - 3, cursorX - 2) == "ふ" && "ぁぃぅぇぉ".indexOf(lastChar) != -1)) {
    slct.DeleteLeft(2);
    return;
  }

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
