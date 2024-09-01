// ------------------------------------------------------------
// 二倍ダーシ（――）の前後を入れ替える
// ------------------------------------------------------------


function main() {
  if (document.Selection.Mode != meModeStream || document.Selection.IsEmpty) {
    return;
  }
  const act = document.Selection.GetActivePos();
  const anc = document.Selection.GetAnchorPos();
  Redraw = false;
  const arr = document.selection.text.split("――");
  document.selection.text = arr[1] + "――" + arr[0];
  document.selection.SetAnchorPos(anc);
  document.selection.SetActivePos(act, true);
  Redraw = true;
}

main();
