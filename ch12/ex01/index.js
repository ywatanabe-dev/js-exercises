function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

// イテレータメソッドを明示的に呼ぶ
(() => {
  const iter = counterIter(10); // => counterIter
  console.log(iter.next()); // => counterIter: next; { value: 1, done: false }
  console.log(iter.return(0)); // => counterIter: return: 0
  try {
    console.log(iter.throw(0)); // => counterIter: throw: 0
  } catch (e) {
    console.log(e); // => 0
  }
})();

// イテレータメソッドnext/returnを間接的に呼ぶ
(() => {
  let count = 1;
  const iter = counterIter(10); // => counterIter
  for (const x of iter) {
    // => counterIter: Symbol.iterator; counterIter: next
    console.log(x);
    if (++count > 3) {
      break; // => counterIter: return: undefined
    }
  }
})();

// イテレータメソッドthrowを呼ぶ
(() => {
  let count = 1;
  const iter = counterIter(10); // => counterIter
  try {
    for (const x of iter) {
      // => counterIter: Symbol.iterator; counterIter: next
      console.log(x);
      if (++count > 3) {
        // 例外が投げられると、ループが出たと判定されreturn()が呼ばれる
        iter.throw("Something went wrong"); // => counterIter: throw: Something went wrong; counterIter: return: undefined
      }
    }
  } catch (e) {
    console.log(e); // => Something went wrong
  }
})();

// ジェネレータのイテレータメソッドnext/returnを間接的に呼ぶ
(() => {
  let count = 1;
  const iter = counterGen(10);
  for (const x of iter) {
    // はじめにnextが呼ばれたタイミングでジェネレータ関数の実行が始まる
    // => counterGen; counterGen: next
    console.log(x);
    if (++count > 3) {
      break; // => counterGen: finally
    }
  }
})();

// ジェネレータのイテレータメソッドthrowを呼ぶ
(() => {
  let count = 1;
  const iter = counterGen(10);
  for (const x of iter) {
    // はじめにnextが呼ばれたタイミングでジェネレータ関数の実行が始まる
    // => counterGen; counterGen: next
    console.log(x);
    if (++count > 3) {
      iter.throw("Something went wrong"); // => counterGen: catch: 0; counterGen: finally
    }
  }
})();

// ジェネレータ関数によって生成されたイテレータ
// next()、return()の戻り値がイテレータインタフェースを満たす
(() => {
  const iter = counterGen(10);
  console.log(iter.next()); // => counterGen; counterGen: next; { value: 1, done: false }
  console.log(iter.return(0)); // => counterGen: finally; { value: 0, done: true }
  try {
    // ジェネレータが終了しているため、'0'を直接例外として投げるだけ
    // see: https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-generatorresumeabrupt
    console.log(iter.throw(0));
  } catch (e) {
    console.log(e); // => 0
  }
})();

// ジェネレータ関数によって生成されたイテレータ
// next()の戻り値、throw()の投げた例外がイテレータインタフェースを満たす
(() => {
  const iter = counterGen(10);
  console.log(iter.next()); // => counterGen; counterGen: next; { value: 1, done: false }
  try {
    console.log(iter.throw(0)); // => counterGen: catch: 0; counterGen: finally
  } catch (e) {
    console.log(e); // => { value: undefined, done: true }
  }
  // ジェネレータが終了しているため、'{ value: 0, done: true }'を直接返す
  // see: https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-generatorresumeabrupt
  // see: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator/return#return_%E3%81%AE%E4%BD%BF%E7%94%A8
  console.log(iter.return(0)); // => { value: 0, done: true }
})();

(() => {})();
