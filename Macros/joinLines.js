// ------------------------------------------------------------
// 選択している行をつなぐ
// ------------------------------------------------------------

function main() {
  if (document.selection.Mode != meModeStream) {
    return;
  }
  if (document.selection.isEmpty || document.selection.text.indexOf("\n") == -1) {
    return;
  }
  document.selection.text = document.selection.text.replace(/(\r?\n)+/g, "");
}
main();
