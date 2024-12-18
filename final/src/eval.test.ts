import { LispError, showError } from "./error.ts";
import { bind, evalLisp, readExpr, showVal } from "./eval.ts";
import { LispVal } from "./parser.ts";

describe("evalLisp", () => {
  it("ok", () => {
    expect(
      showVal(bind(readExpr('\'(1 3 ("this" "one"))'), evalLisp) as LispVal)
    ).toBe('(1 3 ("this" "one"))');
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("'atom"), evalLisp) as LispVal)).toBe("atom");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("2"), evalLisp) as LispVal)).toBe("2");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr('"a string"'), evalLisp) as LispVal)).toBe(
      '"a string"'
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(+ 2 2)"), evalLisp) as LispVal)).toBe("4");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(+ 2 (- 4 1))"), evalLisp) as LispVal)).toBe(
      "5"
    );
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(- (+ 4 6 3) 3 5 2)"), evalLisp) as LispVal)
    ).toBe("3");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(/ 6 3)"), evalLisp) as LispVal)).toBe("2");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(/ 5 2)"), evalLisp) as LispVal)).toBe("2");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(/ 7 3)"), evalLisp) as LispVal)).toBe("2");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(< 2 3)"), evalLisp) as LispVal)).toBe("#t");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(> 2 3)"), evalLisp) as LispVal)).toBe("#f");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(>= 3 3)"), evalLisp) as LispVal)).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr('(string=? "test"  "test")'), evalLisp) as LispVal)
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr('(string<? "abc" "bba")'), evalLisp) as LispVal)
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr('(string=? 789 "789")'), evalLisp) as LispVal)
    ).toBe("#t");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr('(= 789 "789")'), evalLisp) as LispVal)).toBe(
      "#t"
    );
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr('(if (> 2 3) "no" "yes")'), evalLisp) as LispVal)
    ).toBe('"yes"');
  });

  it("ok", () => {
    expect(
      showVal(
        bind(
          readExpr('(if (= 3 3) (+ 2 3 (- 5 1)) "unequal")'),
          evalLisp
        ) as LispVal
      )
    ).toBe("9");
  });

  it("ng", () => {
    expect(
      showError(bind(readExpr("(+ 2 (-4 1))"), evalLisp) as LispError)
    ).toBe("Getting an unbound variable: : -4");
  });

  it("ng", () => {
    expect(
      showError(bind(readExpr('(+ 2 "two")'), evalLisp) as LispError)
    ).toBe('Invalid type: expected number, found "two"');
  });

  it("ng", () => {
    expect(showError(bind(readExpr("(+ 2)"), evalLisp) as LispError)).toBe(
      "Expected 2 args; found values 2"
    );
  });

  it("ng", () => {
    expect(showError(bind(readExpr("(what? 2)"), evalLisp) as LispError)).toBe(
      "Getting an unbound variable: : what?"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(car '(a b c))"), evalLisp) as LispVal)).toBe(
      "a"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(car '(a))"), evalLisp) as LispVal)).toBe(
      "a"
    );
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(car '(a b . c))"), evalLisp) as LispVal)
    ).toBe("a");
  });

  it("ng", () => {
    expect(showError(bind(readExpr("(car 'a)"), evalLisp) as LispError)).toBe(
      "Invalid type: expected pair, found a"
    );
  });

  it("ng", () => {
    expect(
      showError(bind(readExpr("(car 'a 'b)"), evalLisp) as LispError)
    ).toBe("Expected 1 args; found values a b");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cdr '(a b c))"), evalLisp) as LispVal)).toBe(
      "(b c)"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cdr '(a b))"), evalLisp) as LispVal)).toBe(
      "(b)"
    );
  });

  it("ok", () => {
    // OK???
    expect(showVal(bind(readExpr("(cdr '(a))"), evalLisp) as LispVal)).toBe(
      "()"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cdr '(a . b))"), evalLisp) as LispVal)).toBe(
      "b"
    );
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(cdr '(a b . c))"), evalLisp) as LispVal)
    ).toBe("(b . c)");
  });

  it("ng", () => {
    expect(showError(bind(readExpr("(cdr 'a)"), evalLisp) as LispError)).toBe(
      "Invalid type: expected pair, found a"
    );
  });

  it("ng", () => {
    expect(
      showError(bind(readExpr("(cdr 'a 'b)"), evalLisp) as LispError)
    ).toBe("Expected 1 args; found values a b");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cons 'a '())"), evalLisp) as LispVal)).toBe(
      "(a)"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cons '() '())"), evalLisp) as LispVal)).toBe(
      "(())"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cons 'a 'b)"), evalLisp) as LispVal)).toBe(
      "(a . b)"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cons '() 'b)"), evalLisp) as LispVal)).toBe(
      "(() . b)"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(cons '() 'b)"), evalLisp) as LispVal)).toBe(
      "(() . b)"
    );
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(cons 'a '(b c))"), evalLisp) as LispVal)
    ).toBe("(a b c)");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(cons 'a '(b . c))"), evalLisp) as LispVal)
    ).toBe("(a b . c)");
  });

  it("ng", () => {
    expect(
      showError(bind(readExpr("(cons 'a 'b '(c d))"), evalLisp) as LispError)
    ).toBe("Expected 2 args; found values a b (c d)");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? #t #t)"), evalLisp) as LispVal)).toBe(
      "#t"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? #t #f)"), evalLisp) as LispVal)).toBe(
      "#f"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? 1 1)"), evalLisp) as LispVal)).toBe(
      "#t"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? 1 2)"), evalLisp) as LispVal)).toBe(
      "#f"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr('(eq? "a" "a")'), evalLisp) as LispVal)).toBe(
      "#t"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr('(eq? "a" "b")'), evalLisp) as LispVal)).toBe(
      "#f"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? 'a 'a)"), evalLisp) as LispVal)).toBe(
      "#t"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? 'a 'b)"), evalLisp) as LispVal)).toBe(
      "#f"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? '() '())"), evalLisp) as LispVal)).toBe(
      "#t"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr("(eq? '() '(1))"), evalLisp) as LispVal)).toBe(
      "#f"
    );
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(eq? '(7 8 9) '(7 8 9))"), evalLisp) as LispVal)
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(eq? '(7 8 9) '(7 8 9 10))"), evalLisp) as LispVal)
    ).toBe("#f");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(eq? '(7 8 9) '(1 8 9))"), evalLisp) as LispVal)
    ).toBe("#f");
  });

  it("ok", () => {
    expect(
      showVal(
        bind(
          readExpr('(eq? \'("a" "b" "c") \'("a" "b" "c"))'),
          evalLisp
        ) as LispVal
      )
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(eq? '(#t #f) '(#t #f))"), evalLisp) as LispVal)
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(eq? '(a b c) '(a b c))"), evalLisp) as LispVal)
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(
        bind(readExpr("(eq? '(a (b c)) '(a (b c)))"), evalLisp) as LispVal
      )
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(
        bind(
          readExpr('(eq? \'(a (b c) 1 "p") \'(a (b c) 1 "p"))'),
          evalLisp
        ) as LispVal
      )
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(
        bind(readExpr("(eq? '(a b c . d) '(a b c . d))"), evalLisp) as LispVal
      )
    ).toBe("#t");
  });

  it("ok", () => {
    expect(
      showVal(
        bind(readExpr("(eq? '(a b c . d) '(a b . d))"), evalLisp) as LispVal
      )
    ).toBe("#f");
  });

  it("ng", () => {
    expect(
      showError(bind(readExpr("(eq? 'a 'b 'c)"), evalLisp) as LispError)
    ).toBe("Expected 2 args; found values a b c");
  });

  it("ok", () => {
    expect(showVal(bind(readExpr('(equal? 2 "2")'), evalLisp) as LispVal)).toBe(
      "#t"
    );
  });

  it("ok", () => {
    expect(showVal(bind(readExpr('(equal? 2 "3")'), evalLisp) as LispVal)).toBe(
      "#f"
    );
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr('(equal? #t "#t")'), evalLisp) as LispVal)
    ).toBe("#t");
  });

  it("ng", () => {
    expect(
      showError(bind(readExpr("(equal? 'a 'b 'c)"), evalLisp) as LispError)
    ).toBe("Expected 2 args; found values a b c");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(cdr '(a simple test))"), evalLisp) as LispVal)
    ).toBe("(simple test)");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(car '((this is) a test))"), evalLisp) as LispVal)
    ).toBe("(this is)");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(cons '(this is) 'test)"), evalLisp) as LispVal)
    ).toBe("((this is) . test)");
  });

  it("ok", () => {
    expect(
      showVal(bind(readExpr("(cons '(this is) '())"), evalLisp) as LispVal)
    ).toBe("((this is))");
  });
});
