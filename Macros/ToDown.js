// ------------------------------------------------------------
// カーソルを下に動かす
// 選択中であれば常に選択範囲の下端に。
// ------------------------------------------------------------

function main () {
  if (document.selection.IsEmpty || document.selection.Mode != meModeStream) {
    document.selection.LineDown();
    return;
  }

  // Redraw = false;
  const x = document.selection.GetBottomPointX(mePosLogical);
  const y = document.selection.GetBottomPointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, x, y)
  // Redraw = true;
}

main();