import * as Puzzle from "../src/Day3";

describe("Puzzle", () => {
    describe("solve", () => {
        it("should correctly handle the website example", () => {
            let example = `
            467..114..
            ...*......
            ..35..633.
            ......#...
            617*......
            .....+.58.
            ..592.....
            ......755.
            ...$.*....
            .664.598..
            `;

            expect(Puzzle.solvePart1(example)).toBe(4361);
        });

        it("should satisfy examples from the subreddit", () => {
            let example1 = `
                12.......*..
                +.........34
                .......-12..
                ..78........
                ..*....60...
                78..........
                .......23...
                ....90*12...
                ............
                2.2......12.
                .*.........*
                1.1.......56
            `;

            let example2 = `
                12.......*..
                +.........34
                .......-12..
                ..78........
                ..*....60...
                78.........9
                .5.....23..$
                8...90*12...
                ............
                2.2......12.
                .*.........*
                1.1..503+.56
            `;

            let example3 = `
                .2.
                .*.
                585
            `;

            let example4 = `
                100
                200
            `;

            let example5 = `
                ....................
                ..-52..52-..52..52..
                ..................-.
            `;

            expect(Puzzle.solvePart1(example1)).toBe(413);
            expect(Puzzle.solvePart1(example2)).toBe(925);
            expect(Puzzle.solvePart1(example3)).toBe(587);
            expect(Puzzle.solvePart1(example4)).toBe(0);
            expect(Puzzle.solvePart1(example5)).toBe(156);
        });
    });

    describe("part 2", () => {
        it("should solve the website example", () => {
            let example = `
                467..114..
                ...*......
                ..35..633.
                ......#...
                617*......
                .....+.58.
                ..592.....
                ......755.
                ...$.*....
                .664.598..
            `;

            expect(Puzzle.solvePart2(example)).toBe(467835);
        });
    });
});