import * as Puzzle from "./Puzzle";
import * as fs from "fs";

(async () => {
    let fileContent = await new Promise<string>((resolve, reject) => fs.readFile("inputs/day1.txt", (err, data) => err ? reject(err) : resolve(data.toString())));
    
    console.log(Puzzle.solve(fileContent));
})();
