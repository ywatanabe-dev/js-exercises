// app/foo/page.tsx
import Link from "next/link";

export default function Foo() {
  return (
    <div>
      This is Foo!
      <br />
      (move to <Link href="bar">Bar</Link>)
    </div>
  );
}
