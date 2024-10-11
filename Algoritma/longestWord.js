function longest(sentence) {
  // Split the sentence into words
  const words = sentence.split(' '); // Splitting by spaces to get individual words
  let longestWord = ''; // Variable to hold the longest word

  // Loop through each word in the array
  for (const word of words) {
    // Check if the current word is longer than the longest word found so far
    if (word.length > longestWord.length) {
      longestWord = word; // Replace longestWord if the current word is longer
    }
  }

  return longestWord;
}

// Example usage
const sentence = 'Saya sangat senang mengerjakan soal algoritma';
const sentence2 = 'The quick brown fox jumps over the lazy dog and runs away.';
const result = longest(sentence);
const result2 = longest(sentence2);
console.log(`${result}: ${result.length} characters`);
console.log(`${result2}: ${result2.length} characters`);
