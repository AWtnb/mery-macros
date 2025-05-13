function main() {
  const wshShell = new ActiveXObject("WScript.Shell");
  const fso = new ActiveXObject("Scripting.FileSystemObject");
  const draft = wshShell.ExpandEnvironmentStrings("%USERPROFILE%\\Personal\\draft.txt");
  if (fso.FileExists(draft)) {
    wshShell.Run(draft);
  } else {
    alert("'" + draft + "' が存在しません！");
  }
}

main();
