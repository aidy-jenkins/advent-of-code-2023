import { linq } from "linq-fast";

type Position = {x: number, y: number };

interface PartNumber {
    value: number;
    startPosition: Position;
    endPosition: Position;
}

interface EngineSymbol {
    symbol: string;
    position: Position;
}

const ignoreChar = '.';
const coerciveChars = ['+', '-'];

const parseSystem = (lines: [string, number][]) => {
    let parts = [] as PartNumber[];
    let symbols = [] as EngineSymbol[];

    for(let [line, lineNumber] of lines) {
        for(let i = 0; i < line.length; ++i) {
            if(line[i] === ignoreChar) continue;

            let value = parseInt(line.substring(i));
            if(Number.isNaN(parseInt(line[i]))) {
                symbols.push({ symbol: line.substring(i, i + 1), position: {x: i + 1, y: lineNumber + 1}});
                continue;
            }

            let numberLength = value.toString().length;
            parts.push({value, startPosition: {x: i + 1, y: lineNumber + 1}, endPosition: {x: i + 1 + numberLength, y: lineNumber + 1}});

            i += (numberLength - 1);
        }
    }

    return { parts, symbols };
}

export const isAdjacent = (part: PartNumber, symbol: EngineSymbol) => {
    return Math.abs(symbol.position.y - part.startPosition.y) <= 1
    && symbol.position.x <= part.endPosition.x 
    && symbol.position.x >= (part.startPosition.x - 1);
};

export const solvePart1 = (input: string) => {
    let lines = input.split('\n').filter(x => Boolean(x)).map(x => x.trim()).map((x, idx) => [x, idx] as [string, number]);

    let {parts, symbols} = parseSystem(lines);

    return linq(parts)
    .where(part => linq(symbols).any(symbol => isAdjacent(part, symbol)))
    .select(part => part.value)
    .defaultIfEmpty(0)
    .sum();
}

export const solvePart2 = (input: string) => {
    let lines = input.split('\n').filter(x => Boolean(x)).map(x => x.trim()).map((x, idx) => [x, idx] as [string, number]);

    let {parts, symbols} = parseSystem(lines);

    let gears = linq(symbols).where(symbol => symbol.symbol === '*');
    return gears.select(gear => ({gear, parts: linq(parts).where(part => isAdjacent(part, gear)).toArray()}))
    .where(({gear, parts}) => parts.length === 2)
    .select(({gear, parts}) => parts[0].value * parts[1].value)
    .sum();
};