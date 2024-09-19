// ------------------------------------------------------------
// 選択している行をつなぐ
// ------------------------------------------------------------

function main() {
  if (document.selection.Mode != meModeStream) {
    return;
  }
  if (document.selection.isEmpty || document.selection.text.indexOf("\n") == -1) {
    document.selection.EndOfLine(false, mePosLogical);
    document.selection.Delete();
  } else {
    document.selection.text = document.selection.text.replace(/(\r?\n)+/g, "");
  }
}

main();
