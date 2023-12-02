import * as Puzzle from "../src/Puzzle";

describe("Puzzle", () => {
    describe("getFirstDigit", () => {
        it("should return the first numeric char in a string", () => {
            expect(Puzzle.getFirstDigit("123abc")).toBe(1);
            expect(Puzzle.getFirstDigit("a1a2a3")).toBe(1);
            expect(Puzzle.getFirstDigit("sometext7")).toBe(7);
        });
    });

    describe("getLastDigit", () => {
        it("should return the last numeric char in a string", () => {
            expect(Puzzle.getLastDigit("123abc")).toBe(3);
            expect(Puzzle.getLastDigit("a1a2a3")).toBe(3);
            expect(Puzzle.getLastDigit("sometext7")).toBe(7);
        });
    });

    describe("solve", () => {
        it("should return the summation of first and last digits by line in a block of text", () => {
            expect(Puzzle.solve(solutionExample)).toBe(142);
        })
    })
});

const solutionExample = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;