export function addHeadersToMatrix(matrix, rowHeaders, colHeaders) {
  // Clone colHeaders and prepend an empty string for the top-left corner
  const newColHeaders = ["", ...colHeaders];

  // Add row headers to each row in the matrix
  const matrixWithHeaders = matrix.map((row, i) => [rowHeaders[i], ...row]);

  // Add the column headers as the first row
  matrixWithHeaders.unshift(newColHeaders);

  return matrixWithHeaders;
}
