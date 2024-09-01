// ------------------------------------------------------------
// 挨拶
// ------------------------------------------------------------

const wholeLines = document.text.split(/\r?\n/);
const max = wholeLines.length;

function main() {
  if (document.Selection.Mode != meModeStream) {
    return;
  }
  document.selection.StartOfDocument(false);
  document.selection.EndOfLine(false);
  if (wholeLines[0].replace(/先生$/, "") == wholeLines[0]) {
    document.Selection.Text = "先生";
  }
  if (1 < wholeLines.length && wholeLines[1].replace(/\s/g, "").length) {
    document.Selection.SetActivePoint(mePosLogical, 1, 2);
    document.selection.Text = "CC "
    document.selection.EndOfLine(false);
  }
  document.selection.NewLine(2);
  document.Selection.Text = "有斐閣の渡辺でございます。";
  document.selection.NewLine();
}

main();
