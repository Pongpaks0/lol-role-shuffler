const colors = [
  "hsl(201.57, 100%, 50%)",
  "hsl(25.95, 98.17%, 40%)",
  "hsl(163.67, 100%, 65%)",
  "hsl(326.75, 44.86%, 80%)",
  "hsl(0, 0%, 60%)",
];

export function genNameColorPair(names) {
  const res = new Map();
  for (let i = 0; i < 5; i++) {
    res.set(names[i], colors[i]);
  }
  return res;
}
