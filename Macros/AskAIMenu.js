function toList(s) {
  const ret = [];
  const ss = s.split("\n");
  for (let i = 0; i < ss.length; i++) {
    const l = ss[i];
    if (0 < l.trim().length) {
      ret.push("- " + l);
    }
  }
  return ret.join("\n");
}

function main() {
  if (document.selection.Mode != meModeStream) {
    return;
  }

  if (document.selection.IsEmpty) {
    document.selection.SelectAll();
  }

  const menuArr = [
    ["Gemini", "つなげ方", "https://gemini.google.com/app", "「{}」の先のうまい言い回しが思いつきません"],
    ["ChatGPT", "つなげ方", "https://chat.openai.com/chat", "「{}」の先のうまい言い回しが思いつきません"],
    ["Gemini", "言い換え", "https://gemini.google.com/app", "「{}」の言い換え案を考えてください"],
    ["ChatGPT", "言い換え", "https://chat.openai.com/chat", "「{}」の言い換え案を考えてください"],
    ["Gemini", "メール文面", "https://gemini.google.com/app", "以下の内容を伝えるビジネスメールの文面を書いてください。\n------\n{}"],
    ["ChatGPT", "メール文面", "https://chat.openai.com/chat", "以下の内容を伝えるビジネスメールの文面を書いてください。\n------\n{}"],
  ];

  const menu = CreatePopupMenu();
  for (let i = 0; i < menuArr.length; i++) {
    const m = menuArr[i];
    menu.Add(m[0] + "\t" + m[1], i + 1);
  }

  const idx = menu.Track(0);
  if (idx < 1) {
    return;
  }

  const selected = menuArr[idx - 1];

  const t = toList(document.selection.Text);
  ClipboardData.SetData(selected[3].replace("{}", t));

  const shell = new ActiveXObject("WScript.Shell");
  shell.Run(selected[2]);
}

main();
