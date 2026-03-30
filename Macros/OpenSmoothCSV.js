function main() {
  const wshShell = new ActiveXObject("WScript.Shell");
  const fso = new ActiveXObject("Scripting.FileSystemObject");
  const smoothCSV = "C:\\Program Files\\SmoothCSV\\smoothcsv-app.exe";
  const path = document.fullname;
  if (fso.FileExists(smoothCSV)) {
    wshShell.Run('"' + smoothCSV + '" "' + path + '"');
    window.close();
  } else {
    alert("'" + smoothCSV + "' が存在しません！");
  }
}

main();
