// ------------------------------------------------------------
// 行末に移動する
// 折り返し末尾で実行すると論理行末に移動。
// ------------------------------------------------------------

const selecting = false;

function main() {
  const viewY = document.selection.GetActivePointY(mePosView);
  const viewX = document.selection.GetActivePointX(mePosView);
  let flag = mePosView;
  if (viewX == document.getLine(viewY, meGetLineView).length + 1) {
    flag = mePosLogical;
  }
  document.selection.EndOfLine(selecting, flag);
}

main();
