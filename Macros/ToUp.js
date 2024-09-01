// ------------------------------------------------------------
// カーソルを上に動かす
// 選択中であれば常に選択範囲の上端に。
// ------------------------------------------------------------

function main () {
  if (document.selection.IsEmpty || document.selection.Mode != meModeStream) {
    document.selection.LineUp();
    return;
  }

  // Redraw = false;
  const x = document.selection.GetTopPointX(mePosLogical);
  const y = document.selection.GetTopPointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, x, y)
  // Redraw = true;
}

main();