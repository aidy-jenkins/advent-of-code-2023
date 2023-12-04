import * as Puzzle from "../src/Day2";

describe("Puzzle", () => {
    describe("parseGameID", () => {
        it("should read the game ID from the correct position in a string", () => {
            expect(Puzzle.parseGameID("Game 1: abc")).toBe(1);
        });
        it("should handle multi-digit games", () => {
            expect(Puzzle.parseGameID("Game 123: blah blah")).toBe(123);
        });
    });

    describe("parseGameTurns", () => {
        it("should correctly parse a single turn", () => {
            let cubes = Puzzle.parseGameTurns("Game 123: 14 blue, 3 red, 47 green").toArray();
            cubes.sort((a, b) => a.colour < b.colour ? -1 : 1);

            expect(cubes.length).toBe(3);
            expect(cubes[0]).toEqual({colour: "blue", quantity: 14});
            expect(cubes[1]).toEqual({colour: "green", quantity: 47});
            expect(cubes[2]).toEqual({colour: "red", quantity: 3});
        });

        it("should correctly parse multiple turns", () => {
            let cubes = Puzzle.parseGameTurns("Game 123: 14 blue, 3 red, 47 green; 500 blue, 13 red, 8 green").toArray();
            cubes.sort((a, b) => `${a.colour}${a.quantity}` < `${b.colour}${b.quantity}` ? -1 : 1);

            expect(cubes.length).toBe(6);
            expect(cubes[0]).toEqual({colour: "blue", quantity: 14});
            expect(cubes[1]).toEqual({colour: "blue", quantity: 500});
            expect(cubes[2]).toEqual({colour: "green", quantity: 47});
            expect(cubes[3]).toEqual({colour: "green", quantity: 8});
            expect(cubes[4]).toEqual({colour: "red", quantity: 13});
            expect(cubes[5]).toEqual({colour: "red", quantity: 3});
        });
    });

    describe("parseGame", () => {
        it("should correctly parse a game", () => {
            let gameStr = "Game 123: 14 blue, 3 red, 47 green";
            let game = Puzzle.parseGame(gameStr, []);

            expect(game.ID).toBe(123);
            expect(game.possible).toBe(true);
            
            let cubes = game.highestCubeQuantities;
            cubes.sort((a, b) => a.colour < b.colour ? -1 : 1);

            expect(cubes.length).toBe(3);
            expect(cubes[0]).toEqual({colour: "blue", quantity: 14});
            expect(cubes[1]).toEqual({colour: "green", quantity: 47});
            expect(cubes[2]).toEqual({colour: "red", quantity: 3});
        });

        it("should correctly determine whether a game is possible", () => {
            let gameStr = "Game 123: 14 blue, 3 red, 47 green";
            let game = Puzzle.parseGame(gameStr, [{colour: "red", quantity: 4}, {colour: "blue", quantity: 14}, {colour: "green", quantity: 47}]);

            expect(game.possible).toBe(true);
        });

        it("should correctly determine whether a game is not possible", () => {
            let gameStr = "Game 123: 14 blue, 3 red, 47 green";
            let game = Puzzle.parseGame(gameStr, [{colour: "red", quantity: 2}, {colour: "blue", quantity: 14}, {colour: "green", quantity: 47}]);

            expect(game.possible).toBe(false);
        });

        it("should correctly determine whether a game is not possible 2", () => {
            let gameStr = "Game 123: 14 blue, 3 red, 47 green";
            let game = Puzzle.parseGame(gameStr, [{colour: "red", quantity: 3}, {colour: "blue", quantity: 1}, {colour: "green", quantity: 47}]);

            expect(game.possible).toBe(false);
        });

        it("should correctly determine whether a multi-turn game is possible", () => {
            let gameStr = "Game 123: 14 blue, 3 red, 47 green; 500 blue, 13 red, 8 green";
            let game = Puzzle.parseGame(gameStr, [{colour: "red", quantity: 13}, {colour: "blue", quantity: 500}, {colour: "green", quantity: 47}]);

            expect(game.possible).toBe(true);
        });

        it("should correctly determine whether a multi-turn game is not possible", () => {
            let gameStr = "Game 123: 14 blue, 3 red, 47 green; 500 blue, 13 red, 8 green";
            let game = Puzzle.parseGame(gameStr, [{colour: "red", quantity: 13}, {colour: "blue", quantity: 14}, {colour: "green", quantity: 47}]);

            expect(game.possible).toBe(false);
        });

        it("should correctly determine whether a multi-turn game is not possible 2", () => {
            let gameStr = "Game 123: 14 blue, 3 red, 47 green; 500 blue, 13 red, 8 green";
            let game = Puzzle.parseGame(gameStr, [{colour: "red", quantity: 13}, {colour: "blue", quantity: 500}, {colour: "green", quantity: 46}]);

            expect(game.possible).toBe(false);
        });
    });

    describe("solvePart1", () => {
        it("should add up all the possible game IDs", () => {
            let input = `
                Game 1: 3 red, 3 blue, 3 green; 4 red, 4 blue, 4 green
                Game 2: 1 red, 1 blue, 17 green
                Game 3: 2 red, 2 blue, 2 green
                Game 4: 5 red, 4 blue, 3 green; 4 red, 5 blue, 4 green
            `;

            let result = Puzzle.solvePart1(input, [{colour: "red", quantity: 5}, {colour: "blue", quantity: 4}, {colour: "green", quantity: 4}]);

            expect(result).toBe(1 + 3);

        });

        it("should correctly handle the website example", () => {
            let input = `
                Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
                Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
                Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
                Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
                Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
            `;

            let result = Puzzle.solvePart1(input, [{colour: "red", quantity: 12}, {colour: "green", quantity: 13}, {colour: "blue", quantity: 14}]);

            expect(result).toBe(8);
        });
    });

    describe("solvePart2", () => {
        it("should correctly handle the website example", () => {
            let input = `
                Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
                Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
                Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
                Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
                Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
            `;

            let result = Puzzle.solvePart2(input);
            
            expect(result).toBe(2286);
        });
    });
});