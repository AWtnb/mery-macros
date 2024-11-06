// ------------------------------------------------------------
// 各行頭にmarkdownのリスト記号を入れる
// ------------------------------------------------------------

function main() {
  const symbol = "- ";
  if (document.selection.Mode != meModeStream) {
    return;
  }
  if (document.selection.isEmpty) {
    document.selection.text = symbol;
    return;
  }

  const sel = document.selection;
  const ty = sel.GetTopPointY(mePosLogical);
  const by = sel.GetBottomPointY(mePosLogical);

  document.selection.SetActivePoint(mePosLogical, 1, ty, false);
  document.selection.SetActivePoint(mePosLogical, 1, by, true);
  document.selection.EndOfLine(true);

  const t = document.selection.text;

  const lines = t.split("\n");
  const stack = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (0 < line.trim().length) {
      line = symbol + line;
    }
    stack.push(line);
  }
  document.selection.text = stack.join("\n");
}

main();
