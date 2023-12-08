import * as Day1 from "./Day1";
import * as Day2 from "./Day2";
import * as Day3 from "./Day3";
import * as fs from "fs";

const loadFile = (filename: string) => new Promise<string>((resolve, reject) => fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data.toString())));

const day1 = (async () => {
    let fileContent = await loadFile("inputs/day1.txt");
    
    console.log(Day1.solve(fileContent));
});

const day2 = (async () => {
    let fileContent = await loadFile("inputs/day2.txt");

    console.log(`Part 1: ${Day2.solvePart1(fileContent, [{colour: "red", quantity: 12}, {colour: "green", quantity: 13}, {colour: "blue", quantity: 14}])}`);
    console.log(`Part 2: ${Day2.solvePart2(fileContent)}`);
});

const day3 = (async () => {
    let fileContent = await loadFile("inputs/day3.txt");

    console.log(`Solution Part 1: ${Day3.solvePart1(fileContent)}`);
    console.log(`Solution Part 2: ${Day3.solvePart2(fileContent)}`)
})

day3();