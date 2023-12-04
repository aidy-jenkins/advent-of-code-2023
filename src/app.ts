import * as Day1 from "./Day1";
import * as Day2 from "./Day2";
import * as fs from "fs";

const loadFile = (filename: string) => new Promise<string>((resolve, reject) => fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data.toString())));

const day1 = (async () => {
    let fileContent = await loadFile("inputs/day1.txt");
    
    console.log(Day1.solve(fileContent));
});

const day2 = (async () => {
    let fileContent = await loadFile("inputs/day2.txt");

    console.log(Day2.solve(fileContent, [{colour: "red", quantity: 12}, {colour: "green", quantity: 13}, {colour: "blue", quantity: 14}]));
});

day2();