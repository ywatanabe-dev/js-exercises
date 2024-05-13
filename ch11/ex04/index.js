// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
const [N, K, M] = [100, 200, 300];

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K)
  .fill(0.0)
  //.map(() => Math.random());
  .map(() => Math.floor(Math.random() * 3));
const rhsA = Array(K * M)
  .fill(0.0)
  //.map(() => Math.random());
  .map(() => Math.floor(Math.random() * 3));
const resultA = Array(N * M).fill(0.0);

function arrayMultiply() {
  resultA.fill(0.0);
  // 問題: ここで resultA に lhsA と rhsA の乗算結果を格納してね
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let result = 0;
      for (let k = 0; k < K; k++) {
        result += lhsA[K * i + k] * rhsA[M * k + j];
      }
      resultA[M * i + j] = result;
    }
  }
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
const lhsB = new Float64Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsB = new Float64Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultB = new Float64Array(N * M).fill(0.0);

function typedArrayMultiply1() {
  resultB.fill(0.0);
  // 問題: ここで resultB に lhsB と rhsB の乗算結果を格納してね
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let result = 0;
      for (let k = 0; k < K; k++) {
        result += lhsB[K * i + k] * rhsB[M * k + j];
      }
      resultB[M * i + j] = result;
    }
  }
}

const lhsC = new Float32Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsC = new Float32Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultC = new Float32Array(N * M).fill(0.0);

function typedArrayMultiply2() {
  resultC.fill(0.0);
  // 問題: ここで resultB に lhsB と rhsB の乗算結果を格納してね
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let result = 0;
      for (let k = 0; k < K; k++) {
        result += lhsC[K * i + k] * rhsC[M * k + j];
      }
      resultC[M * i + j] = result;
    }
  }
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply1, typedArrayMultiply2];
function test(fn) {
  let result;
  for (let i = 0; i < TEST_TIMES; ++i) {
    result = fn();
  }
  return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
  test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
  const start = performance.now();
  test(TESTS[i]);
  const end = performance.now();
  console.log(`${TESTS[i].name}: ${end - start}`);
}
