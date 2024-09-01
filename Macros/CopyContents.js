// -----------------------------------------------------------------------------
// ファイル内容をコピーする
// -----------------------------------------------------------------------------

// function trimComment(s) {
//   const stack = [];
//   const lines = s.split(/\r?\n/);
//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     if (line.replace(/^ +/g, "").substring(0, 4) == "<!--") {
//       continue;
//     }
//     stack.push(line);
//   }
//   return stack.join("\n");
// }

function main() {
  const sX = ScrollX;
  const sY = ScrollY;
  const curPos = document.Selection.GetActivePos();
  Redraw = false;
  document.Selection.EndOfDocument();
  document.Selection.EndOfLine();
  if (document.Selection.GetActivePointX(mePosLogical) != 1) {
    document.selection.NewLine(2);
  }
  document.Selection.SelectAll();
  document.selection.Copy();
  document.selection.SetActivePos(curPos, false);
  ScrollX = sX;
  ScrollY = sY;
  Redraw = true;
}

main();
