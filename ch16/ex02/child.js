setInterval(() => {
  console.log("child processing...");
  if (Math.random() < 1 / 3) {
    console.log("An error occurred. Exiting...");
    process.exit(1);
  }
}, 100);