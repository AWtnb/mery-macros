function getAlt(s) {
  if (s == "。") {
    return "、";
  }
  if (s == "、") {
    return "。";
  }
  if (s == "；") {
    return "：";
  }
  if (s == "：") {
    return "；";
  }
  return s;
}

function main() {
  if (!document.selection.IsEmpty || document.selection.Mode != meModeStream) {
    return;
  }
  document.Selection.CharLeft(true);
  const sel = document.Selection;
  const alt = getAlt(sel.Text);
  if (sel != alt) {
    document.Selection.Text = alt;
  }
}

main();
