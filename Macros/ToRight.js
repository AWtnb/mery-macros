// ------------------------------------------------------------
// カーソルを右に動かす
// 選択中であれば常に選択範囲の右に。
// ------------------------------------------------------------

function main() {
  if (document.selection.IsEmpty) {
    document.selection.CharRight();
    return;
  }
  if (document.selection.Mode != meModeStream) {
    const opt = document.selection.GetAnchorPos(0) < document.selection.GetActivePos(0) ? meCollapseEnd : meCollapseStart;
    document.selection.Collapse(opt);
    return;
  }
  const x = document.selection.GetBottomPointX(mePosLogical);
  const y = document.selection.GetBottomPointY(mePosLogical);
  document.selection.SetActivePoint(mePosLogical, x, y);
}

main();
