import { isEmailAddress } from "./index.js";

// local-partおよびdomainのdot-atomのみ考慮する
// またCWFSを含むdot-atomは受け付けないものとする
describe("isEmailAddress", () => {
  it("checks if given string is e-mail address or not", () => {
    expect(isEmailAddress("foo@example.com")).toBe(true);
    expect(isEmailAddress(null)).toBe(false);
    expect(isEmailAddress(undefined)).toBe(false);
    expect(isEmailAddress("foo.bar@example.com")).toBe(true);
    expect(isEmailAddress("foo..bar@example.com")).toBe(false);
    expect(isEmailAddress("foo.@example.com")).toBe(false);
    expect(isEmailAddress(".foo@example.com")).toBe(false);
    expect(
      isEmailAddress(
        "0123456789012345678901234567890123456789012345678901234567890123@example.com"
      )
    ).toBe(true);
    expect(
      isEmailAddress(
        "01234567890123456789012345678901234567890123456789012345678901234@example.com"
      )
    ).toBe(false);
    expect(isEmailAddress("(@example.com")).toBe(false);
    expect(isEmailAddress(")@example.com")).toBe(false);
    expect(isEmailAddress("<@example.com")).toBe(false);
    expect(isEmailAddress(">@example.com")).toBe(false);
    expect(isEmailAddress("[@example.com")).toBe(false);
    expect(isEmailAddress("]@example.com")).toBe(false);
    expect(isEmailAddress(":@example.com")).toBe(false);
    expect(isEmailAddress(";@example.com")).toBe(false);
    expect(isEmailAddress("@@example.com")).toBe(false);
    expect(isEmailAddress(",@example.com")).toBe(false);
    expect(isEmailAddress("\\@example.com")).toBe(false);
    expect(isEmailAddress('"@example.com')).toBe(false);
    expect(isEmailAddress("f o o@example.com")).toBe(false);
    expect(isEmailAddress("あいうえお@example.com")).toBe(false);
    expect(isEmailAddress("!#$%&'*+-/=?^_`{|}~@example.com")).toBe(true);
    expect(
      isEmailAddress(
        "a@012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901"
      )
    ).toBe(true);
    expect(
      isEmailAddress(
        "a@0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012"
      )
    ).toBe(false);
    expect(isEmailAddress("foo@")).toBe(false);
    expect(isEmailAddress("foo")).toBe(false);
    expect(isEmailAddress("@example.com")).toBe(false);
    expect(isEmailAddress("foo@.example.com")).toBe(false);
    expect(isEmailAddress("foo@example..com")).toBe(false);
    expect(isEmailAddress("foo@example.com.")).toBe(false);
    expect(isEmailAddress("foo@(")).toBe(false);
    expect(isEmailAddress("foo@)")).toBe(false);
    expect(isEmailAddress("foo@<")).toBe(false);
    expect(isEmailAddress("foo@>")).toBe(false);
    expect(isEmailAddress("foo@[")).toBe(false);
    expect(isEmailAddress("foo@]")).toBe(false);
    expect(isEmailAddress("foo@:")).toBe(false);
    expect(isEmailAddress("foo@;")).toBe(false);
    expect(isEmailAddress("foo@@")).toBe(false);
    expect(isEmailAddress("foo@,")).toBe(false);
    expect(isEmailAddress("foo@\\")).toBe(false);
    expect(isEmailAddress('foo@"')).toBe(false);
    expect(isEmailAddress("foo@exmaple . com")).toBe(false);
    expect(isEmailAddress("foo@あいうえお.com")).toBe(false);
    expect(isEmailAddress("foo@!#$%&'*+-/=?^_`.{|}~")).toBe(true);

    // 本来の仕様はもっと複雑で例えば以下のようなテストも必要
    // expect(isEmailAddress(`")( <>[];:@,.."@example.com`)).toBe(true);
    // expect(isEmailAddress(`"\\"@example.com`)).toBe(true);
    // expect(isEmailAddress("foo@[127.0.0.1]")).toBe(true);
    // expect(isEmailAddress("foo(this is (nested)comment) @example.com")).toBe(true);
  });
});
