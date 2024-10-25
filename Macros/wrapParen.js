// ------------------------------------------------------------
// （）で囲む
// ------------------------------------------------------------

function main () {
  if (document.Selection.Mode != meModeStream) {
    return;
  }
  document.Selection.Text = "（" + document.Selection.Text + "）"
  document.Selection.CharLeft(false, 1);
}

main();