// ------------------------------------------------------------
// markdown コメントアウト
// ------------------------------------------------------------

function main () {
  if (document.Selection.Mode != meModeStream) {
    return;
  }

  if (document.Selection.IsEmpty) {
    document.Selection.StartOfLine(false, mePosLogical);
    document.Selection.EndOfLine(true, mePosLogical);
  }
  document.Selection.Text = "<!-- " + document.Selection.Text + " -->"

}

main();