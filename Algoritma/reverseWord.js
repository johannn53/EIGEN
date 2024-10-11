let sentence = 'NEGIE1';
let sentence2 = 'ReverseD1721';

async function reverseWord(word) {
  let numberValue = [];
  let stringValue = [];

  for (const character of word) {
    // Check if the character is a digit
    if (!isNaN(character) && character.trim() !== '') {
      numberValue.push(character);
    } else {
      // If it's not a number, treat it as a string
      stringValue.push(character);
    }
  }
  const reversedString = stringValue.reverse();

  console.log(reversedString.concat(numberValue).join(''));
}

reverseWord(sentence);
reverseWord(sentence2);

