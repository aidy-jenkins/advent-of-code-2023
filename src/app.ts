import * as Day1 from "./Day1";
import * as fs from "fs";

const day1 = (async () => {
    let fileContent = await new Promise<string>((resolve, reject) => fs.readFile("inputs/day1.txt", (err, data) => err ? reject(err) : resolve(data.toString())));
    
    console.log(Day1.solve(fileContent));
});

day1();
