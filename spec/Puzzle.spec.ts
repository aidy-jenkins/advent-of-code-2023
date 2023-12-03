import * as Puzzle from "../src/Puzzle";

describe("Puzzle", () => {
    describe("getFirstDigit", () => {
        it("should return the first numeric char in a string", () => {
            expect(Puzzle.getFirstDigit("123abc")).toBe(1);
            expect(Puzzle.getFirstDigit("a1a2a3")).toBe(1);
            expect(Puzzle.getFirstDigit("sometext7")).toBe(7);
        });

        it("should return the first number spelled out or numeric char", () => {
            expect(Puzzle.getFirstDigit("1two3")).toBe(1);
            expect(Puzzle.getFirstDigit("two3four")).toBe(2);
            expect(Puzzle.getFirstDigit("seveneightnine")).toBe(7);
        });
    });

    describe("getLastDigit", () => {
        it("should return the last numeric char in a string", () => {
            expect(Puzzle.getLastDigit("123abc")).toBe(3);
            expect(Puzzle.getLastDigit("a1a2a3")).toBe(3);
            expect(Puzzle.getLastDigit("sometext7")).toBe(7);
        });

        it("should return the last number spelled out or numeric char", () => {
            expect(Puzzle.getLastDigit("1two3")).toBe(3);
            expect(Puzzle.getLastDigit("two3four")).toBe(4);
            expect(Puzzle.getLastDigit("seveneightnine")).toBe(9);
        });
    });

    describe("solve", () => {
        it("should return the summation of first and last digits by line in a block of text", () => {
            expect(Puzzle.solve(solutionExample)).toBe(142);
        });

        it("should return the summation of the first and last numbers in a block of text, with numbers spelled out", () => {
            expect(Puzzle.solve(solutionExampleWords)).toBe(281);
        });

        it("should handle multiple words overlapping", () => {
            expect(Puzzle.solve("twone")).toBe(21);
        });

        it("should handle the same word being repeated at start and end", () => {
            expect(Puzzle.solve("oneone")).toBe(11);
        })
    })
});

const solutionExample = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const solutionExampleWords = 
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;