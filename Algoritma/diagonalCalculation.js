function diagonalDifference(matrix) {
  let primaryDiagonalSum = 0;
  let secondaryDiagonalSum = 0;
  const matrixLength = matrix.length;

  for (let i = 0; i < matrixLength; i++) {
    // Elements from primary diagonal
    primaryDiagonalSum += matrix[i][i];

    // Elements from secondary diagonal
    secondaryDiagonalSum += matrix[i][matrixLength - 1 - i];
  }

  // Calculate the difference between the two diagonal sums
  return primaryDiagonalSum - secondaryDiagonalSum;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
const result = diagonalDifference(matrix);
console.log(result);
