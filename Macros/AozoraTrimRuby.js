function main() {
  if (document.selection.IsEmpty) {
    document.selection.SelectAll();
  }
  const t = document.selection.Text;
  document.selection.Text = t
    .replace(/《.+?》/g, "")
    .replace(/｜/g, "")
    .replace(/［＃.+?］/g, "");
}

main();
