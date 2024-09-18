// ------------------------------------------------------------
// 選択している文字から「先生」をトル
// ------------------------------------------------------------

function main() {
  if (document.Selection.Mode != meModeStream) {
    return;
  }

  if (document.Selection.IsEmpty) {
    return;
  }
  document.Selection.Text = document.Selection.Text.replace(/先生$/g, "").replace(/先生[・。、：；（）［］？！ ]/g, function (m) {
    return m.replace(/^先生/, "");
  });
}

main();
