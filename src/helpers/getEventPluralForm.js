function getEventPluralForm(amount, word) {
  if (amount === 1) {
    return `${word}`;
  } else if (amount >= 2 && amount <= 4) {
    return `${word}и`;
  } else {
    return `${word}ів`;
  }
}
