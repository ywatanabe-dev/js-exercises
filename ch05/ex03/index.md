### 可読性の違い

個人的な考えとしては、複数の条件の論理和による分岐が多くある場合はswitch、
単純な条件のみの分岐が多くある場合はif-elseを使った方が可読性が高くなると感じる。

例として、複数の条件の論理和による分岐が多くある場合の例は以下の通り。

- switch文で実装

  ```javascript
  // 月の数字or単語から季節を表示
  switch (month) {
    case 3:
    case 4:
    case 5:
    case "March":
    case "April":
    case "May":
      console.log("Spring");
      break;
    case 6:
    case 7:
    case 8:
    case "June":
    case "July":
    case "August":
      console.log("Summer");
      break;
    case 9:
    case 10:
    case 11:
    case "Semptember":
    case "October":
    case "November":
      console.log("Autumn");
      break;
    case 12:
    case 1:
    case 2:
    case "December":
    case "January":
    case "February":
      console.log("Winter");
      break;
  }
  ```

- if-elseで実装

  ```javascript
  // 月の数字or単語から季節を表示
  if (
    month === 3 ||
    month === 4 ||
    month === 5 ||
    month === "March" ||
    month === "April" ||
    month === "May"
  ) {
    console.log("Spring");
  } else if (
    month === 6 ||
    month === 7 ||
    month === 8 ||
    month === "June" ||
    month === "July" ||
    month === "August"
  ) {
    console.log("Summer");
  } else if (
    month === 9 ||
    month === 10 ||
    month === 11 ||
    month === "Semptember" ||
    month === "October" ||
    month === "November"
  ) {
    console.log("Autumn");
  } else if (
    month === 12 ||
    month === 1 ||
    month === 2 ||
    month === "December" ||
    month === "January" ||
    month === "February"
  ) {
    console.log("Winter");
  }
  ```

単純な条件のみの分岐が多くある場合の例は以下の通り。

- switch文で実装

  ```javascript
  // 入力された数字を英語で表示
  switch (x) {
    case 1:
      console.log("one");
      break;
    case 2:
      console.log("two");
      break;
    case 3:
      console.log("three");
      break;
    case 4:
      console.log("four");
      break;
    case 5:
      console.log("five");
      break;
  }
  ```

- if-elseで実装

  ```javascript
  // 入力された数字を英語で表示
  if (x === 1) {
    console.log("one");
  } else if (x === 2) {
    console.log("two");
  } else if (x === 3) {
    console.log("three");
  } else if (x === 4) {
    console.log("four");
  } else if (x === 5) {
    console.log("five");
  }
  ```
