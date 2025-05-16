// https://www.haijin-boys.com/wiki/%E9%81%B8%E6%8A%9E%E7%AF%84%E5%9B%B2%E3%82%92%E8%A1%8C%E3%81%AB%E5%88%86%E3%81%91%E3%82%8B%E3%83%BB%E6%94%B9

function main() {
  const nSel = document.Selection.count;
  if (0 < nSel || document.Selection.IsEmpty) {
    return;
  }
  editor.ExecuteCommandByID((EditSplitSelIntoLines = 2254));
  document.Selection.Collapse(meCollapseEnd);
}

main();
