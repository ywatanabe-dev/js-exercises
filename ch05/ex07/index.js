function f() {
  try {
    return true;
  } finally {
    return false;
  }
}

console.log(f());
