const colors = ["#0072B2", "#D95F02", "#009E73", "#CC79A7", "#999999"];

export function genNameColorPair(names) {
  const res = new Map();
  for (let i = 0; i < 5; i++) {
    res.set(names[i], colors[i]);
  }
  return res;
}
