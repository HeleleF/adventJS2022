function checkPart(part: string): boolean {
  // create all possible combinations first, then check
  return Array.from(part, removeChar(part)).concat(part).some(isPalindrome);
}

function removeChar(word: string): (char: string, idx: number) => string {
  return (_, idx) => `${word.slice(0, idx)}${word.slice(idx + 1)}`;
}

function isPalindrome(word: string): boolean {
  const len = word.length;

  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (word[i] !== word[len - 1 - i]) {
      return false;
    }
  }
  return true;
}
