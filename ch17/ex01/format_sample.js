// フォーマットが効いているかの動作確認用のファイル

function sample() {
  var a = 'sample string';
  const spaces = 'illegal spaces';
  let disallowedObj = {
    width: 42, // struct-style unquoted key
    maxWidth: 43, // dict-style quoted key
  };

  // React公式のサンプルを参考に設定
  let jsx = (
    <button
      className="prettier-class"
      id="prettier-id"
      onClick={this.handleClick}
    >
      Click Here
    </button>
  );
}

// 以下がGoogleのガイドの例を一部改変したり、そのまま持ってきているが、許している形式が無変換ではなく別の許してる形式に変換は起こる

// Braces are used for all control structures
if (someVeryLongCondition()) doSomething();

for (let i = 0; i < foo.length; i++) bar(foo[i]);

//  Nonempty blocks: K&R style
class InnerClass {
  constructor() {}

  /** @param {number} foo */
  method(foo) {
    if (condition(foo)) {
      try {
        // Note: this might fail.
        something();
      } catch (err) {
        recover();
      }
    }
  }
}

// Empty blocks: may be concise
function doNothing() {}

if (condition) {
  // …
} else if (otherCondition) {
} else {
  // …
}

try {
  // …
} catch (e) {}

// Block indentation: +2 spaces

class InnerClass {
  constructor() {}

  method(foo) {}
}

// Array literals: optionally block-like (allowed example)
const a = [0, 1, 2];

const b = [0, 1, 2];

const c = [0, 1, 2];

someMethod(foo, [0, 1, 2], bar);

// Object literals: optionally block-like (allowed example)
const a = {
  a: 0,
  b: 1,
};

const b = {a: 0, b: 1};
const c = {a: 0, b: 1};

someMethod(
  foo,
  {
    a: 0,
    b: 1,
  },
  bar
);

// Class literals

/** @template T */
class Foo {
  /** @param {T} x */
  constructor(x) {
    /** @type {T} */
    this.x = x;
  }
}

/** @extends {Foo<number>} */
class Bar extends Foo {
  constructor() {
    super(42);
  }
}

exports.Baz = class extends Bar {
  /** @return {number} */
  method() {
    return this.x;
  }
};

/** @extends {Bar} */ // <-- unnecessary @extends
exports.Baz = class extends Bar {
  /** @return {number} */
  method() {
    return this.x;
  }
};

// Function expressions
prefix.something.reallyLongFunctionName('whatever', (a1, a2) => {
  // Indent the function body +2 relative to indentation depth
  // of the 'prefix' statement one line above.
  if (a1.equals(a2)) {
    someOtherLongFunctionName(a1);
  } else {
    andNowForSomethingCompletelyDifferent(a2.parrot);
  }
});

some
  .reallyLongFunctionCall(arg1, arg2, arg3)
  .thatsWrapped()
  .then(result => {
    // Indent the function body +2 relative to the indentation depth
    // of the '.then()' call.
    if (result) {
      result.use();
    }
  });
