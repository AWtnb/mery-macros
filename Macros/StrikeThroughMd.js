// ------------------------------------------------------------
// markdown 打ち消し線
// ------------------------------------------------------------

function main () {
  if (document.Selection.Mode != meModeStream) {
    return;
  }

  if (!document.Selection.IsEmpty) {
    document.Selection.Text = "~~" + document.Selection.Text + "~~"
  }

}

main();