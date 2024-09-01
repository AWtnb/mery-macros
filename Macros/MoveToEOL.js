// ------------------------------------------------------------
// 行末に移動する
// 折り返し末尾で実行すると論理行末に移動。
// ------------------------------------------------------------

const selecting = false;

function main () {
  const viewY = document.selection.GetActivePointY(mePosView);
  const viewX = document.selection.GetActivePointX(mePosView);
  const viewLine = document.getLine(viewY);
  const opt = (viewX == viewLine.length+1)? mePosLogical : mePosView;

  document.selection.EndOfLine(selecting, opt);
}

main();