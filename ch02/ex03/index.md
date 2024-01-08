### NFC・NFDで文字列リテラルを表記する

`index.ts`にNFC・NFDそれぞれの形式で「パン」を表記した。
このプログラムを実行すると、

```
パン
パン
```

と出力され、両者が表示の上では同一であることが分かる。

### NFCでファイル名が保存されるOS

NFC形式の「パ」をUTF-8のバイト列で表現すると、以下のようになる。

```javascript
> Array.from(new TextEncoder().encode("\u{30d1}\u{30f3}")).map(num => num.toString(16))
[ 'e3', '83', '91', 'e3', '83', 'b3' ]
```

Windows11では、メモ帳で「パン.txt」を作成して保存すると以下のようなバイト列の名前のファイルが作成される。
前半部分の値から、NFC形式で保存されていることがわかる。

```powershell
> Get-ChildItem -Filter "*.txt" -Name | Format-Hex -Encoding utf8


           00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F

00000000   E3 83 91 E3 83 B3 2E 74 78 74
```

### NFDでファイル名が保存されるOS

NFD形式の「パ」をUTF-8のバイト列で表現すると、以下のようになる。

```javascript
> Array.from(new TextEncoder().encode("\u{30cf}\u{309a}\u{30f3}")).map(num => num.toString(16))
[
  'e3', '83', '8f',
  'e3', '82', '9a',
  'e3', '83', 'b3'
]
```

macOS14では、VSCodeで「パン.txt」を作成して保存すると以下のようなバイト列の名前のファイルが作成される。
前半部分の値から、NFD形式で保存されていることがわかる。

```bash
% ls -1 | grep .txt | od -tx1
0000000    e3  83  8f  e3  82  9a  e3  83  b3  2e  74  78  74  0a
```

一方、Terminal上からtouchコマンド等を使用して「パン.txt」を作成すると、以下のようなバイト列の名前のファイルが作成される。こちらはNFC形式で保存されていることがわかる。

```bash
% ls -1 | grep .txt | od -tx1
0000000    e3  83  91  e3  83  b3  2e  74  78  74  0a
```

両者に違いが出る理由は、後者がopen(2)システムコールを直接使ってファイルを作成しているのに対し、
前者はその上のレイヤにあるmacOSのAPIを使用してファイルを作成しているためと考えられる。
現在のmacOSが採用しているAPFSでは、ファイル名の正規化を変更せずそのまま保持する[^1]ため、上記のように二種類の正規化によるファイル名が保存されうる。

[^1]: https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/APFS_Guide/FAQ/FAQ.html
