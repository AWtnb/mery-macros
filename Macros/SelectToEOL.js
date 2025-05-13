// ------------------------------------------------------------
// 行末に移動する
// 折り返し末尾で実行すると論理行末に移動。
// ------------------------------------------------------------

const selecting = true;

function main() {
  const viewY = document.selection.GetActivePointY(mePosView);
  const viewX = document.selection.GetActivePointX(mePosView);
  if (viewX == document.getLine(viewY, meGetLineView).length + 1) {
    document.selection.EndOfLine(selecting, mePosLogical);
    return;
  }
  document.selection.EndOfLine(selecting, mePosView);
}

main();
