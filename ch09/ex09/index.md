## Single Responsibility Principle [^1]

それぞれのクラスが単一の責務のみを持つようにする原則。

一つのクラスが複数の責務を持つと、そのうちの一つの責務が変更された時、他の責務に影響が及ぶ可能性がある。あるクラスを変更する理由が複数考えられるのであれば、そのクラスには複数の責務があると思われるので、責務ごとにクラスを分離することが望ましい。

具体的な例を以下に示す。

```javascript
class BarChart {
  constructor() {
    this.data = new Map();
  }

  setData(element, amount) {
    data.set(element, amount);
  }

  getData(element) {
    return data.get(element);
  }

  deleteData(element) {
    data.delete(element);
  }

  getElements() {
    return data.keys();
  }

  viewChart() {
    // GUIで棒グラフを表示する
  }
}
```

上のコードは、棒グラフを表現するクラスの例である。このコードは、棒グラフの中身のデータの編集・取得をするメソッド(`setData`、`getData`、`deleteData`、`getElements`)と、棒グラフを画面に描画するメソッド`viewChart`が含まれている。よって、このクラスは「棒グラフのデータを管理する」「棒グラフを表示する」という二つの責務を持つため、Single Responsibility Principleを満たさない。クラス内部でどのようにデータを扱うかの設計を変えたい場合、棒グラフのGUIの設計を変えたい場合、どちらもクラスの変更が必要になってしまう。

このコードをSingle Responsibility Principleを満たすように変更した例を以下に示す。

```javascript
class BarChart {
  constructor() {
    this.data = new Map();
  }

  setData(element, amount) {
    data.set(element, amount);
  }

  getData(element) {
    return data.get(element);
  }

  deleteData(element) {
    data.delete(element);
  }

  getElements() {
    return data.keys();
  }
}

class BarChartView {
  constructor() {
    this.graph = new BarChart();
  }

  viewChart() {
    // GUIで棒グラフを表示する
  }
}
```

この修正により、二つの責務をそれぞれ別のクラスに持たせることを実現している。

## Open-Closed Principle[^2]

クラス、モジュール、関数などは、拡張に対してはオープンであるべきだが、変更に対しては閉じているべきであるという原則。

プログラムのある要素が変更されたとき、その要素に依存する他の要素も同時に変更する必要が出ると、プログラムの再利用性が悪くなる。これを防ぐためには、「拡張可能でありながら、変更されることのないコード」を実装する必要がある。このような実装は、文法として継承機構を持つ言語の場合、抽象クラスを不変にし、その派生クラスで拡張を行うことで実現できる。

具体的な例を以下に示す。

```typescript
class Rectangle {
  private width: number;
  private height: number;
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Circle {
  private radius: number;
  constructor(radius) {
    this.radius = radius;
  }
}

function getPerimiter(shape: Rectangle | Circle) {
  if (shape instanceof Rectangle) {
    return width * 2 + height * 2;
  } else {
    return 2 * 3.14 * radius;
  }
}

function getArea(shape: Rectangle | Circle) {
  if (shape instanceof Rectangle) {
    return width * height;
  } else {
    return 3.14 * radius * radius;
  }
}
```

上記の例では、入力された図形の周長を取得する関数`getPerimiter`、面積を取得する関数`getArea`を実装している。
この実装方法では、図形の種類が増えるたびに`getPerimiter`、`getArea`の実装を変えねばならないため、Open-Closed Principleを満たしていない。

このコードをOpen-Closed Principleを満たすように変更した例を以下に示す。

```typescript
interface Shape {
  perimiter(): number;
  area(): number;
}

class Rectangle extends Shape {
  private width: number;
  private height: number;
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  perimiter(): number {
    return width * 2 + height * 2;
  }

  area(): number {
    return width * height;
  }
}

class Circle extends Shape {
  private radius: number;
  constructor(radius) {
    this.radius = radius;
  }

  perimiter(): number {
    return 2 * 3.14 * radius;
  }

  area(): number {
    return 3.14 * radius * radius;
  }
}

function getPerimiter(shape: Shape) {
  return shape.perimiter();
}

function getArea(shape: Shape) {
  return shape.area();
}
```

`perimiter`メソッドと`area`を持つインターフェース`Shape`を導入し、`getPerimiter`、`getArea`ではそれぞれ対応するメソッドを呼び出すようにしている。この変更により、新しい種類の図形を都度増やすことができる一方で、それに依存する関数の変更は必要なくなる。

## Liskov Substitution Principle[^3]

基底クラスのオブジェクトを使用する処理は、その派生クラスのオブジェクトについて内容を知らずとも同じように使用できなければならないという原則。

言い換えると、「クラスSのオブジェクトo1に対して、クラスTのオブジェクトo2が存在し、Tに関して定義されたすべてのプログラムPに対して、o1をo2に代入してもPの動作が変わらないような場合、SはTのサブタイプである」と定義できる。

この原則に違反する場合、基底クラスを使う処理はその派生クラスについて全て知る必要が生じるため、派生クラスが増えるたびに修正が必要となる。そのため、同時にOpen-Closed Principleにも反することになる。

具体的な例を以下に示す。

```typescript
interface T {}

class S1 extends T {
  func1();
}

class S2 extends T {
  func2();
}

function f(obj: T) {
  if (obj instanceof S1) {
    obj.func1();
  }
  if (obj instanceof S2) {
    obj.func2();
  }
}
```

この例では、インターフェース`T`を継承したクラス`S1`、`S2`と、型`T`の変数`obj`を引数とする関数`f`を定義し、`obj`の実行時の型に応じてそれぞれのクラスのメソッド`func1`、`func2`を呼び出している。この実装では、`f`が引数の型のそれぞれの派生型について知っている必要があり、Liskov Substitution Principleに違反する。

このコードをLiskov Substitution Principleを満たすように変更した例を以下に示す。

```typescript
interface T {
  func();
}

class S1 extends T {
  func() {
    // 変更前のfunc1()の実装
  }
}

class S2 extends T {
  func() {
    // 変更前のfunc2()の実装
  }
}

function f(obj: T) {
  obj.func();
}
```

基底型`T`で`func`メソッドを定義し、`S1`、`S2`でオーバーライドすることで、Liskov Substitution Principleを満たしながら前述のコードと同様の処理を実現している。

## Dependency Inversion Principle[^4]

以下の二つを満たす原則。

1. 高レベルモジュールは低レベルモジュールに依存すべきではない。どちら(高レベル・低レベル)も抽象化に依存すべきである。
1. 抽象化は詳細に依存すべきではない。詳細は抽象化に依存すべきである。

具体的な例を以下に示す。

```typescript
class PrintFile {
  private reader;
  constructor() {
    this.reader = new FileReader();
  }

  // 画面表示に関する処理を実装
}

class FileReaderForDevelop {
  getChar(): string {
    // 開発環境でファイルからテキストを読み込む処理
  }
}
```

上記の実装は、ファイルの内容を画面に表示する責務を持つ`PrintFile`クラスと、開発環境下でファイルからテキストを読み込む処理を行う`FileReaderForDevelop`クラスで構成される。処理の流れとしては、`PrintFile`クラスの画面を表示する処理で`FileReader`クラスの`getChar`関数が呼ばれ、ファイルの文字が渡されていく仕組みである。

このプログラムは、本来であれば様々な環境で使える「文字を取得して表示する」処理を担う`PrintFile`が、特定の環境下でしか動作しない`FileReaderForDevelop`に依存してしまっている。すなわち、高レベルモジュールが低レベルモジュールに依存している状態であり、Dependency Inversion Principleを満たさないことになる。

このコードをDependency Inversion Principleを満たすように変更した例を以下に示す。

```typescript
interface FileReader {
  getChar(): string;
}

class PrintFile {
  private reader;
  constructor(reader: FileReader) {
    this.reader = reader;
  }

  // 画面表示に関する処理を実装
}

class FileReaderForDevelop extends FileReader {
  getChar(): string {
    // 開発環境でファイルからテキストを読み込む処理
  }
}
```

インターフェース`FileReader`を新たに作成し、`FileReaderForDevelop`はその具象クラスとした。また、`PrintFile`のコンストラクタで`FileReader`型のオブジェクトを受け取るようにし、`PrintFile`からは抽象化された`FileReader`クラスにのみ依存するようにしている。`FileReaderForDevelop`型をはじめとした派生クラスのオブジェクトを渡すことで、環境によって処理を切り替えることができる。

この変更により、以下のようにDependency Inversion Principleを満たすための条件が成り立つ。

- 高レベルモジュール(`PrintFile`)は低レベルモジュール(`FileReaderForDevelop`)に依存していない。また、
  どちらも抽象化(`FileReader`)に依存している。
- 詳細(`FileReaderForDevelop`)は抽象化(`FileReader`)に依存している。

## Interface Segregation Principle[^5]

クライアントは、使用しないインターフェイスに依存することを強いられるべきではない、という原則。

具体的な例を以下に示す。

```typescript
class ReadableFile {
  read(): string {
    // ファイル読み込み
  }
}

class WritableFile extends ReadableFile {
  write(input: string) {
    // ファイル書き込み
  }
  override read(): string {
    throw Error(); // read関数は使えないようにする
  }
}

class ReadableWritableFile extends WritableFile {
  override read(): string {
    // ファイル読み込み
  }
}
```

このコードでは、ファイルの読み込みをするクラス`ReadableFile`、ファイルへの書き込みをするクラス`WritableFile`、ファイルの読み書きをするクラス`ReadableWritableFile`からなる。

`ReadableFile`クラスはファイルの中身を読み込む関数`read`、`WritableFile`クラスはファイルにデータを書き込む関数`write`をそれぞれ持つ。

`ReadableWritableFile`クラスでこの二つの関数のインターフェースを使うために、`WritableFile`クラスを`ReadableFile`クラスの派生クラスに、`ReadableWritableFile`クラスを`WritableFile`クラスの派生クラスにしている。

しかし、この方法を使うと、本来`WritableFile`クラスでは不要な`read`関数まで継承されるため、上記の例のように無効な関数としてオーバーライドする必要がある。このような設計は、「使用しないインターフェイスに依存することを強いられるべきではない」というInterface Segregation Principleに反する。

このコードをInterface Segregation Principleを満たすように変更した例を以下に示す。

```typescript
class ReadableFile {
  read(): string {
    // ファイル読み込み
  }
}

class WritableFile {
  write(input: string) {
    // ファイル書き込み
  }
}

class ReadableWritableFile {
  private reader;
  private writer;

  constructor() {
    this.reader = new ReadableFile();
    this.writer = new WritableFile();
  }

  read(): string {
    return this.reader.read();
  }

  write(input: string) {
    return this.writer.write(input);
  }
}
```

こちらの実装では、初めの実装と異なり、それぞれのクラスに継承関係はない。代わりに、`ReadableWritableFile`クラスのメソッドで実行される処理をそれぞれ`ReadableFile`クラス、`WritableFile`クラスのメソッドに委譲している。

この実装では、先ほどの例のように`WritableFile`クラスに不必要なインターフェースが作られることもなく、それぞれのクラスが必要なインターフェースだけを持つ構造になる。よって、Interface Segregation Principleが満たされる。

この委譲を用いる方法以外にも、多重継承の文法を持つ言語(C++等)であれば、`ReadableFile`クラスと`WritableFile`クラスを多重継承して`ReadableWritableFile`クラスを作ることで、Interface Segregation Principleを満たした実装を実現できる。

[^1]: https://web.archive.org/web/20150202200348/http://www.objectmentor.com/resources/articles/srp.pdf
[^2]: https://web.archive.org/web/20150905081105/http://www.objectmentor.com/resources/articles/ocp.pdf
[^3]: https://web.archive.org/web/20150905081111/http://www.objectmentor.com/resources/articles/lsp.pdf
[^4]: https://web.archive.org/web/20150905081103/http://www.objectmentor.com/resources/articles/dip.pdf
[^5]: https://web.archive.org/web/20150905081110/http://www.objectmentor.com/resources/articles/isp.pdf
