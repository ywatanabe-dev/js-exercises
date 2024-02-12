function f(x: boolean) {
  if (x) throw new Error("Error occurred!"); // 例外を投げる
}

function main() {
  // 以下の順に表示
  // before try
  // Error occurred!
  // finally
  try {
    console.log("before try");
    f(true); // 例外発生
    console.log("after try");
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message);
  } finally {
    console.log("finally");
  }
  console.log("");

  // 以下の順に表示
  // before try
  // after try
  // finally
  try {
    console.log("before try");
    f(false);
    console.log("after try");
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message);
  } finally {
    console.log("finally");
  }
  console.log("");

  // 以下の順に表示
  // before try
  // finally
  // Error occurred!
  try {
    try {
      console.log("before try");
      f(true);
      console.log("after try");
    } finally {
      console.log("finally");
    }
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message);
  }
  console.log("");

  // 以下の順に表示
  // before try
  // finally
  // New error occurred!
  try {
    try {
      console.log("before try");
      f(true);
      console.log("after try");
    } finally {
      console.log("finally");
      throw new Error("New error occurred!");
    }
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message);
  }
  console.log("");

  // 以下の順に表示
  // before try
  // finally
  try {
    (() => {
      try {
        console.log("before try");
        f(true);
        console.log("after try");
      } finally {
        console.log("finally");
        return;
      }
    })();
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message);
  }
  console.log("");

  // 以下の順に表示
  // 0
  // before continue
  // finally
  // 1
  // before continue
  // finally
  // 2
  // before continue
  // finally
  //
  let i = 0;
  while (i < 3) {
    try {
      console.log(i);
      console.log("before continue");
      continue;
      console.log("after continue");
    } finally {
      console.log("finally");
      i++;
    }
  }
  console.log("");
}

main();
