// ------------------------------------------------------------
// カーソルの直前3文字を「先生」にする
// ------------------------------------------------------------


function main() {
  if (document.Selection.Mode != meModeStream || !document.Selection.isEmpty) {
    return;
  }
  document.selection.DeleteLeft(3);
  document.Selection.Text = "先生";
}

main();
