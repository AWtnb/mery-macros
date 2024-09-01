// ------------------------------------------------------------
// markdown Bold
// ------------------------------------------------------------

function main () {
  if (document.Selection.Mode != meModeStream) {
    return;
  }
  const flag = document.selection.IsEmpty;
  document.Selection.Text = "**" + document.Selection.Text + "**"
  if (flag) {
    document.selection.CharLeft(false, 2);
  }

}

main();