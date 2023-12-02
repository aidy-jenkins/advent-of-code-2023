 const numericChars = Array(10).fill(0).map((_, idx) => idx).reduce((prev, curr) => { prev[curr] = curr; return prev; }, Object.create(null));
 
 export const getFirstDigit = (content: Iterable<string>) => Array.from(content).map(char => numericChars[char]).find(x => x != null) as number;
 export const getLastDigit = (content: Iterable<string>) => getFirstDigit(Array.from(content).reverse());

 export const solve = (content: string) => {
    let lines = content.split('\n').filter(x => Boolean(x));

    let digits = lines.map(line => [getFirstDigit(line), getLastDigit(line)]).map(([first, last]) => (first * 10) + last);
    return digits.reduce((prev, curr) => prev + curr, 0);
 };