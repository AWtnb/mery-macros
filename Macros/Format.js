// 体裁を自己流に整える

function formatPrefixSpace(s) {
  return s.replace(/[^a-zA-Z \r\n][a-zA-Z]+/g, function (m) {
    if ("。、：；，．」］）〉》】〕』".indexOf(m.charAt(0)) != -1) {
      return m;
    }
    return m.charAt(0) + " " + m.substring(1);
  });
}

function formatSuffixSpace(s) {
  return s.replace(/[a-zA-Z]+[^a-zA-Z \r\n]/g, function (m) {
    if ("「［（《〈【〔』".indexOf(m.charAt(m.length - 1)) != -1) {
      return m;
    }
    return m.substring(0, m.length - 1) + " " + m.charAt(m.length - 1);
  });
}

function formatMultiSpaces(s) {
  return s.replace(/[^ ] +[^ ]/g, function (m) {
    return m.charAt(0) + " " + m.charAt(m.length - 1);
  });
}

function formatHeading(s) {
  return s
    .replace(/\n■/gm, "\n\n\n■")
    .replace(/\n{3,}■/gm, "\n\n\n■")
    .replace(/\n■(.+?)\n/gm, "\n■$1\n\n")
    .replace(/\n■(.+?)\n{2,}/gm, "\n■$1\n\n");
}

function main() {
  if (document.Selection.isEmpty) {
    return;
  }
  const sX = ScrollX;
  const sY = ScrollY;
  const curPos = document.Selection.GetActivePos();
  Redraw = false;
  let t = document.Selection.text;
  t = formatPrefixSpace(t);
  t = formatSuffixSpace(t);
  t = formatMultiSpaces(t);
  t = formatHeading(t);
  document.Selection.text = t;
  document.selection.SetActivePos(curPos, false);
  ScrollX = sX;
  ScrollY = sY;
  Redraw = true;
}

main();
