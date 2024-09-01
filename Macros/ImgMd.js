// ------------------------------------------------------------
// markdown 画像書式の挿入
// ------------------------------------------------------------

function main () {
  if (document.Selection.Mode != meModeStream) {
    return;
  }
  document.Selection.Text = "![img](./)"
  document.Selection.CharLeft(false, 1);
}

main();