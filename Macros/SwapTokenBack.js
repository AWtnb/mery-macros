// ------------------------------------------------------------
// 中黒点区切りの前後を入れ替える（後方）
// ------------------------------------------------------------

function selectLine() {
  document.selection.EndOfLine(false, mePosLogical);
  document.selection.StartOfLine(true, mePosLogical);
}

function removeElem(arr, skipIdx) {
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == skipIdx) {
      continue;
    }
    const e = arr[i];
    stack.push(e);
  }
  return stack;
}

function insertElem(arr, idx, elem) {
  if (arr.length - 1 < idx) {
    arr.push(elem);
    return arr;
  }
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == idx) {
      stack.push(elem);
    }
    const e = arr[i];
    stack.push(e);
  }
  return stack;
}

function swap() {
  const x = document.selection.GetActivePointX(mePosLogical);
  const y = document.selection.GetActivePointY(mePosLogical);
  const line = document.GetLine(y, 1).replace(/\n$/, "");

  const sep = "・";
  const ss = line.split(sep);
  if (ss.length < 2) {
    return;
  }

  const stack = [];
  let foundIdx = -1;
  for (let i = 0; i < ss.length; i++) {
    const s = ss[i];
    stack.push(s);
    if (x <= stack.join(sep).length) {
      foundIdx = i;
      break;
    }
  }
  if (foundIdx < 1) {
    return;
  }

  const target = ss[foundIdx];
  const prev = ss[foundIdx - 1];
  const rest = removeElem(ss, foundIdx);
  const newLine = insertElem(rest, foundIdx - 1, target).join(sep);

  selectLine();
  document.selection.text = newLine;
  document.selection.SetActivePoint(mePosLogical, x - prev.length - 1, y);
}

function main() {
  if (document.Selection.Mode != meModeStream || !document.Selection.IsEmpty) {
    return;
  }
  swap();
}

main();
