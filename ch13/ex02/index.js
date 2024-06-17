import {
  wait,
  wait1,
  wait2,
  wait3,
  log,
  logA,
  logB,
  logC,
  errX,
  errY,
} from "../util.js";

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  //
  // 予想：即座にAが出力され、その後Error("X")がハンドリングできずプログラムが止まる。
  //
  // 結果：同期処理としてtry{}の後のfinally{}内の処理でCが出力された後、
  // 非同期処理で後に回されたwait(0)が一瞬で解決して即座にAが出力される。
  // その後Error("X")がハンドリングできずプログラムが止まる。
  // (あくまでtry{}でcatchできるのは同期処理のerrorのみのため)
  //
  //   wait0
  //   |-|
  //     logA
  //     |-|
  //
  //
  // logC
  // |-|
  //
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  //
  // 予想：2秒の待ちの後にAが表示され、二個目のthen()に渡されるPromiseは40ですぐ解決し、満たされる。
  // 四個目のthen()に渡されるPromiseはwait(1000).then()の返すPromiseで解決されるが、
  // すぐには満たされない。
  // その後、1秒の待ちがあり、Bが表示され、四個目のthen()に渡されるPromiseは100で満たされる。
  // そして、最終的に100が表示される。
  //
  // 結果：予想の通り。初めのAが起動2秒後に表示されるのは、1個目のthen内のタスクに渡されるPromiseが、
  // 2秒たたないと満たされないからである。
  //
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  //
  // 予想：2秒の待ちの後にAが表示され、二個目のthen()に渡されるPromiseは40ですぐ解決し、満たされる。
  // 二個目のthenの引数が関数でないため、その後すぐにtype errorになる。
  //
  // 結果：二個目のthen()の引数は関数でないため、自動的に(x)=>xという形の関数に変換される。
  // 一方で、wait1().then~の部分も別に(wait2().~を評価するタイミングで)評価されるため、元のPromiseチェーンとは関係なく実行される。
  // 参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%E5%BC%95%E6%95%B0
  // よって、1秒後にまずBが表示され、2秒後にAが表示され、最後のthen()に渡されるPromiseは40で満たされる。
  // そして、40が表示される。
  //
  //  wait2
  // |-----------|
  //               logA
  //             |-|
  //                 log(40)
  //               |-|
  //
  // wait1
  // |-----|
  //         logB
  //       |-|
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  //
  // 予想：解決されてthen()が呼ばれるのは、各Promiseオブジェクトに対し一回だけのため、1秒後にAが表示され、その1秒後にBが表示される。
  //
  // 結果：実際にはPromise pに対し、then()で複数のコールバックが登録できる。
  // そのため、起動後1秒後にAが表示されると、その1秒後にBが、さらにその1秒後にCが表示される。
  // pは一度解決済みのため、再度一行目のwait1()による待ちが発生することはない。
  //
  // wait1
  // |-----|
  //         logA
  //       |-|
  //         wait1
  //         |-----|
  //                 logB
  //               |-|
  //         wait2
  //         |-----------|
  //                       logC
  //                     |-|
  //
  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  //
  // 予想：起動1秒後にAが表示される。この時点でPromise pはundefinedで満たされる。
  // その1秒後、Bが表示される。(すでにpは満たされている状態のため、すぐさま呼ばれる)
  // その後Cが表示される。
  //
  // 結果：予想の通り。
  //
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  // 予想：1秒の待ちの後、Error Xが発生し、すぐに表示される。その後、Aが表示される。
  //
  // 結果：予想の通り。後に発生したError Yは捕捉されない。
  //
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  // 予想：1秒の待ちの後、Error Yが発生し、すぐに表示される。その後、Aが表示される。
  //
  // 結果：予想の通り。(先に満たされたPromise 42は無視される。)
  //
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  // 予想：1秒の待ちの後、Error Yが発生し、すぐに表示される。その後、Aが表示される。
  //
  // 結果：捕捉されない例外Error Yが発生し、プログラムが止まる。
  // then(r, c)としたとき、r内で発生した例外はcでハンドリングされない。
  //
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  // 予想：Error Xが発生し、すぐに表示される。
  //
  // 結果：予想の通り。new Promise 内の throw は .catch でキャッチできる。
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  // 予想：setTimeout(() => errX(), 0);のコールバック関数は別タスク扱いなので、.catch でキャッチできない。
  // よって、捕捉されない例外Error Xが発生し、プログラムが止まる。
  //
  // 結果：予想の通り。Prmise()がマイクロタスクなのに対し、setTimeout(() => errX(), 0)はタスクである。
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}

() => {
  f1();
  f2();
  f3();
  f4();
  f5();
  f6();
  f7();
  f8();
  f9();
  f10();
  f11();
  f12();
};
