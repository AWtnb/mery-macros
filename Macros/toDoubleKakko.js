// ------------------------------------------------------------
// 二重鍵括弧にする
// ------------------------------------------------------------

function main() {
  if (document.selection.Mode != meModeStream) {
    return;
  }
  if (document.selection.isEmpty) {
    return;
  }
  document.selection.text = document.selection.text.replace(/「/g, "『").replace(/」/g, "』");
}
main();
