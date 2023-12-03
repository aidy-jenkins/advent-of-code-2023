import {linq} from "linq-fast";

const numericWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
 const numericChars = Array(10).fill(0).map((_, idx) => idx.toString());
 const numericSearch = numericWords.concat(numericChars);

 const numericDictionary = Object.create(null) as { [key: string]: number; };
 numericChars.reduce((prev, curr, idx) => { prev[curr] = idx; return prev; }, numericDictionary);
 numericWords.reduce((prev, curr, idx) => { prev[curr] = idx; return prev; }, numericDictionary);

 export const getFirstDigit = (line: string) => { 
    let itemIndices = numericSearch.map(searchItem => [searchItem, line.indexOf(searchItem)] as [string, number]);

    return linq(itemIndices)
    .where(([_, index]) => index >= 0)
    .orderBy(([_, index]) => index)
    .select(([item, _]) => numericDictionary[item])
    .first();
 };

 export const getLastDigit = (line: string) => {
    let itemIndices = numericSearch.map(searchItem => [searchItem, line.lastIndexOf(searchItem)] as [string, number]);

    return linq(itemIndices)
    .where(([_, index]) => index >= 0)
    .orderByDescending(([_, index]) => index)
    .select(([item, _]) => numericDictionary[item])
    .first();
 }

 export const solve = (content: string) => {
    let lines = content.split('\n').filter(x => Boolean(x));
    
    let digits = lines.map(line => [getFirstDigit(line), getLastDigit(line)]).map(([first, last]) => (first * 10) + last);
    return linq(digits).sum();
 };