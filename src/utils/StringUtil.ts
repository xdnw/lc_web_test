export function splitIgnoringBrackets(s: string, delimiter: string): string[] {
    const result: string[] = [];
    let current: string = '';
    let depth: number = 0;
    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      if (char === delimiter && depth === 0) {
        result.push(current);
        current = '';
      } else {
        current += char;
        if (char === '[' || char === '{' || char === '<') depth++;
        if (char === ']' || char === '}' || char === '>') depth--;
      }
    }
    if (current !== '') result.push(current);
    return result;
}