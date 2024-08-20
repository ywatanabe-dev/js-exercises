// app/bar/page.tsx
import Link from "next/link";

export default function Bar() {
  return (
    <div>
      This is Bar!
      <br />
      (move to <Link href="foo">Foo</Link>)
    </div>
  );
}
