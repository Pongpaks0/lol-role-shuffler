export function generateUniqueMatrix(input) {
  const size = input.length;
  const matrix = [];

  for (let i = 0; i < size; i++) {
    let row = [...input]; // Copy the input numbers
    shuffle(row); // Shuffle the row to randomize the order

    while (
      matrix.some((r) =>
        r.some((_, col) => row[col] === matrix[matrix.indexOf(r)][col])
      )
    ) {
      shuffle(row); // Reshuffle if there's a column conflict with previous rows
    }
    matrix.push(row);
  }

  return matrix;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}
