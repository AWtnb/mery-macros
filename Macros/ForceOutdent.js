function getLogicalLine(y) {
  const lines = document.text.split(/\r?\n/);
  return lines[y - 1];
}

function main() {
  var sel = Document.Selection;

  if (document.selection.Mode != meModeStream) {
    sel.UnIndent();
    return;
  }

  const anchor = sel.GetAnchorPos();
  const activeX = sel.GetActivePointX(mePosLogical);
  const activeY = sel.GetActivePointY(mePosLogical);

  const lineBefore = getLogicalLine(activeY);
  if (lineBefore.length < 1 || lineBefore.replace(/^\s+/, "") == lineBefore) {
    return;
  }

  sel.UnIndent();
  const lineAfter = getLogicalLine(activeY);

  const delta = lineBefore.length - lineAfter.length;
  sel.SetAnchorPos(anchor - delta);
  sel.SetActivePoint(mePosLogical, activeX - delta, activeY, true);
}

main();
