# [Mery](https://www.haijin-boys.com/wiki/) customize

## Install

```PowerShell
New-Item -Path ($env:LOCALAPPDATA | Join-Path -ChildPath "Programs\Mery\Macros") -Value ($pwd.Path | Join-Path -ChildPath "Macros") -ItemType Junction
```
