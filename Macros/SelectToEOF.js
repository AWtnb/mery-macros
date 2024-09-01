// ------------------------------------------------------------
// 現在位置からファイル末尾まで選択（スクロール位置保存）
// ------------------------------------------------------------

function main() {
    const sX = ScrollX
    const sY = ScrollY;
    const curPos = document.Selection.GetActivePos();
    Redraw = false;
    document.selection.EndOfDocument();
    document.selection.SetActivePos(curPos, true);
    ScrollX = sX;
    ScrollY = sY;
    Redraw = true;
}

main();