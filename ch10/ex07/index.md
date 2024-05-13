### date-fnsの場合

date-fnsの/src以下は、さらに細分化されたディレクトリに分かれており、それぞれに実際に使われてるモジュールのコードと、そのテストコードが含まれている構成になっている。

それぞれのモジュールのコードは、基本的に一つの関数をexportするように実装されており、逆に別のモジュールの関数を呼ぶ際は相対パス`../(モジュール名)/index.js`の形でimportしている。

### Luxonの場合

Luxonの/src以下は、直下にある幾つかの`.js`ファイルと、/implディレクトリ、/zonesディレクトリによって構成される。

/src直下にある`.js`ファイルは、以下のように基本的にはクラス単位でモジュールに分割されている。

1. datetime.js: `Datetime`クラスがexportされている。

2. errors.js: 標準ライブラリクラス`Error`から派生した`LuxonError`クラス及び、`LuxonError`クラスから派生したいくつかのクラスがexportされている。

3. info.js: `Info`クラスがexportされている。

4. interval.js: `Interval`クラスがexportされている。

5. luxon.js: /src以下でexportされているクラスをまとめて再エクスポートしている。

6. setting.js: `Settings`クラスがexportされている。

7. zone.js: `Zone`クラスがexportされている。

/implディレクトリには、各種ユーティリティ関数が大まかな用途ごとに各モジュールに分けられ、それぞれexportされている。

/zoneディレクトリには、`Zone`クラスから派生した`IANAZone`クラス、`FixedOffsetZone`クラス、`InvalidZone`クラス、`SystemZone`クラスがそれぞれ定義されたIANAZone.js、fixedOffsetZone.js、invalidZone.js、systemZone.jsが置かれている。

### Day.jsの場合

Day.jsの/src以下は、直下にあるconstant.js、index.js、utils.jsと、/localeディレクトリ、/pluginディレクトリによって構成される。

constant.jsでは、プログラム中で使われる各種定数をexportしている。

index.jsでは、`Dayjs`クラスのインスタンスを`prototype`プロパティに持つ関数(すなわち、`Dayjs`クラスのコンストラクタ)をexportしている。

utils.jsでは、各種ユーティリティ関数を一つのオブジェクトのプロパティとしてまとめ、そのオブジェクトをデフォルトエクスポートしている。

/localeディレクトリには、各ロケールごとにモジュール分割された暦の表現が含まれる。それぞれのモジュールは、暦の表現のプロパティを含んだオブジェクトをデフォルトエクスポートしている。

/pluginディレクトリには、Day.jsの機能を拡張するための各種プラグイン[^1]の実装が含まれている。各プラグインは、それぞれ別のディレクトリに分割され、ディレクトリ内にあるindex.jsにて関数の形でexportされている。

[^1]: https://github.com/iamkun/dayjs/tree/dev?tab=readme-ov-file#plugin
