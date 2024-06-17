import {
  wait1,
  wait2,
  wait3,
  logA,
  logB,
  logC,
  log,
  errX,
  errY,
} from "../util.js";

async function h1() {
  // 予想：
  // (1)wait3のPromiseが満たされるまでawaitで待つ。
  // (2)logAが表示される。
  // (3)wait2のPromiseが満たされるまでawaitで待つ。
  // (4)logBが表示される。
  // (5)wait1のPromiseが満たされるまでawaitで待つ。
  // (6)logCが表示される。
  //
  // 結果：予想通り。
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
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // 予想：実行してすぐXが表示される。
  //
  // 結果：予想通り。
  //
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  // 予想：Promise()内の関数は非同期実行となる。よって、errX()は同期的に呼ばれず、
  // 例外もキャッチされない。よって、例外がそのまま投げられプログラムが止まる。
  //
  // 結果：予想通り。
  //
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  // 予想：初めのPromise p1で発生した例外のみキャッチする。
  //
  // 結果：p1のawait中にp2のerrYが投げられ、p1のerrXがcatchされる前にerrYによりプログラムが止まる。
  // (errYはp1解決前のため、キャッチされない)
  //
  //    p1のawait開始
  // |--|------------------
  //
  // wait2(p1)
  // |-----------|
  //               errX
  //             |-|
  // wait1(p2)
  // |-----|
  //         errY
  //       |-|
  //
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
() => {
  h1();
  h2();
  h3();
  h4();
};
