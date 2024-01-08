import { histogramFromStdin } from "./wordHistogram.ts";

histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
