function firstMissingLetter(fullName: string): string {
  const withoutDiacritics = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const cleaned = withoutDiacritics.toLowerCase().replace(/[^a-z]/g, '');

  const set = new Set(cleaned);
  for (let i = 97; i <= 122; i++) {
    const ch = String.fromCharCode(i);
    if (!set.has(ch)) return ch;
  }
  return '-';
}

export { firstMissingLetter };
