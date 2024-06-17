import {
  wait1,
  wait2,
  wait3,
  wait,
  logA,
  logB,
  logC,
  log,
  errX,
  errY,
} from "../util.js";

async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  // 予想：他のPromiseは停止する。
  // よってlog()は、どちらも42が表示される。
  // 結果：42と100が表示された。
  // よって、他のPromiseも停止せずそのまま動き続けているが、あくまでPromise.anyとしては42で一度解決しているため、
  // はじめに返されるのは42である。
  //
  //        v=42
  // |-----------
  //           |
  //           wait2
  //           |----------|
  // wait1
  // |-----|
  //
  //       |-|
  // wait2
  // |-----------|
  //             v=100
  //             |-|
  //                 0で解決
  //               |-|
  //

  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}

async function i2() {
  // 予想：C->B->A->[A,B,C]と表示される。
  // 結果：予想通り。
  //
  //                       [A,B,C]
  // |---------------------|-------
  //
  // wait3
  // |-------------------|
  //                     logA
  //                     |-|
  //
  //
  // wait2
  // |-----------|
  //             logB
  //             |-|
  //
  //
  // wait1
  // |-----|
  //       logC
  //       |-|
  //
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  // 予想：他のPromiseはそのまま動き続ける。
  // よって、Yが表示 -> 42が表示 -> Bが表示 -> errXがキャッチできずプログラムが止まる
  // 結果： Yが表示 -> 42が表示 -> Bが表示 -> 0が表示
  // 下図のように、Promise.all()の一番下のPromise()でerrYが呼ばれるとreject扱いになり、
  // はじめのawaitに戻って例外が投げられる。以後、catch{}に制御が移るが、一方で、他のPromise()も動いたままとなる。
  // 一番上のPromise()はerrXを投げるが、すでにtry{}内のawait Promoseはreject済みなので、何も起きない。
  //
  //           log(Y)
  //  (catch->)log(v=42)
  // |-------|-|
  //           wait3
  //           |-------------------|
  //                               log(v=0)
  //                               |--
  //
  // wait3
  // |-------------------|
  //                     v=0
  //                     errX(すでにtry{}内のawait Promoseはreject済みなので、何も起きない)
  //                     |-|
  //
  //
  // wait2
  // |-----------|
  //             logB
  //             |-|
  //
  //
  // wait1
  // |-----|
  //       errY(reject)
  //       |-|
  //
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  //
  // 予想：5秒待ち->0が表示->4秒待ち->1が表示->3秒待ち->2が表示->2秒待ち->3が表示->1秒待ち->4が表示->COMPLETEDが表示
  //
  // 結果：予想通り。
  //
  //
  // wait5
  // |-------------------------|
  //                           log(0)
  //                           |--|
  //                              wait4
  //                              |--------------------|
  //                                                   log(1)
  //                                                   |---(略)
  //
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  //
  // 予想：5、４、３、２、１が間がなく表示、COMPLETEDが表示
  //
  // 結果：COMPLETEDが表示-> 1秒後に4が表示、その1秒後に3が表示・・・0が表示
  //
  // wait((5 - i) * 1000).then(() => log(i))がthen()の引数になっている。
  // 結果、then()はthen((x) => x)として解釈され、引数の中身はそのまま非同期実行されるPromiseとして残る。
  // よって、Promise pは、Prmise.resolve(null).then((x) => x)..then((x) => x)...then(() => log("COMPLETED"))
  // となり、はじめに間がなくCOMPLETEDが表示される。
  // その後非同期実行されるPromiseのlog()が1秒ごとに実行される。
  //
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i6() {
  //
  // 予想：1秒後に4が表示、その1秒後に3が表示・・・0が表示、その後すぐにCOMPLETEDが表示される。
  // 結果：予想通り。
  //
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}

async function i7() {
  //
  // 予想：
  // vが1に更新(p2)
  // 1秒待つ
  // vが2に更新(p1)
  // 1秒待つ
  // ...
  // 1秒待つ
  // vが9に更新(p2)
  // 1秒待つ
  // vが10に更新(p1)
  // 2秒待つ
  // 10が表示(トータル11秒待ち)
  //
  // 結果：予想通り。
  //
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  //
  // 予想：
  // next = 1(p2)
  // 1秒待つ
  // next = 1(p1)
  // 1秒待つ

  // v = 1に更新(p2)
  // next = 2(p2)
  // 1秒待つ
  // v = 1に更新(p1)
  // next = 2(p1)
  // 1秒待つ

  // v = 2に更新(p2)
  // next = 3(p2)
  // 1秒待つ
  // v = 2に更新(p1)
  // next = 3(p1)
  // 1秒待つ

  // v = 3に更新(p2)
  // next = 4(p2)
  // 1秒待つ
  // v = 3に更新(p1)
  // next = 4(p1)
  // 1秒待つ

  // v = 4に更新(p2)
  // next = 4(p2)
  // 1秒待つ
  // v = 4に更新(p1)
  // next = 4(p1)
  // 1秒待つ

  // v = 5に更新(p2)
  // 1秒待つ
  // v = 5に更新(p1)

  // 5が表示(トータル11秒待ち)

  // 結果：予想通り。
  //

  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

() => {
  i1();
  i2();
  i3();
  i4();
  i5();
  i6();
  i7();
  i8();
};
