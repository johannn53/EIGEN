function countInputInQuery(input, query) {
  // Initialize an empty array to store the results
  const output = [];

  // Loop through each word in the QUERY array
  for (const word of query) {
    // Count occurrences of the word in the INPUT array
    const count = input.filter((item) => item === word).length;
    // Add the count to the output array
    output.push(count);
  }

  return output;
}

const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];

const result = countInputInQuery(input, query);
console.log(result);
