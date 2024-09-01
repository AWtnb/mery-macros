// 行を下に移動
// https://www.haijin-boys.com/wiki/%E8%A1%8C%E3%82%92%E4%B8%8A%E4%B8%8B%E3%81%AB%E7%A7%BB%E5%8B%95%EF%BC%88Mery_2.7_%E7%94%A8%EF%BC%89
// 上記をベースに簡略化


function getSelection() {
  return document.selection;
}

function expandSelectionDown(ty, by) {
  getSelection().SetActivePoint(mePosLogical, 1, ty, false);
  getSelection().SetActivePoint(mePosLogical, 1, by + 1, true);
  getSelection().EndOfLine(true, mePosLogical);
}

function anchorToBottom(tx, ty, bx, by) {
  document.Selection.SetActivePoint(mePosLogical, tx, ty, false);
  document.Selection.SetActivePoint(mePosLogical, bx, by, true);
}

function lineMoveDown() {

  const tx = getSelection().GetTopPointX(mePosLogical);
  const ty = getSelection().GetTopPointY(mePosLogical);
  const bx = getSelection().GetBottomPointX(mePosLogical);
  const by = getSelection().GetBottomPointY(mePosLogical);

  if (by == document.GetLines(0)) {
    return;
  }

  if (ty != by && bx == 1) {
    anchorToBottom(tx, ty, bx, by);
    getSelection().CharLeft(true, 1);
    lineMoveDown(); // 再帰呼び出し
    return;
  }

  expandSelectionDown(ty, by);

  const array = getSelection().Text.split("\n");
  array.unshift(array.pop()); // pop で末尾を破壊的に取り出して unshift で先頭に追加
  getSelection().Text = array.join("\n");

  expandSelectionDown(ty + 1, by);

}

function main() {
  if (getSelection().Mode != meModeStream) {
    return;
  }

  BeginUndoGroup();

  lineMoveDown();

  EndUndoGroup();
  Redraw = true;

}

main()