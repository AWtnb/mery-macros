// ------------------------------------------------------------
// 亀甲パーレンに
// ------------------------------------------------------------

function main() {
  if (document.Selection.Mode != meModeStream) {
    return;
  }

  if (document.Selection.IsEmpty) {
    return;
  }
  document.Selection.Text = document.Selection.Text.replace(/（/g, "〔").replace(/）/g, "〕");
}

main();
