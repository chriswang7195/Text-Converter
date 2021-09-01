const textarea = document.querySelector('textarea');
const result = document.querySelector('.result');
const options = document.querySelectorAll('input[type="radio"]');
let textType = 'default';

function display() {
  let text = textarea.value;

  switch(textType) {
    case 'sarcastic': 
      result.innerHTML = sarcasticText(text);
      break;
    case 'pig-latin':
      result.innerHTML = toPigLatin(text);
      break;
    case 'scramble':
      result.innerHTML = scrambleWords(text);
      break;     
    case 'default':
      result.innerHTML = text;
      break;
  }
}

function sarcasticText(text) {
  return text.split('').map((chr, idx) => {
    return idx % 2 == 0 ? chr.toLowerCase() : chr.toUpperCase();
  }).join('');
}

function toPigLatin(text) {
  return text.split(' ').map((word) => {
    const startConsonants = word.match(/^[^aeiouAEIOU]+/);  
    const nonWordChrs = word.match(/\W+$/);
    let newWord = word;

    newWord = newWord.replace(/\W+$/, '');

    if (!!startConsonants) {
      newWord = newWord.replace(/^[^aeiouAEIOU]+/, '') + startConsonants + 'ay';
    } else if (!!word.match(/^[aeiouAEIOU]/)) {
      newWord = newWord + 'hay';
    }

    return !!nonWordChrs ? newWord + nonWordChrs : newWord; 

  }).join(' ');
}

function scrambleWords(text) {
  return text.split(/\b\. \b|\b.$/).map((sentence) => {
    let words = sentence.split(' ');

    return words.slice(0).map((word) => {
      let randIdx = Math.floor(Math.random() * words.length);
      return words.splice(randIdx, 1);
    }).join(' ');

  }).join('. ');
}

textarea.addEventListener('keyup', display);

options.forEach(option => {
  option.addEventListener('click', (event) => {
    textType = event.target.value;
    display();
  });
});
