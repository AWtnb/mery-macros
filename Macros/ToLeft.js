// ------------------------------------------------------------
// カーソルを左に動かす
// 選択中であれば常に選択範囲の左に。
// ------------------------------------------------------------

function main () {
  if (document.selection.IsEmpty) {
    document.selection.CharLeft();
    return;
  }
  if (document.selection.Mode != meModeStream) {
    document.selection.Collapse(meCollapseStart);
    return;
  }

  // Redraw = false;
  const x = document.selection.GetTopPointX(mePosLogical);
  const y = document.selection.GetTopPointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, x, y)
  // Redraw = true;
}

main();