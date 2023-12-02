import * as Puzzle from "../src/Puzzle";

describe("Puzzle", () => {
    describe("hello", () => {
        it("should return hello", () => {
            expect(Puzzle.hello()).toBe("hello");
        });
    });
});