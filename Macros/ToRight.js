// ------------------------------------------------------------
// カーソルを右に動かす
// 選択中であれば常に選択範囲の右に。
// ------------------------------------------------------------

function main () {
  if (document.selection.IsEmpty) {
    document.selection.CharRight();
    return;
  }
  if (document.selection.Mode != meModeStream) {
    document.selection.Collapse(meCollapseEnd);
    return;
  }

  // Redraw = false;
  const x = document.selection.GetBottomPointX(mePosLogical);
  const y = document.selection.GetBottomPointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, x, y)
  // Redraw = true;
}

main();