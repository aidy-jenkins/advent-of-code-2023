import { linq } from "linq-fast";

const colours = ["red", "green", "blue"];

export interface CubeQuantity {
   colour: string;
   quantity: number;
}

export interface Game {
   ID: number;
   highestCubeQuantities: CubeQuantity[]
   possible: boolean;
}

export const parseGameID = (line: string) => {
   line = line.substring("Game ".length);
   let id = parseInt(line.split(':')[0]);

   return id;
}

export const parseGameTurns = (line: string) => {
   let turns = line.split(":")[1].split(';');
   return linq(turns)
   .select(turn => linq(turn.split(',')))
   .selectMany(turn => turn.select(cube => cube.split(' ').filter(term => Boolean(term.trim())) as [string, string])
      .select(([quantity, colour]) => ({quantity: parseInt(quantity), colour}) as CubeQuantity));
}

const getHighestQuantityByColour = (cubesRevealed: CubeQuantity[]) => linq(cubesRevealed)
   .groupBy(cube => cube.colour)
   .select(group => ({ colour: group.key, quantity: group.select(cube => cube.quantity).max()} as CubeQuantity))
   .toArray();

export const parseGame = (line: string, rules: CubeQuantity[]) => {
   let cubesRevealed = parseGameTurns(line);
   let highestQuantities = getHighestQuantityByColour(cubesRevealed.toArray());
   let possible = linq(rules).all(rule => (highestQuantities.find(cq => cq.colour === rule.colour)?.quantity ?? 0) <= rule.quantity);

   return {
      ID: parseGameID(line),
      highestCubeQuantities: highestQuantities,
      possible
   } as Game;
};

export const solvePart1 = (input: string, rules: CubeQuantity[]) => {
   let lines = input.split('\n').map(x => x.trim()).filter(x => Boolean(x));

   let games = lines.map(line => parseGame(line, rules));

   return linq(games).where(game => game.possible).select(game => game.ID).sum();
};

export const solvePart2 = (input: string) => {
   let lines = input.split('\n').map(x => x.trim()).filter(x => Boolean(x));

   let games = lines.map(line => parseGame(line, []));

   return linq(games).select(x => linq(x.highestCubeQuantities).aggregate(1, (agg, cq) => agg * cq.quantity)).sum();
};