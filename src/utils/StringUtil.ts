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

export function parseArguments(params: Set<string>, input: string, checkUnbound: boolean): Map<string, string> {
  const lowerCase = new Map<string, string>();
  params.forEach(param => {
    lowerCase.set(param.toLowerCase(), param);
  });

  const result = new Map<string, string>();
  const joinedParams = Array.from(lowerCase.keys()).join("|");
  const pattern = new RegExp(`(?i)(^| |,)(${joinedParams}):[ ]{0,1}[^ ]`, 'i');
  const matches = input.matchAll(pattern);

  const fuzzyArgPattern = checkUnbound ? new RegExp(`[ ,]([a-zA-Z]+):[ ]{0,1}[^ ]`, 'i') : null;

  const argStart = new Map<string, number>();
  const argEnd = new Map<string, number>();
  let lastArg: string | null = null;

  for (const match of matches) {
    const argName = match[2].toLowerCase();
    const index = match.index! + match[0].length;
    if (argStart.has(argName)) {
      throw new Error(`Duplicate argument \`${argName}\` in \`${input}\``);
    }
    argStart.set(argName, index);

    if (lastArg !== null) {
      argEnd.set(lastArg, match.index!);
    }
    lastArg = argName;
  }

  if (lastArg !== null) {
    argEnd.set(lastArg, input.length);
  }

  argStart.forEach((start, id) => {
    const end = argEnd.get(id)!;
    let value = input.substring(start, end).trim();
    let hasQuote = false;

    if (value.length > 1 && isQuote(value.charAt(0)) && isQuote(value.charAt(value.length - 1))) {
      value = value.substring(1, value.length - 1);
      hasQuote = true;
    }

    if (fuzzyArgPattern && !hasQuote) {
      const valueMatch = value.match(fuzzyArgPattern);
      if (valueMatch) {
        throw new Error(`Invalid argument: \`${valueMatch[1]}\` for \`${input}\` options: ${Array.from(params).join(", ")}
Please use quotes if you did not intend to specify an argument: \`${value}\``);
      }
    }

    result.set(lowerCase.get(id)!, value);
  });

  if (argStart.size === 0) {
    throw new Error(`No arguments found for \`${input}\` options: ${Array.from(params).join(", ")}`);
  }

  return result;
}

export function isQuote(c: string): boolean {
  return ['\'', '"', '\u201C', '\u201D'].includes(c);
}

export function findMatchingBracket(sequence: string, index: number): number {
  const startC = sequence.charAt(index);
  const lookC = getMatchingBracket(startC);
  if (lookC === startC) return -1;
  const forward = isBracketForwards(startC);
  const increment = forward ? 1 : -1;
  const end = forward ? sequence.length : -1;
  const incrementTest = forward ? (i: number) => i < end : (i: number) => i > end;
  let count = 0;
  for (let i = index + increment; incrementTest(i); i += increment) {
    const c = sequence.charAt(i);
    if (c === startC) {
      count++;
    } else if (c === lookC && count-- === 0) {
      return i;
    }
  }
  return -1;
}

function isBracketForwards(c: string): boolean {
  switch (c) {
    case '[':
    case '(':
    case '{':
    case '<':
      return true;
    default:
      return false;
  }
}

function getMatchingBracket(c: string): string {
  switch (c) {
    case '[':
      return ']';
    case '(':
      return ')';
    case '{':
      return '}';
    case '<':
      return '>';
    case ']':
      return '[';
    case ')':
      return '(';
    case '}':
      return '{';
    case '>':
      return '<';
    default:
      return c;
  }
}