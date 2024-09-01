function main() {
  var sel = Document.Selection;
  if (sel.Text.indexOf("\n") < 0) {
    var x = sel.GetActivePointX(mePosLogical);
    var y = sel.GetActivePointY(mePosLogical);
    sel.SelectLine();
    var n = sel.Text.length;
    sel.Indent();
    sel.SetActivePoint(mePosLogical, x - (n - sel.Text.length), y);
  } else {
    sel.Indent();
  }
}
main();
