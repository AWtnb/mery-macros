// ------------------------------------------------------------
// カーソルの直前2文字を「先生」にする
// ------------------------------------------------------------


function main() {
  if (document.Selection.Mode != meModeStream || !document.Selection.isEmpty) {
    return;
  }
  document.selection.DeleteLeft(2);
  document.Selection.Text = "先生";
}

main();
