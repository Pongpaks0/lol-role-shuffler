export function getDayColor() {
  const day = new Date().getDay();
  let result;
  switch (day) {
    case 0:
      result = "hsl(354, 100%, 5%)";
    case 1:
      result = "hsl(59, 100%, 5%)";
      break;
    case 2:
      result = "hsl(349, 100%, 5%)";
      break;
    case 3:
      result = "hsl(124, 100%, 5%)";
      break;
    case 4:
      result = "hsl(20, 100%, 5%)";
      break;
    case 5:
      result = "hsl(196, 100%, 5%)";
      break;
    case 6:
      result = "hsl(302, 49%, 5%)";
      break;
    default:
      result = "#000";
  }
  return result;
}
