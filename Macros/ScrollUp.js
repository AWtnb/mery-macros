// ------------------------------------------------------------
// 現在のカーソル位置を上に持ってくる
// ------------------------------------------------------------

function main () {
  var currentLine = Document.Selection.GetActivePointY(mePosView);
  ScrollY = currentLine - 2;
}

main();